import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Moon, 
  Sun,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Download,
  Send,
  MapPin,
  ArrowRight,
  Phone,
} from 'lucide-react';

import image from './assets/img1.jpg';
import resume from './assets/Venkataramana_T_resume.pdf'
import Disaster from './assets/Disaster.png';
import WanderLust from './assets/WanderLust.png';
import Weather from './assets/Weather.png';


/**
 * UTILITY: RevealOnScroll Component
 */
const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [error, setError] = useState("");
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Smooth Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  // Updated Skills from Resume
  const skills = [
    { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Tableau", img: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
    { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" }
  ];

    // Simple email format validation
  const validateEmail = (email) => {
    const re =
      /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:(?:\\[\x00-\x7F]|[^\\"]))*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?!$)|$)){4}\]))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subjectInput = contactForm.name; 
    const senderEmail = contactForm.email;
    const message =contactForm.message;

    // Validate sender email format
    if (!validateEmail(senderEmail)) {
      setError("Invalid email address!");
      return;
    }

    // Encode subject and body for URL
    const subject = encodeURIComponent(subjectInput);
    const body = encodeURIComponent(`From: ${senderEmail}\n\n${message}`);

    // Redirect to Gmail compose with pre-filled details
    window.open(
      `https://mail.google.com/mail/?view=cm&to=tvenkataramana805@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );

    setError("");
    setContactForm({ name: '', email: '', message: '' });
  };


  return (
    // Updated Light Mode Background: Soft Emerald-Teal Gradient with Dark Teal text
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 text-slate-900'}`}>
      
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-300  ${isDarkMode ? 'bg-slate-900/90 border-b border-slate-800' : 'bg-white/80 backdrop-blur-xl border-b border-teal-100 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className={`text-2xl font-bold bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-teal-500' : 'bg-gradient-to-r from-teal-700 to-emerald-600'}`}>
                Venkataramana-T
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8 ">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={` font-medium transition-colors text-xl border-0 ${
                    activeSection === link.id 
                      ? (isDarkMode ? 'text-blue-600' : 'text-teal-700')
                      : (isDarkMode ? 'text-slate-300 hover:text-blue-600' : 'text-slate-600 hover:text-teal-700')
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors border-0 ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-teal-100 text-teal-700'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${isDarkMode ? 'text-yellow-400' : 'text-teal-700'}`}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-md ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden  absolute w-full transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-b border-slate-800' : 'bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xl'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === link.id 
                      ? (isDarkMode ? 'text-blue-600 bg-blue-50/10' : 'text-teal-700 bg-teal-50')
                      : (isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50')
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <div style={{width:"99vw"}}>
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden text-center">
        {/* Animated Background Blobs - Light Mode Colors Adjusted */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse ${isDarkMode ? 'bg-blue-600/20' : 'bg-emerald-300/30'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse delay-1000 ${isDarkMode ? 'bg-teal-600/20' : 'bg-sky-300/30'}`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 animate-fade-in-up">
            
            {/* Main Typography */}
            <div className="space-y-4">
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-medium tracking-wide ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Hi, I'm
              </h2>
              
              {/* Name - RESPONSIVE TEXT SIZE ADJUSTED */}
              <h1 className={`text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tight leading-tight md:leading-none whitespace-normal md:whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-teal-700'}`}>
                 {isDarkMode ? (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600">
                      Venkataramana T
                    </span>
                  ) : (
                    "Venkataramana T"
                  )}
              </h1>
              
              {/* Tagline - RESPONSIVE TEXT SIZE ADJUSTED */}
              <h2 className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light mt-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                A passionate <span className={`font-semibold ${isDarkMode ? 'text-teal-500' : 'text-teal-700'}`}>MERN Stack Developer</span>.
              </h2>

              {/* Updated Paragraph Block - RESPONSIVE TEXT SIZE ADJUSTED */}
              <p className={`text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                I specialize in building full-stack web applications using the MERN stack, ensuring scalability and performance. Coupled with my strong foundation in Data Structures and Algorithms (DSA), I write efficient, optimized code to solve complex problems effectively.
              </p>
            </div>

            {/* Action Row: Button + Socials (Centered) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 pt-8 w-full">
              {/* Equal width buttons container */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className={`w-full sm:w-48 px-6 py-3.5 rounded-lg text-white font-bold text-base transition-colors duration-200 shadow-md flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-emerald-600 hover:bg-emerald-700 hover:border-green-400' 
                  }`}
                >
                  View My Work <ArrowRight size={18} />
                </button>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full sm:w-48 px-6 py-3.5 rounded-lg font-bold text-base transition-colors duration-200 shadow-md flex items-center justify-center
                    
                    ${
                    isDarkMode 
                      ? 'bg-transparent border-2 border-slate-700 text-white hover:bg-slate-800 ' 
                      : 'bg-white text-emerald-600 hover:bg-emerald-50  border-emerald-100 hover:border-green-400 ' 
                  }`}
                >
                  Contact Me
                </button>
              </div>
              
              {/* Divider (Hidden on small screens) */}
              <div className={`h-8 w-px mx-2 hidden sm:block ${isDarkMode ? 'bg-slate-700' : 'bg-slate-400'}`}></div>

              {/* Social Icons */}
              <div className="flex gap-4 sm:gap-3 mt-4 sm:mt-0">
                {[
                  { icon: Github, link: "https://github.com/VENKATARAMANA-T" },
                  { icon: Linkedin, link: "https://www.linkedin.com/in/venkataramana-t-1b7478291/" },
                  { icon: Mail, link: "mailto:tvenkataramana805@gmail.com" }
                ].map((item, index) => (
                  <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full border transition-all hover:scale-110 ${
                    isDarkMode 
                      ? 'border-slate-700 hover:border-teal-500 text-slate-400 hover:text-teal-500 hover:bg-slate-800' 
                      : 'border-white bg-white text-slate-600 hover:text-emerald-700 hover:border-emerald-400 shadow-sm'
                  }`}>
                    <item.icon size={22} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-50 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          <ChevronDown size={32} />
        </div>
      </section>
      </div>
      {/* About */}
      <section id="about" className={`py-12 md:py-20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-10 md:mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>About Me</h2>
              <div className={`w-20 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative group flex justify-center">
                {/* Fixed Image - Responsive Size */}
                <div className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden relative z-10 transition-all duration-500 ${
                  isDarkMode 
                    ? 'shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.3)]' 
                    : 'shadow-lg bg-white ring-1 ring-emerald-100'
                }`}>
                  <img src={image} alt="Venkataramana T" className="w-full h-full object-contained" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-600' : 'text-teal-700'}`}>Who am I?</h3>
                <p className={`text-base md:text-lg leading-relaxed mb-6 ${isDarkMode ? 'opacity-90' : 'text-slate-700'}`}>
                  I am a passionate Computer Science Engineering student (B.Tech 2023-2027) at Amrita Vishwa Vidyapeetham with a CGPA of 9.09/10. My journey involves deep dives into C++ and Python problem-solving, along with hands-on MERN stack development.
                </p>
                <p className={`text-base md:text-lg leading-relaxed mb-8 ${isDarkMode ? 'opacity-90' : 'text-slate-700'}`}>
                  I have research experience as a Data Analyst, analyzing forest CO2 sequestration using Python & Tableau. I'm eager to contribute to real-world projects and grow as a full-stack developer in dynamic environments.
                </p>
                <a href="#" className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-bold shadow-md ${
                  isDarkMode 
                    ? 'bg-slate-200 text-slate-900 hover:bg-blue-700 hover:text-slate-100' 
                    : 'bg-white text-teal-700 border border-teal-200   hover:shadow-lg hover:bg-emerald-600 hover:text-slate-100'
                }`}
                onClick={()=>{ window.open(resume, "_blank"); }}
                >
                  <Download size={18} /> Download Resume
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-10 md:mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Technical Skills</h2>
              <div className={`w-20 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}></div>
            </div>
            
            {/* Left Aligned Content in Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/30' 
                    : 'bg-white border-teal-100 hover:border-teal-300 hover:shadow-lg shadow-sm'
                }`}>
                  
                  <img 
                    src={skill.img} 
                    alt={skill.name} 
                    className="w-8 h-8 object-contain"
                  />
                  
                  <span className={`font-semibold text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`py-12 md:py-20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-10 md:mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Featured Projects</h2>
              <div className={`w-20 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "WanderLust-Travel-Platform", 
                  desc: "Full-Stack Travel Platform. Secure authentication (Passport.js), RESTful APIs, Cloudinary storage, and interactive maps (Mapbox).", 
                  tech: ["Node.js", "Express", "MongoDB", "EJS"], 
                  img: WanderLust, 
                  link: "https://youtu.be/MRObNi0xAU0", 
                  github: "https://github.com/VENKATARAMANA-T/WanderLust-Project" 
                },
                { 
                  title: "Weather-App-By-React", 
                  desc: "A React-based Weather App using an API to display real-time temperature, humidity, and conditions. Includes City Name Validation." ,
                  tech: ["React js", "HTML", "CSS", "JavaScript"], 
                  img: Weather, 
                  link: "https://youtu.be/ddJYaavMkUQ", 
                  github: "https://github.com/VENKATARAMANA-T/Weather-App-By-React" 
                },
                { 
                  title: "Disaster-Response-System", 
                  desc: "System using core data structures (Graphs, AVL Trees, Heaps) for optimized emergency handling and route planning.", 
                  tech: ["Python", "DSA", "Algorithms"], 
                  img:Disaster, 
                  link: "https://github.com/VENKATARAMANA-T/Disaster-Response-System", 
                  github: "https://github.com/VENKATARAMANA-T/Disaster-Response-System" 
                }
              ].map((project, index) => (
                <div key={index} className={`group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 ${isDarkMode ? 'bg-slate-900 border border-white/10' : 'bg-white border border-teal-100 hover:shadow-2xl hover:shadow-emerald-500/10'}`}>
                  <div className="relative overflow-hidden h-48">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${isDarkMode ? 'group-hover:text-blue-600' : 'group-hover:text-teal-700 text-slate-900'}`}>{project.title}</h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded-md font-medium ${isDarkMode ? 'bg-slate-800 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>{t}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <a href={project.github} target='_blank' className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                          isDarkMode 
                            ? 'bg-white/10 hover:bg-white/20 text-white hover:text-slate-100' 
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}>
                            <Github size={18} /> GitHub
                        </a>
                        <a href={project.link} target='_blank' className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:text-slate-100' 
                            : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:text-slate-100'
                        }`}>
                            <ExternalLink size={18} /> Live Demo
                        </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-10 md:mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Experience & Education</h2>
              <div className={`w-20 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { type: "work", title: "Research Scholar - Data Analyst", place: "Coimbatore, Tamil Nadu", date: "Aug 2024 - Apr 2025", desc: "Analyzed forest and tree types across India to study CO2 sequestration potential. Used Matplotlib, Seaborn, and Tableau for visualization." }
              ].map((item, index) => (
                <div key={index} className={`p-6 rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50' 
                      : 'bg-white border-slate-300 shadow-sm hover:shadow-lg hover:border-teal-300'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="relative z-10 w-full">
                             <span className={`text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block ${
                               isDarkMode 
                                 ? 'bg-blue-500/20 text-blue-300' 
                                 : 'bg-emerald-100 text-emerald-800'
                             }`}>{item.date}</span>
                            <h3 className="text-xl font-bold flex items-center gap-2">{item.title}</h3>
                            <div className={`text-sm font-medium mt-1 flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {item.type === 'work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                                {item.place}
                            </div>
                        </div>
                    </div>
                    <p className={`relative z-10 text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-12 md:py-20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-10 md:mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Get In Touch</h2>
              <div className={`w-20 h-1 mx-auto rounded-full ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}></div>
              <p className={`mt-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Have a project in mind or just want to say hi?</p>
            </div>

            <div className={`rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-white border border-slate-300 shadow-xl'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className={`p-6 md:p-10 text-white ${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-teal-500' : 'bg-gradient-to-br from-emerald-600 to-teal-600'}`}>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <p className="mb-8 opacity-90">I'm currently open for freelance projects and full-time opportunities.</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full"><Mail size={20} className="text-white" /></div>
                      <div><p className="text-sm opacity-70">Email Me</p><p className="font-bold break-all">tvenkataramana805@gmail.com</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full"><Phone size={20} className="text-white" /></div>
                      <div><p className="text-sm opacity-70">Call Me</p><p className="font-bold">+91 8328056005</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full"><MapPin size={20} className="text-white" /></div>
                      <div><p className="text-sm opacity-70">Location</p><p className="font-bold">Tirupathi, Andhra Pradesh</p></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <form onSubmit={handleSubmit}>

                    <div className="mb-6">
                      <label htmlFor="email" className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>Email</label>
                      <input 
                        type="email" 
                        id="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                            : 'bg-slate-100 border-slate-300 text-slate-900 focus:border-emerald-500 focus:bg-white'
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="Subject" className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>Subject</label>
                      <input 
                        type="text" 
                        id="Subject"
                        value={contactForm.name}
                    
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                            : 'bg-slate-100 border-slate-300 text-slate-900 focus:border-emerald-500 focus:bg-white'
                        }`}
                        placeholder="Enter Subject"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="message" className={`block text-sm font-bold ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>Message</label>
                      </div>
                      <textarea 
                        id="message"
                        rows="4"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                            : 'bg-slate-100 border-slate-300 text-slate-900 focus:border-emerald-500 focus:bg-white'
                        }`}
                        placeholder="How can I help you?"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 hover:shadow-blue-500/25' 
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/25'
                    }`}>
                      Send Message <Send size={18} />
                    </button>
                     {error && <p style={{ color: "red" }}>{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <footer className={`py-8 text-center border-t ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-300 text-slate-600'}`}>
        <p className="flex items-center justify-center gap-2">Designed & Built with <span className="text-red-500">❤</span> by Venkataramana T</p>
        <p className="text-sm mt-2 opacity-70">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}