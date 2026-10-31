// SplashCursor.jsx — WebGL fluid simulation cursor (desktop only)
// Based on Navier-Stokes fluid dynamics for organic smoke/fluid trails
import { useEffect, useRef } from 'react'

/* ── WebGL helpers ──────────────────────────────────────────── */

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function createProgram(gl, vs, fs) {
  const prog = gl.createProgram()
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, vs))
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(prog)
  return prog
}

function createFBO(gl, w, h, internalFormat, format, type, filter) {
  gl.activeTexture(gl.TEXTURE0)
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)
  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.viewport(0, 0, w, h)
  gl.clear(gl.COLOR_BUFFER_BIT)
  return { texture, fbo, width: w, height: h, attach(id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id } }
}

function createDoubleFBO(gl, w, h, internalFormat, format, type, filter) {
  let fbo1 = createFBO(gl, w, h, internalFormat, format, type, filter)
  let fbo2 = createFBO(gl, w, h, internalFormat, format, type, filter)
  return {
    width: w, height: h,
    get read() { return fbo1 },
    set read(v) { fbo1 = v },
    get write() { return fbo2 },
    set write(v) { fbo2 = v },
    swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t }
  }
}

/* ── Shaders ───────────────────────────────────────────────── */

const baseVS = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const clearFS = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform float value;
  varying vec2 vUv;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`

const displayFS = `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
  }
`

const splatFS = `
  precision highp float;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  varying vec2 vUv;
  void main () {
    vec2 p = vUv - point;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`

const advectionFS = `
  precision highp float;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  varying vec2 vUv;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec3 result = dissipation * texture2D(uSource, coord).xyz;
    gl_FragColor = vec4(result, 1.0);
  }
`

const divergenceFS = `
  precision mediump float;
  uniform sampler2D uVelocity;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`

const curlFS = `
  precision mediump float;
  uniform sampler2D uVelocity;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`

const vorticityFS = `
  precision highp float;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
  }
`

const pressureFS = `
  precision mediump float;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  varying vec2 vUv;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - C) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`

const gradientSubtractFS = `
  precision mediump float;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  varying vec2 vUv;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    vel.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`

/* ── Config ─────────────────────────────────────────────────── */
const SIM_RES = 128
const DYE_RES = 1024
const CURL_STRENGTH = 30
const PRESSURE_ITERATIONS = 20
const SPLAT_RADIUS = 0.25
const SPLAT_FORCE = 6000
const VELOCITY_DISSIPATION = 0.2
const DENSITY_DISSIPATION = 1.0

/* ── Component ──────────────────────────────────────────────── */

export default function SplashCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false }
    const gl = canvas.getContext('webgl2', params) || canvas.getContext('webgl', params)
    if (!gl) return

    // Extension support
    if (gl instanceof WebGLRenderingContext) {
      gl.getExtension('OES_texture_half_float')
      gl.getExtension('OES_texture_half_float_linear')
    }

    const isWebGL2 = gl instanceof WebGL2RenderingContext
    const halfFloatType = isWebGL2 ? gl.HALF_FLOAT : (gl.getExtension('OES_texture_half_float')?.HALF_FLOAT_OES ?? gl.FLOAT)
    const internalFormatRGBA = isWebGL2 ? gl.RGBA16F : gl.RGBA
    const internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA
    const internalFormatR = isWebGL2 ? gl.R16F : gl.RGBA
    const formatRG = isWebGL2 ? gl.RG : gl.RGBA
    const formatR = isWebGL2 ? gl.RED : gl.RGBA

    gl.clearColor(0, 0, 0, 0)

    // Fullscreen quad
    const quadBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const indexBuf = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuf)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)

    // Compile programs
    function makeProg(fs) {
      const p = createProgram(gl, baseVS, fs)
      const uniforms = {}
      const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(p, i)
        uniforms[info.name] = gl.getUniformLocation(p, info.name)
      }
      return { program: p, uniforms, bind() { gl.useProgram(p) } }
    }

    const clearProg = makeProg(clearFS)
    const displayProg = makeProg(displayFS)
    const splatProg = makeProg(splatFS)
    const advectionProg = makeProg(advectionFS)
    const divergenceProg = makeProg(divergenceFS)
    const curlProg = makeProg(curlFS)
    const vorticityProg = makeProg(vorticityFS)
    const pressureProg = makeProg(pressureFS)
    const gradientSubtractProg = makeProg(gradientSubtractFS)

    // Resize and init FBOs
    let simW, simH, dyeW, dyeH
    let velocity, dye, divergence, curl, pressure

    function initFBOs() {
      const ratio = canvas.width / canvas.height
      simW = Math.round(SIM_RES * (ratio > 1 ? ratio : 1))
      simH = Math.round(SIM_RES * (ratio > 1 ? 1 : 1 / ratio))
      dyeW = Math.round(DYE_RES * (ratio > 1 ? ratio : 1))
      dyeH = Math.round(DYE_RES * (ratio > 1 ? 1 : 1 / ratio))

      velocity = createDoubleFBO(gl, simW, simH, internalFormatRG, formatRG, halfFloatType, gl.LINEAR)
      dye = createDoubleFBO(gl, dyeW, dyeH, internalFormatRGBA, gl.RGBA, halfFloatType, gl.LINEAR)
      divergence = createFBO(gl, simW, simH, internalFormatR, formatR, halfFloatType, gl.NEAREST)
      curl = createFBO(gl, simW, simH, internalFormatR, formatR, halfFloatType, gl.NEAREST)
      pressure = createDoubleFBO(gl, simW, simH, internalFormatR, formatR, halfFloatType, gl.NEAREST)
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initFBOs()
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Bind quad for drawing
    function blit(target) {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
        gl.viewport(0, 0, target.width, target.height)
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuf)
      const posLoc = 0
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(posLoc)
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
    }

    // Splat (add dye + velocity at a point)
    function splat(x, y, dx, dy, color) {
      splatProg.bind()
      gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0))
      gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width / canvas.height)
      gl.uniform2f(splatProg.uniforms.point, x, y)
      gl.uniform3f(splatProg.uniforms.color, dx, dy, 0)
      gl.uniform1f(splatProg.uniforms.radius, correctRadius(SPLAT_RADIUS / 100))
      blit(velocity.write)
      velocity.swap()

      gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0))
      gl.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b)
      blit(dye.write)
      dye.swap()
    }

    function correctRadius(r) {
      const ar = canvas.width / canvas.height
      return ar > 1 ? r * (ar) : r
    }

    // Simulation step
    const dt = 0.016
    function step() {
      // Curl
      curlProg.bind()
      gl.uniform2f(curlProg.uniforms.texelSize, 1 / simW, 1 / simH)
      gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0))
      blit(curl)

      // Vorticity
      vorticityProg.bind()
      gl.uniform2f(vorticityProg.uniforms.texelSize, 1 / simW, 1 / simH)
      gl.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(vorticityProg.uniforms.uCurl, curl.attach(1))
      gl.uniform1f(vorticityProg.uniforms.curl, CURL_STRENGTH)
      gl.uniform1f(vorticityProg.uniforms.dt, dt)
      blit(velocity.write)
      velocity.swap()

      // Divergence
      divergenceProg.bind()
      gl.uniform2f(divergenceProg.uniforms.texelSize, 1 / simW, 1 / simH)
      gl.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read.attach(0))
      blit(divergence)

      // Clear pressure
      clearProg.bind()
      gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0))
      gl.uniform1f(clearProg.uniforms.value, 0.8)
      blit(pressure.write)
      pressure.swap()

      // Pressure solve (Jacobi iteration)
      pressureProg.bind()
      gl.uniform2f(pressureProg.uniforms.texelSize, 1 / simW, 1 / simH)
      gl.uniform1i(pressureProg.uniforms.uDivergence, divergence.attach(0))
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProg.uniforms.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      // Gradient subtract
      gradientSubtractProg.bind()
      gl.uniform2f(gradientSubtractProg.uniforms.texelSize, 1 / simW, 1 / simH)
      gl.uniform1i(gradientSubtractProg.uniforms.uPressure, pressure.read.attach(0))
      gl.uniform1i(gradientSubtractProg.uniforms.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      // Advect velocity
      advectionProg.bind()
      gl.uniform2f(advectionProg.uniforms.texelSize, 1 / simW, 1 / simH)
      const velId = isWebGL2 ? gl.LINEAR : (gl.getExtension('OES_texture_half_float_linear') ? gl.LINEAR : gl.NEAREST)
      if (!isWebGL2) {
        gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, velId)
      }
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(advectionProg.uniforms.uSource, velocity.read.attach(0))
      gl.uniform1f(advectionProg.uniforms.dt, dt)
      gl.uniform1f(advectionProg.uniforms.dissipation, VELOCITY_DISSIPATION)
      blit(velocity.write)
      velocity.swap()

      // Advect dye
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(advectionProg.uniforms.uSource, dye.read.attach(1))
      gl.uniform1f(advectionProg.uniforms.dissipation, DENSITY_DISSIPATION)
      blit(dye.write)
      dye.swap()
    }

    // Render to screen
    function render() {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.enable(gl.BLEND)
      displayProg.bind()
      gl.uniform1i(displayProg.uniforms.uTexture, dye.read.attach(0))
      blit(null)
      gl.disable(gl.BLEND)
    }

    // Mouse tracking
    let pointer = { x: 0, y: 0, prevX: 0, prevY: 0, moved: false }

    const onMouseMove = (e) => {
      pointer.prevX = pointer.x
      pointer.prevY = pointer.y
      pointer.x = e.clientX / canvas.width
      pointer.y = 1.0 - e.clientY / canvas.height
      pointer.moved = true
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Animation loop
    let raf
    const white = { r: 0.8, g: 0.8, b: 0.8 }

    function loop() {
      if (pointer.moved) {
        pointer.moved = false
        const dx = (pointer.x - pointer.prevX) * SPLAT_FORCE
        const dy = (pointer.y - pointer.prevY) * SPLAT_FORCE
        splat(pointer.x, pointer.y, dx, dy, white)
      }
      step()
      render()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 z-[9999] pointer-events-none"
    />
  )
}
