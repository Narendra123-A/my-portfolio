// ============================================================
// portfolioData.js — single source of truth for all content.
// Components import from here — never hard-code personal data.
// ============================================================

// ── Identity ─────────────────────────────────────────────────
export const personalInfo = {
  name: "Ambati Narendra Kumar Reddy",
  firstName: "Ambati",
  brandName: "Ambati Narendra Kumar Reddy",
  title: "Java Full Stack Developer",
  location: "Kadapa, India",
  phone: "+91 9182424714",
  emails: {
    primary: "vijayambati350@gmail.com",
    secondary: "",
  },
  summary:
    "Java Full Stack Developer passionate about building scalable web applications and AI-powered solutions.",
  resumeUrl: "/Resume.pdf",
};

// ── TAP Academy credit (footer & index.html) ─────────────────
export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
};

// ── Social links ──────────────────────────────────────────────
export const socialLinks = {
  github: "https://github.com/192211960",
  linkedin: "https://www.linkedin.com/in/ambati-narendra-kumar-reddy",
  instagram:
    "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=mcsxc3y",
};

// ── Hero section ──────────────────────────────────────────────
export const heroContent = {
  greeting: "Hi, I'm Ambati",
  titleHighlight: "Java Full Stack Developer",
  subtitle:
    "I build scalable web applications and AI-powered solutions using Java, React.js, and Python.",
  ctaPrimary: { text: "View My Work", href: "#projects" },
  ctaSecondary: {
    text: "Contact Me",
    href: "mailto:vijayambati350@gmail.com?subject=Hiring Inquiry – Portfolio&body=Hello,%0D%0A%0D%0AI came across your portfolio and would like to discuss an opportunity with you.%0D%0A%0D%0ABest Regards,",
  },
  ctaResume: { text: "Download Resume", href: "/Resume.pdf" },
};

// ── About section ─────────────────────────────────────────────
export const aboutContent = {
  heading: "Hello!",
  // HTML is allowed here (rendered via dangerouslySetInnerHTML).
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">Ambati Narendra Kumar Reddy</span>, a Java Full Stack Developer based in Kadapa, India. I am passionate about building scalable web applications and AI-powered solutions using Java, React.js, Python, and modern web technologies. I am currently sharpening my skills through the placement training program at TAP Academy, gaining hands-on experience in full-stack development, data structures, and real-world project delivery.`,
  techStack: ["Java", "React.js", "Python", "MySQL"],
};

// ── Self-introduction video ───────────────────────────────────
export const introVideo = {
  badge: "Meet Me",
  heading: "Watch My Introduction",
  description:
    "Short video where I introduce myself, my skills, and what drives me as a developer.",
  youtubeUrl: "https://youtu.be/ek1xbwIEwKA?si=GVgkZtNFnV9z3Jmc",
};

// ── Process / Skills section ──────────────────────────────────
export const skillsContent = {
  badge: "My Process",
  heading: "Here's how I turn ideas into real-world products",
  description:
    "A structured, end-to-end approach — from understanding the problem to shipping a polished solution.",
  cards: [
    {
      number: "01",
      title: "Research",
      text: "I analyse requirements, study the domain, and plan the architecture before writing a single line of code.",
    },
    {
      number: "02",
      title: "Design",
      text: "I sketch UI layouts and define database schemas, ensuring a solid blueprint that guides development.",
    },
    {
      number: "03",
      title: "Develop",
      text: "I build frontend interfaces with React.js and backend services with Java Spring Boot and Python Flask.",
    },
    {
      number: "04",
      title: "Deploy",
      text: "I test, debug, and deploy applications — ensuring they're fast, reliable, and production-ready.",
    },
  ],
  endText: "Ready to ship! 🚀",
};

// ── Technical skills ──────────────────────────────────────────
export const technicalSkills = {
  categories: [
    {
      title: "Programming",
      skills: [{ name: "Java" }, { name: "Python" }, { name: "JavaScript" }],
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML & CSS" },
        { name: "React.js" },
        { name: "Tailwind CSS" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Spring Boot" },
        { name: "Python Flask" },
        { name: "REST APIs" },
      ],
    },
    {
      title: "Database & Tools",
      skills: [
        { name: "MySQL" },
        { name: "Git & GitHub" },
        { name: "OOP & DSA" },
      ],
    },
  ],
};

// ── Leadership / Activities ───────────────────────────────────
// No activities provided — component will be skipped in App.jsx.
export const leadershipList = [];

// ── Internships ───────────────────────────────────────────────
export const internshipsList = [
  {
    organization: "TAP Academy",
    role: "Full Stack Developer Intern",
    duration: "6 Months",
    skills: [
      "Frontend Development",
      "Backend Development",
      "Database Management",
      "Problem Solving",
      "OOP Principles",
    ],
    tech: ["Java", "Python", "React.js", "Spring Boot", "HTML", "CSS", "JavaScript", "MySQL"],
  },
];

// ── Soft skills ───────────────────────────────────────────────
export const softSkillsList = [
  {
    name: "Problem Solving",
    icon: "🧩",
    desc: "I break down complex challenges into smaller, manageable steps and deliver reliable solutions.",
  },
  {
    name: "Analytical Thinking",
    icon: "📈",
    desc: "I use data and logic to evaluate options, optimise performance, and make informed decisions.",
  },
  {
    name: "Leadership",
    icon: "🚀",
    desc: "I take initiative, guide teammates toward shared goals, and own the outcome of every project.",
  },
  {
    name: "Time Management",
    icon: "⏱️",
    desc: "I prioritise tasks effectively and consistently deliver quality work within deadlines.",
  },
];

// ── Projects ──────────────────────────────────────────────────
export const projects = [
  {
    id: "speakwell",
    number: "01",
    badge: "🚀 Flagship Project",
    title: "SpeakWell – AI-Powered English Speaking App",
    description:
      "Developed an AI-powered platform for conversational English practice, speech evaluation, personalised feedback, progress tracking, and session scheduling.",
    techTags: ["HTML", "CSS", "JavaScript", "Python (Flask)", "MySQL", "AI Chatbot", "Speech API"],
    links: {
      github: "https://github.com/narendra192211960",
      demo: "",
    },
    isFlagship: true,
  },
  {
    id: "aqi",
    number: "02",
    badge: null,
    title: "Air Quality Index (AQI) Prediction System",
    description:
      "Developed a machine learning system to predict AQI levels based on atmospheric pollutants and provide personalised health safety recommendations.",
    techTags: ["Python", "Machine Learning", "Scikit-learn"],
    links: {
      github: "",
      demo: "",
    },
    isFlagship: false,
  },
  {
    id: "blooddonor",
    number: "03",
    badge: null,
    title: "Blood Donor Connection Portal",
    description:
      "Developed a web application connecting blood donors with recipients during emergencies, featuring donor registration, location filtering, and blood availability search.",
    techTags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    links: {
      github: "https://github.com/192211960/CSA-4309-Internet-Programming",
      demo: "",
    },
    isFlagship: false,
  },
];

// ── Certificates (bonus) ──────────────────────────────────────
export const certificates = {
  featured: [{ name: "Full Stack Development", issuer: "TAP Academy", icon: "🏅" }],
  viewAllUrl: "https://www.linkedin.com/in/ambati-narendra-kumar-reddy",
};

// ── Education ─────────────────────────────────────────────────
export const education = {
  degree: "B.E. Computer Science Engineering",
  institution: "SIMATS Engineering",
  cgpa: "2022 – 2026",
  graduation: "2026",
  twelfth: "",
  tenth: "",
};

// ── Footer ────────────────────────────────────────────────────
export const footerContent = {
  taglines: [
    "Java Full Stack Developer",
    "Java · React.js · Python · MySQL",
    "Building scalable web & AI solutions",
  ],
  credential: "B.E. Computer Science Engineering",
  copyright: `© ${new Date().getFullYear()} Ambati Narendra Kumar Reddy | Built with React`,
};

// ── EmailJS (read from .env.local) ───────────────────────────
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
