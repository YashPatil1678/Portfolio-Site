import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Menu, 
  X, 
  Server, 
  Cloud, 
  Terminal, 
  Code, 
  Database, 
  ShieldCheck,
  ChevronUp,
  Cpu,
  Globe,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

const Portfolio = () => {
  // Theme state: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // CHANGED: Default active section is now 'about' instead of 'hero'
  const [activeSection, setActiveSection] = useState('about');
  
  // Typewriter effect state
  const roles = ["DevOps Engineer", "Cloud Architect", "Automation Expert", "Kubernetes Administrator"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Apply theme to the root element and save preference
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // CHANGED: Removed 'hero' and kept 'about' as the first section
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const deleteDelay = 2000;

    const handleTyping = () => {
      const currentFullText = roles[currentRoleIndex];
      
      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), deleteDelay);
          return; // Pause before deleting
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // --- Tailwind Classes optimized for Dark/Light Mode ---
  const themeClasses = {
    // General Colors
    bg: 'bg-slate-50 dark:bg-slate-950',
    text: 'text-slate-800 dark:text-slate-300',
    navBg: scrolled ? 'bg-white/90 dark:bg-slate-950/80 backdrop-blur-md dark:border-slate-800 border-slate-200 py-3' : 'bg-transparent border-transparent py-6',
    navBorder: 'dark:border-slate-800 border-slate-200',
    navLink: 'dark:text-slate-400 text-slate-600',
    headerGlow: 'bg-cyan-500/10 dark:bg-cyan-500/10 dark:bg-blue-600/10 bg-blue-600/10',
    // Section Backgrounds
    skillBg: 'bg-white dark:bg-slate-900/50 dark:border-slate-800 border-slate-200',
    expBg: 'bg-slate-100 dark:bg-slate-900/30',
    stripeBg: 'bg-slate-200 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 border-y dark:border-slate-700 border-slate-300',
    // Card/Container Styles
    cardBg: 'bg-white dark:bg-slate-900 border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50',
    subtleBg: 'bg-slate-100 dark:bg-slate-950 p-4 border-t dark:border-slate-800 border-slate-300',
    // Text Colors
    title: 'text-slate-900 dark:text-white',
    subtext: 'text-slate-600 dark:text-slate-400',
    codeSnippetBg: 'bg-gray-800/90 dark:bg-black/80 border-slate-700',
    // Timeline
    timelineBorder: 'dark:border-slate-700 border-slate-300',
    timelineDot: 'dark:bg-slate-900 bg-slate-50 border-2 dark:border-cyan-400 border-cyan-500',
    timelineDotSecondary: 'dark:bg-slate-900 bg-slate-50 border-2 dark:border-slate-600 border-slate-400',
  };

  return (
    <div className={`${themeClasses.bg} ${themeClasses.text} font-sans min-h-screen selection:bg-cyan-500 selection:text-white overflow-x-hidden transition-colors duration-500`}>
      
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: theme === 'dark' 
               ? 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)'
               : 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${themeClasses.navBg}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-bold dark:text-white text-slate-900 tracking-tighter cursor-pointer flex items-center gap-2" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Terminal className="text-cyan-500 w-8 h-8" />
            <span>YP<span className="text-cyan-500">.</span>dev</span>
          </div>

          {/* Desktop Menu & Theme Toggle */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`transition-all duration-300 hover:text-cyan-500 ${activeSection === item.toLowerCase() ? 'text-cyan-500' : themeClasses.navLink}`}
              >
                {item}
              </button>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="dark:text-white text-slate-800 focus:outline-none">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 w-full dark:bg-slate-900 bg-white shadow-2xl transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100 border-t ' + themeClasses.navBorder : 'scale-y-0 opacity-0'}`}>
          <div className="flex flex-col p-6 space-y-4">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-left text-lg hover:text-cyan-500 ${themeClasses.title}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section (Renamed ID from 'hero' to 'about') */}
      <header id="about" className="relative min-h-screen flex items-center justify-center pt-20 z-10">
        <div className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[100px] ${themeClasses.headerGlow}`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[100px] ${themeClasses.headerGlow}`}></div>

        <div className="max-w-7xl mx-auto px-6 text-center md:text-left md:flex md:items-center md:justify-between w-full">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block px-4 py-2 rounded-full dark:bg-slate-900/50 bg-slate-200 border dark:border-slate-700 border-slate-300 text-cyan-500 text-sm font-medium mb-2">
              Available for Hire
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold dark:text-white text-slate-900 leading-tight">
              Hello, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Yash Patil
              </span>
            </h1>
            <div className="text-xl md:text-3xl text-slate-500 font-light h-10">
              I am a <span className="dark:text-white text-slate-900 font-normal">{displayText}</span>
              <span className="animate-pulse text-cyan-500">|</span>
            </div>
            <p className={`max-w-lg ${themeClasses.subtext} leading-relaxed text-lg`}>
              Building scalable, automated, and resilient cloud systems. I bridge the gap between code and operations to deliver value faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-900/20"
              >
                View My Work
              </button>
              <a 
                href="/resume.pdf" 
                download="Yash_Patil_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 dark:bg-slate-900 dark:border-slate-700 dark:text-white bg-white border border-slate-300 text-slate-800 hover:border-cyan-500/50 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group"
              >
                <Download size={18} className="group-hover:text-cyan-500 transition-colors" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Hero Illustration (Abstract Tech) */}
          <div className="hidden md:block md:w-5/12 relative">
             <div className="relative w-full aspect-square dark:bg-slate-900/50 bg-white/70 rounded-2xl border dark:border-slate-800 border-slate-300 p-8 backdrop-blur-sm grid grid-cols-2 gap-4 animate-float shadow-xl dark:shadow-none">
                <div className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center border dark:border-slate-700 border-slate-300">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-16 h-16 mb-2 dark:brightness-0 dark:invert" />
                    <span className="font-mono text-sm dark:text-white text-slate-700">AWS Native</span>
                </div>
                <div className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center border dark:border-slate-700 border-slate-300">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="K8s" className="w-16 h-16 mb-2" />
                    <span className="font-mono text-sm dark:text-white text-slate-700">K8s Cluster</span>
                </div>
                <div className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center border dark:border-slate-700 border-slate-300">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform" className="w-16 h-16 mb-2" />
                    <span className="font-mono text-sm dark:text-white text-slate-700">Automation</span>
                </div>
                <div className="dark:bg-slate-800/50 bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center border dark:border-slate-700 border-slate-300">
                    <ShieldCheck className="text-green-500 w-16 h-16 mb-2" />
                    <span className="font-mono text-sm dark:text-white text-slate-700">Security</span>
                </div>
                
                {/* Floating Code Snippet */}
                <div className={`absolute -bottom-6 -left-6 ${themeClasses.codeSnippetBg} border dark:border-slate-700 border-slate-400 p-4 rounded-lg font-mono text-xs text-green-400 shadow-2xl`}>
                   $ terraform apply -auto-approve<br/>
                   <span className="dark:text-white text-slate-300">Resource actions are indicated with the following symbols:</span><br/>
                   <span className="text-green-400">+ create</span><br/>
                   <span className="dark:text-white text-slate-300">Terraform will perform the following actions...</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce dark:text-slate-500 text-slate-400">
           <ChevronUp className="rotate-180" />
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end gap-4 mb-12 border-b dark:border-slate-800 border-slate-300 pb-4">
             <h2 className={`text-4xl font-bold ${themeClasses.title}`}>Technical <span className="text-cyan-500">Stack</span></h2>
             <span className="dark:text-slate-500 text-slate-400 pb-2 hidden sm:block">Tools & Technologies I use daily</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AWS Cloud - REVERTED AWS ICON */}
            <div className={`${themeClasses.skillBg} p-6 rounded-xl hover:border-cyan-500/30 transition-colors group dark:shadow-none shadow-lg shadow-slate-200/50`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 dark:bg-white/5 bg-slate-200 rounded-lg">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-8 h-8 dark:brightness-0 dark:invert" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.title}`}>AWS Cloud</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['EC2', 'S3', 'Lambda', 'EKS', 'VPC', 'IAM', 'Route53', 'CloudFront'].map(skill => (
                     <span key={skill} className="px-3 py-1 text-xs dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 rounded border dark:border-slate-700 border-slate-300 group-hover:border-cyan-500/30 transition-colors">{skill}</span>
                  ))}
               </div>
            </div>

            {/* DevOps Tools */}
            <div className={`${themeClasses.skillBg} p-6 rounded-xl hover:border-cyan-500/30 transition-colors group dark:shadow-none shadow-lg shadow-slate-200/50`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 dark:bg-white/5 bg-slate-200 rounded-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.title}`}>Containerization</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['Docker', 'Kubernetes', 'Helm', 'Docker Compose', 'EKS/AKS'].map(skill => (
                     <span key={skill} className="px-3 py-1 text-xs dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 rounded border dark:border-slate-700 border-slate-300 group-hover:border-blue-500/30 transition-colors">{skill}</span>
                  ))}
               </div>
            </div>

            {/* IaC */}
            <div className={`${themeClasses.skillBg} p-6 rounded-xl hover:border-cyan-500/30 transition-colors group dark:shadow-none shadow-lg shadow-slate-200/50`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 dark:bg-white/5 bg-slate-200 rounded-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform" className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.title}`}>IaC & Config</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['Terraform', 'Ansible', 'CloudFormation', 'YAML', 'HCL'].map(skill => (
                     <span key={skill} className="px-3 py-1 text-xs dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 rounded border dark:border-slate-700 border-slate-300 group-hover:border-purple-500/30 transition-colors">{skill}</span>
                  ))}
               </div>
            </div>

             {/* CI/CD */}
             <div className={`${themeClasses.skillBg} p-6 rounded-xl hover:border-cyan-500/30 transition-colors group dark:shadow-none shadow-lg shadow-slate-200/50`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 dark:bg-white/5 bg-slate-200 rounded-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.title}`}>CI/CD</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'Groovy'].map(skill => (
                     <span key={skill} className="px-3 py-1 text-xs dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 rounded border dark:border-slate-700 border-slate-300 group-hover:border-green-500/30 transition-colors">{skill}</span>
                  ))}
               </div>
            </div>

            {/* Scripting */}
            <div className={`${themeClasses.skillBg} p-6 rounded-xl hover:border-cyan-500/30 transition-colors group dark:shadow-none shadow-lg shadow-slate-200/50`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 dark:bg-white/5 bg-slate-200 rounded-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.title}`}>Scripting & OS</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['Bash/Shell', 'Python', 'Linux (RHEL/Ubuntu)', 'Vim', 'Git'].map(skill => (
                     <span key={skill} className="px-3 py-1 text-xs dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 rounded border dark:border-slate-700 border-slate-300 group-hover:border-yellow-500/30 transition-colors">{skill}</span>
                  ))}
               </div>
            </div>

            {/* Monitoring */}
            <div className={`${themeClasses.skillBg} p-6 rounded-xl hover:border-cyan-500/30 transition-colors group dark:shadow-none shadow-lg shadow-slate-200/50`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 dark:bg-white/5 bg-slate-200 rounded-lg">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" alt="Grafana" className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.title}`}>Observability</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['Prometheus', 'Grafana', 'CloudWatch', 'ELK Stack', 'Datadog'].map(skill => (
                     <span key={skill} className="px-3 py-1 text-xs dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 rounded border dark:border-slate-700 border-slate-300 group-hover:border-red-500/30 transition-colors">{skill}</span>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-24 relative z-10 ${themeClasses.expBg}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`text-4xl font-bold ${themeClasses.title} mb-16 text-center`}>Work Experience</h2>

          <div className={`relative border-l ${themeClasses.timelineBorder} ml-6 md:ml-12 space-y-12`}>
            
            {/* Infosys Senior */}
            <div className="relative pl-12">
              <div className={`absolute -left-3 top-2 w-6 h-6 rounded-full ${themeClasses.timelineDot}`}></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className={`text-2xl font-bold ${themeClasses.title}`}>Senior Systems Associate</h3>
                <div className="inline-block dark:bg-cyan-900/30 bg-cyan-100 text-cyan-500 text-xs px-3 py-1 rounded-full font-mono mt-2 md:mt-0 dark:border-cyan-800 border-cyan-300 border">Jan 2024 – Present</div>
              </div>
              <h4 className={`text-xl ${themeClasses.subtext} mb-4 font-medium`}>Infosys Limited</h4>
              <p className={`mb-4 italic text-sm ${themeClasses.subtext}`}>Project: US Telecom Client</p>
              <ul className={`list-disc list-outside ml-4 space-y-3 ${themeClasses.text} leading-relaxed`}>
                <li>Orchestrated cloud infrastructure migration for 3 microservices resulting in <strong>20% cost reduction</strong>.</li>
                <li>Designed and implemented secure CI/CD pipelines using Jenkins & GitHub Actions.</li>
                <li>Managed EKS clusters with Terraform, improving deployment consistency.</li>
              </ul>
            </div>

            {/* Infosys Systems Engineer */}
            <div className="relative pl-12">
              <div className={`absolute -left-3 top-2 w-6 h-6 rounded-full ${themeClasses.timelineDotSecondary}`}></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className={`text-2xl font-bold ${themeClasses.title}`}>Systems Engineer</h3>
                <div className="inline-block dark:bg-slate-800 bg-slate-200 dark:text-slate-400 text-slate-600 text-xs px-3 py-1 rounded-full font-mono mt-2 md:mt-0 dark:border-slate-700 border-slate-300 border">Dec 2021 – Dec 2023</div>
              </div>
              <h4 className={`text-xl ${themeClasses.subtext} mb-4 font-medium`}>Infosys Limited</h4>
              <ul className={`list-disc list-outside ml-4 space-y-3 ${themeClasses.text} leading-relaxed`}>
                <li>Provided 24/7 production support for critical infrastructure.</li>
                <li>Automated routine Linux maintenance tasks using Bash scripts, saving 5 man-hours weekly.</li>
                <li>Implemented CloudWatch dashboards for real-time server monitoring.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-4xl font-bold ${themeClasses.title} mb-12`}>Featured Projects</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Project 1 - Serverless URL Shortener (Blue) */}
            <div className={`group rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${themeClasses.cardBg}`}>
               <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500">
                        <Globe className="w-8 h-8" />
                     </div>
                     <a href="#" aria-label="View Serverless URL Shortener" className="text-slate-500 group-hover:text-cyan-500 transition-colors">
                        <ExternalLink />
                     </a>
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.title} mb-3`}>Serverless URL Shortener</h3>
                  <p className={`${themeClasses.subtext} leading-relaxed mb-6`}>
                     Built a highly scalable, zero-maintenance URL shortening service. Leveraged Lambda for logic and DynamoDB for low-latency data storage.
                  </p>
               </div>
               <div className={themeClasses.subtleBg + ' flex gap-3 overflow-x-auto'}>
                  {['AWS Lambda', 'API Gateway', 'DynamoDB', 'Python'].map(tech => (
                     <span key={tech} className="text-xs font-mono text-cyan-500 whitespace-nowrap">{tech}</span>
                  ))}
               </div>
            </div>

            {/* Project 2 - CI/CD for Microservices (Purple) */}
            <div className={`group rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${themeClasses.cardBg}`}>
               <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-purple-600/20 rounded-lg text-purple-500">
                        <Layers className="w-8 h-8" />
                     </div>
                     <a href="#" aria-label="View CI/CD for Microservices" className="text-slate-500 group-hover:text-cyan-500 transition-colors">
                        <ExternalLink />
                     </a>
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.title} mb-3`}>CI/CD for Microservices</h3>
                  <p className={`${themeClasses.subtext} leading-relaxed mb-6`}>
                     Designed a complete pipeline for a Dockerized app. Includes automated testing, Docker image build/push, and deployment to a staging server.
                  </p>
               </div>
               <div className={themeClasses.subtleBg + ' flex gap-3 overflow-x-auto'}>
                  {['Jenkins', 'Docker', 'GitHub Actions', 'Shell'].map(tech => (
                     <span key={tech} className="text-xs font-mono text-cyan-500 whitespace-nowrap">{tech}</span>
                  ))}
               </div>
            </div>

            {/* Project 3 - K8s 2-Tier Deployment (Green) */}
            <div className={`group rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${themeClasses.cardBg}`}>
               <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-green-600/20 rounded-lg text-green-500">
                        <Server className="w-8 h-8" />
                     </div>
                     <a href="#" aria-label="View K8s 2-Tier Deployment" className="text-slate-500 group-hover:text-cyan-500 transition-colors">
                        <ExternalLink />
                     </a>
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.title} mb-3`}>K8s 2-Tier Deployment</h3>
                  <p className={`${themeClasses.subtext} leading-relaxed mb-6`}>
                     Deployed a frontend-backend architecture on EKS. Utilized ConfigMaps and Secrets for secure environment variable management.
                  </p>
               </div>
               <div className={themeClasses.subtleBg + ' flex gap-3 overflow-x-auto'}>
                  {['Kubernetes', 'EKS', 'Nginx', 'YAML'].map(tech => (
                     <span key={tech} className="text-xs font-mono text-cyan-500 whitespace-nowrap">{tech}</span>
                  ))}
               </div>
            </div>

            {/* Project 4 - VPC Network Architecture (Cyan/Blue) */}
            <div className={`group rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${themeClasses.cardBg}`}>
               <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-cyan-600/20 rounded-lg text-cyan-500">
                        <ShieldCheck className="w-8 h-8" />
                     </div>
                     <a href="#" aria-label="View VPC Network Architecture" className="text-slate-500 group-hover:text-cyan-500 transition-colors">
                        <ExternalLink />
                     </a>
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.title} mb-3`}>VPC Network Architecture</h3>
                  <p className={`${themeClasses.subtext} leading-relaxed mb-6`}>
                     Architected a secure AWS VPC with public/private subnets, NAT Gateways, and strict Network ACLs to ensure data isolation.
                  </p>
               </div>
               <div className={themeClasses.subtleBg + ' flex gap-3 overflow-x-auto'}>
                  {['AWS VPC', 'Networking', 'Security Groups'].map(tech => (
                     <span key={tech} className="text-xs font-mono text-cyan-500 whitespace-nowrap">{tech}</span>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications Stripe */}
      <section className={`py-16 relative z-10 ${themeClasses.stripeBg}`}>
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
               <h2 className={`text-2xl font-bold ${themeClasses.title}`}>Certifications</h2>
               <p className={themeClasses.subtext}>Validated expertise in Cloud & Ops</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
               <div className="flex items-center gap-2 dark:bg-slate-950 bg-slate-50 px-4 py-2 rounded border dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div> AWS Cloud Practitioner
               </div>
               <div className="flex items-center gap-2 dark:bg-slate-950 bg-slate-50 px-4 py-2 rounded border dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div> AWS SysOps Admin
               </div>
               <div className="flex items-center gap-2 dark:bg-slate-950 bg-slate-50 px-4 py-2 rounded border dark:border-slate-700 border-slate-300 dark:text-slate-500 text-slate-600 opacity-75">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div> Terraform (In Progress)
               </div>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold ${themeClasses.title} mb-6`}>Let's Build Something Scalable</h2>
          <p className={`text-xl ${themeClasses.subtext} mb-12`}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <a 
               href="mailto:yashp1678@gmail.com" 
               className="px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 rounded-full font-bold text-lg transition-all flex items-center gap-3"
            >
               <Mail /> Say Hello
            </a>

            <div className="flex gap-8 mt-8">
              <a href="https://github.com/YashPatil1678" target="_blank" rel="noreferrer" className={`dark:text-slate-400 text-slate-600 hover:${themeClasses.title} transition-colors transform hover:scale-110`}>
                <Github size={32} />
              </a>
              <a href="https://linkedin.com/in/yash-patil-976126217" target="_blank" rel="noreferrer" className="dark:text-slate-400 text-slate-600 hover:text-blue-500 transition-colors transform hover:scale-110">
                <Linkedin size={32} />
              </a>
            </div>
            
            <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl text-left dark:bg-slate-900 bg-white p-8 rounded-2xl border dark:border-slate-800 border-slate-300`}>
               <div className="flex items-center gap-4">
                  <Phone className="text-cyan-500" />
                  <div>
                     <p className="text-xs dark:text-slate-500 text-slate-400 uppercase tracking-widest">Phone</p>
                     <p className={themeClasses.title}>+91 7057700367</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <MapPin className="text-cyan-500" />
                  <div>
                     <p className="text-xs dark:text-slate-500 text-slate-400 uppercase tracking-widest">Location</p>
                     <p className={themeClasses.title}>Nagpur, India</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark:bg-slate-950 bg-slate-100 py-8 text-center dark:text-slate-600 text-slate-400 text-sm border-t dark:border-slate-900 border-slate-200 relative z-10">
        <p>© 2025 Yash Patil. Engineered with React & Tailwind.</p>
      </footer>
      
      {/* Styles for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default Portfolio;
