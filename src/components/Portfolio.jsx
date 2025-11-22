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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [darkMode, setDarkMode] = useState(true);

    // Typewriter effect state
    const roles = ["DevOps Engineer", "Cloud Architect", "Automation Enthusiast", "Kubernetes Administrator"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
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

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    // Helper classes for theme
    const theme = {
        bg: darkMode ? 'bg-slate-950' : 'bg-slate-50',
        text: darkMode ? 'text-slate-300' : 'text-slate-600',
        heading: darkMode ? 'text-white' : 'text-slate-900',
        cardBg: darkMode ? 'bg-slate-900/50' : 'bg-white',
        cardBorder: darkMode ? 'border-slate-800' : 'border-slate-200 shadow-sm',
        navBg: darkMode ? 'bg-slate-950/80' : 'bg-white/80',
        navBorder: darkMode ? 'border-slate-800' : 'border-slate-200',
    };

    // Logic to handle logo styles
    const getLogoStyle = (needsInversion) => {
        if (darkMode) {
            return needsInversion ? "brightness-0 invert opacity-90" : "opacity-90";
        }
        return "";
    };

    const getLogoContainerStyle = () => {
        if (darkMode) return "bg-transparent";
        return "bg-slate-100 shadow-sm";
    };

    return (
        <div className={`${theme.bg} ${theme.text} font-sans min-h-screen selection:bg-cyan-500 selection:text-white overflow-x-hidden transition-colors duration-300`}>

            {/* Grid Background Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(${darkMode ? '#1e293b' : '#cbd5e1'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#1e293b' : '#cbd5e1'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? `${theme.navBg} backdrop-blur-md ${theme.navBorder} py-3` : 'bg-transparent border-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div
                        className={`text-2xl font-bold ${theme.heading} tracking-tighter cursor-pointer flex items-center gap-2`}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <Terminal className="text-cyan-500 w-8 h-8" />
                        <span>YP<span className="text-cyan-500">.</span>dev</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`transition-all duration-300 hover:text-cyan-500 ${activeSection === item.toLowerCase() ? 'text-cyan-500' : ''}`}
                            >
                                {item}
                            </button>
                        ))}

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-200 text-slate-700'}`}
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${theme.heading} focus:outline-none`}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden absolute top-full left-0 w-full ${darkMode ? 'bg-slate-900' : 'bg-white'} border-b ${theme.navBorder} shadow-2xl transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
                    <div className="flex flex-col p-6 space-y-4">
                        {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`text-left text-lg hover:text-cyan-500 ${theme.heading}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="hero" className="relative min-h-screen flex items-center justify-center pt-20 z-10">
                {/* Background Blurs */}
                <div className={`absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] ${!darkMode && 'opacity-50'}`}></div>
                <div className={`absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] ${!darkMode && 'opacity-50'}`}></div>

                <div className="max-w-7xl mx-auto px-6 text-center md:text-left md:flex md:items-center md:justify-between w-full">
                    <div className="md:w-1/2 space-y-6">
                        <div className={`inline-block px-4 py-2 rounded-full ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'} border text-cyan-500 text-sm font-medium mb-2`}>
                            Available for Hire
                        </div>
                        <h1 className={`text-5xl md:text-7xl font-extrabold ${theme.heading} leading-tight transition-colors duration-300`}>
                            Hello, I'm <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                Yash Patil
                            </span>
                        </h1>
                        <div className={`text-xl md:text-3xl ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-light h-10`}>
                            I am a <span className={`font-normal ${theme.heading}`}>{displayText}</span>
                            <span className="animate-pulse text-cyan-500">|</span>
                        </div>
                        <p className={`max-w-lg ${theme.text} leading-relaxed text-lg`}>
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
                                href="/Yash_Patil_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-8 py-4 ${darkMode ? 'bg-slate-900 border-slate-700 hover:border-cyan-500/50' : 'bg-white border-slate-200 hover:border-cyan-500 text-slate-700 hover:text-cyan-600'} border rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group`}
                            >
                                <Download size={18} className="group-hover:text-cyan-500 transition-colors" />
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* Hero Illustration (Abstract Tech) */}
                    <div className="hidden md:block md:w-5/12 relative">
                        <div className={`relative w-full aspect-square ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white/60 border-slate-200'} rounded-2xl border p-8 backdrop-blur-sm grid grid-cols-2 gap-4 animate-float shadow-2xl`}>

                            {/* AWS Card */}
                            <div className={`${theme.cardBg} rounded-xl p-6 flex flex-col items-center justify-center border ${theme.cardBorder} transition-colors duration-300`}>
                                <div className={`p-2 rounded-lg mb-2 w-16 h-16 flex items-center justify-center ${getLogoContainerStyle()}`}>
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                                        alt="AWS"
                                        className={`w-full h-full transition-all duration-300 ${getLogoStyle(true)}`}
                                    />
                                </div>
                                <span className="font-mono text-sm">AWS Native</span>
                            </div>

                            {/* K8s Card */}
                            <div className={`${theme.cardBg} rounded-xl p-6 flex flex-col items-center justify-center border ${theme.cardBorder} transition-colors duration-300`}>
                                <div className={`p-2 rounded-lg mb-2 w-16 h-16 flex items-center justify-center ${getLogoContainerStyle()}`}>
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
                                        alt="K8s"
                                        className={`w-full h-full transition-all duration-300`}
                                    />
                                </div>
                                <span className="font-mono text-sm">K8s Cluster</span>
                            </div>

                            {/* Terraform Card */}
                            <div className={`${theme.cardBg} rounded-xl p-6 flex flex-col items-center justify-center border ${theme.cardBorder} transition-colors duration-300`}>
                                <div className={`p-2 rounded-lg mb-2 w-16 h-16 flex items-center justify-center ${getLogoContainerStyle()}`}>
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
                                        alt="Terraform"
                                        className={`w-full h-full transition-all duration-300 ${getLogoStyle(false)}`}
                                    />
                                </div>
                                <span className="font-mono text-sm">Automation</span>
                            </div>

                            {/* Security Card */}
                            <div className={`${theme.cardBg} rounded-xl p-6 flex flex-col items-center justify-center border ${theme.cardBorder} transition-colors duration-300`}>
                                <ShieldCheck className="text-green-500 w-16 h-16 mb-2" />
                                <span className="font-mono text-sm">Security</span>
                            </div>

                            {/* Floating Code Snippet */}
                            <div className={`absolute -bottom-6 -left-6 ${darkMode ? 'bg-black/90 border-slate-700' : 'bg-slate-900 border-slate-800'} border p-4 rounded-lg font-mono text-xs text-green-400 shadow-2xl`}>
                                $ terraform apply -auto-approve<br />
                                <span className="text-white">Resource actions are indicated with the following symbols:</span><br />
                                <span className="text-green-400">+ create</span><br />
                                <span className="text-white">Terraform will perform the following actions...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
                    <ChevronUp className="rotate-180" />
                </div>
            </header>

            {/* About Section */}
            <section id="about" className={`py-24 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-100/50'} relative z-10 transition-colors duration-300`}>
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className={`text-4xl font-bold ${theme.heading}`}>About <span className="text-cyan-500">Me</span></h2>
                        <div className={`h-px ${darkMode ? 'bg-slate-700' : 'bg-slate-300'} flex-grow`}></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        <div className={`col-span-2 ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-md'} p-8 rounded-2xl border backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300`}>
                            <p className="text-lg leading-relaxed mb-6">
                                I'm a passionate <strong className={theme.heading}>DevOps & Cloud Engineer</strong> based in Nagpur, India.
                                I enjoy bridging the gap between engineering and operations, making infrastructure invisible to developers so they can focus on shipping code.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                With <strong className="text-cyan-500">3.5+ years</strong> of experience at Infosys, contributing to system improvements for a leading US client.
                                I use Terraform modules, manage Kubernetes clusters, containerize applications with Docker, and build secure CI/CD pipelines using Jenkins and GitHub Actions.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-mono text-cyan-500">
                                <Terminal size={16} />
                                <span>$ whoami: Cloud Enthusiast & Automation Lover</span>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="space-y-4">
                            {[{ num: "3.5+", label: "Years Exp." }, { num: "5+", label: "Projects" }, { num: "3", label: "Certifications" }].map((stat, i) => (
                                <div key={i} className={`${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'} p-6 rounded-xl border text-center hover:border-cyan-500/50 transition-all duration-300`}>
                                    <h3 className={`text-4xl font-bold ${theme.heading} mb-1`}>{stat.num}</h3>
                                    <p className={darkMode ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className={`flex items-end gap-4 mb-12 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} pb-4`}>
                        <h2 className={`text-4xl font-bold ${theme.heading}`}>Technical <span className="text-cyan-500">Stack</span></h2>
                        <span className={`${darkMode ? 'text-slate-500' : 'text-slate-400'} pb-2 hidden sm:block`}>Tools & Technologies I use daily</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Helper function to render skill card */}
                        {[
                            {
                                title: "AWS Cloud",
                                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
                                skills: ['EC2', 'S3', 'Lambda', 'EKS', 'VPC', 'IAM', 'Route53', 'CloudFront'],
                                color: 'border-orange-500/30',
                                invertDark: true // AWS logo black text -> White in dark mode
                            },
                            {
                                title: "Containerization",
                                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                                skills: ['Docker', 'Kubernetes', 'Helm', 'Docker Compose', 'EKS/AKS'],
                                color: 'border-blue-500/30',
                                invertDark: false
                            },
                            {
                                title: "IaC & Config",
                                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
                                skills: ['Terraform', 'Ansible', 'CloudFormation', 'YAML', 'HCL'],
                                color: 'border-purple-500/30',
                                invertDark: false
                            },
                            {
                                title: "CI/CD",
                                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
                                skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'Groovy'],
                                color: 'border-green-500/30',
                                invertDark: false
                            },
                            {
                                title: "Scripting & OS",
                                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
                                skills: ['Bash/Shell', 'Python', 'Linux (RHEL/Ubuntu)', 'Vim', 'Git'],
                                color: 'border-yellow-500/30',
                                invertDark: false
                            },
                            {
                                title: "Observability",
                                img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
                                skills: ['Prometheus', 'Grafana', 'CloudWatch', 'ELK Stack', 'Datadog'],
                                color: 'border-red-500/30',
                                invertDark: false
                            },
                        ].map((cat, idx) => (
                            <div key={idx} className={`${theme.cardBg} border ${theme.cardBorder} p-6 rounded-xl hover:${cat.color} transition-all duration-300 group hover:-translate-y-1`}>
                                <div className="flex items-center gap-3 mb-4">
                                    {/* Logo Container Logic */}
                                    <div className={`p-2 rounded-lg w-12 h-12 flex items-center justify-center transition-colors duration-300 ${getLogoContainerStyle()}`}>
                                        <img
                                            src={cat.img}
                                            alt={cat.title}
                                            className={`max-w-full max-h-full transition-all duration-300 ${getLogoStyle(cat.invertDark)}`}
                                        />
                                    </div>
                                    <h3 className={`text-xl font-semibold ${theme.heading}`}>{cat.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map(skill => (
                                        <span key={skill} className={`px-3 py-1 text-xs ${darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'} rounded border group-hover:bg-opacity-80 transition-colors`}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className={`py-24 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-100/50'} relative z-10 transition-colors duration-300`}>
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className={`text-4xl font-bold ${theme.heading} mb-16 text-center`}>Work <span className="text-cyan-500">Experience</span> </h2>

                    <div className={`relative border-l ${darkMode ? 'border-slate-700' : 'border-slate-300'} ml-6 md:ml-12 space-y-12`}>

                        {/* Infosys Senior */}
                        <div className="relative pl-12">
                            <div className={`absolute -left-3 top-2 w-6 h-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-100'} border-2 border-cyan-500 rounded-full`}></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className={`text-2xl font-bold ${theme.heading}`}>Systems Engineer</h3>
                                <div className={`inline-block ${darkMode ? 'bg-cyan-900/30 text-cyan-300 border-cyan-800' : 'bg-cyan-50 text-cyan-700 border-cyan-200'} border text-xs px-3 py-1 rounded-full font-mono mt-2 md:mt-0`}>Oct 2024 – Present</div>
                            </div>
                            <h4 className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4 font-medium`}>Infosys Limited</h4>
                            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-4 italic text-sm`}>Project: US Client</p>
                            <ul className={`list-disc list-outside ml-4 space-y-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                                <li>Orchestrated cloud infrastructure migration for 3 microservices resulting in <strong>20% cost reduction</strong>.</li>
                                <li>Designed and implemented secure CI/CD pipelines using Jenkins & GitHub Actions.</li>
                                <li>Managed EKS clusters with Terraform, improving deployment consistency.</li>
                            </ul>
                        </div>

                        {/* Infosys Systems Engineer */}
                        <div className="relative pl-12">
                            <div className={`absolute -left-3 top-2 w-6 h-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-100'} border-2 border-slate-500 rounded-full`}></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className={`text-2xl font-bold ${theme.heading}`}>Systems Associate</h3>
                                <div className={`inline-block ${darkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-200 text-slate-600 border-slate-300'} border text-xs px-3 py-1 rounded-full font-mono mt-2 md:mt-0`}>Dec 2021 – Sep 2024</div>
                            </div>
                            <h4 className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4 font-medium`}>Infosys Limited</h4>
                            <ul className={`list-disc list-outside ml-4 space-y-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
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
                    <h2 className={`text-4xl font-bold ${theme.heading} mb-12`}>Featured<span className="text-cyan-500"> Projects</span> </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Helper to render project cards */}
                        {[
                            {
                                title: "Serverless URL Shortener",
                                desc: "Built a highly scalable, zero-maintenance URL shortening service. Leveraged Lambda for logic and DynamoDB for low-latency data storage.",
                                tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Python'],
                                icon: <Globe className="w-8 h-8" />,
                                color: "text-blue-400",
                                bg: "bg-blue-600/20"
                            },
                            {
                                title: "CI/CD for Microservices",
                                desc: "Designed a complete pipeline for a Dockerized app. Includes automated testing, Docker image build/push, and deployment to a staging server.",
                                tech: ['Jenkins', 'Docker', 'GitHub Actions', 'Shell'],
                                icon: <Layers className="w-8 h-8" />,
                                color: "text-purple-400",
                                bg: "bg-purple-600/20"
                            },
                            {
                                title: "K8s 2-Tier Deployment",
                                desc: "Deployed a frontend-backend architecture on EKS. Utilized ConfigMaps and Secrets for secure environment variable management.",
                                tech: ['Kubernetes', 'EKS', 'Nginx', 'YAML'],
                                icon: <Server className="w-8 h-8" />,
                                color: "text-green-400",
                                bg: "bg-green-600/20"
                            },
                            {
                                title: "VPC Network Architecture",
                                desc: "Architected a secure AWS VPC with public/private subnets, NAT Gateways, and strict Network ACLs to ensure data isolation.",
                                tech: ['AWS VPC', 'Networking', 'Security Groups'],
                                icon: <ShieldCheck className="w-8 h-8" />,
                                color: "text-orange-400",
                                bg: "bg-orange-600/20"
                            }
                        ].map((project, idx) => (
                            <div key={idx} className={`group ${theme.cardBg} rounded-xl overflow-hidden border ${theme.cardBorder} hover:border-cyan-500/50 transition-all duration-300 flex flex-col hover:-translate-y-1`}>
                                <div className="p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 ${darkMode ? project.bg : 'bg-slate-100'} rounded-lg ${darkMode ? project.color : 'text-slate-700'}`}>
                                            {project.icon}
                                        </div>
                                        <ExternalLink className={`${darkMode ? 'text-slate-600' : 'text-slate-400'} group-hover:${theme.heading} transition-colors`} />
                                    </div>
                                    <h3 className={`text-2xl font-bold ${theme.heading} mb-3`}>{project.title}</h3>
                                    <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-6`}>
                                        {project.desc}
                                    </p>
                                </div>
                                <div className={`${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} p-4 border-t flex gap-3 overflow-x-auto`}>
                                    {project.tech.map(tech => (
                                        <span key={tech} className="text-xs font-mono text-cyan-500 whitespace-nowrap">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Stripe */}
            <section className={`py-16 ${darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-800' : 'bg-gradient-to-r from-slate-100 to-white'} border-y ${theme.navBorder} relative z-10`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                        <h2 className={`text-2xl font-bold ${theme.heading}`}>Certifications</h2>
                        <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Validated expertise in Cloud & Ops</p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                        {[
                            { name: "AWS Cloud Practitioner", color: "bg-green-500" },
                            { name: "AWS SysOps Admin", color: "bg-green-500" },
                            //{ name: "Terraform (In Progress)", color: "bg-yellow-500", animate: true }
                        ].map((cert, i) => (
                            <div key={i} className={`flex items-center gap-2 ${darkMode ? 'bg-slate-950 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'} px-4 py-2 rounded border shadow-sm`}>
                                <div className={`w-2 h-2 ${cert.color} rounded-full ${cert.animate ? 'animate-pulse' : ''}`}></div> {cert.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 relative z-10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className={`text-4xl font-bold ${theme.heading} mb-6`}>Let's Build Something Scalable</h2>
                    <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-12`}>
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
                            <a href="https://github.com/YashPatil1678" target="_blank" rel="noreferrer" className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors transform hover:scale-110`}>
                                <Github size={32} />
                            </a>
                            <a href="https://linkedin.com/in/yash-patil-976126217" target="_blank" rel="noreferrer" className={`${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'} transition-colors transform hover:scale-110`}>
                                <Linkedin size={32} />
                            </a>
                        </div>

                        <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl text-left ${theme.cardBg} border ${theme.cardBorder} p-8 rounded-2xl`}>
                            <div className="flex items-center gap-4">
                                <Phone className="text-cyan-500" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Phone</p>
                                    <p className={theme.heading}>+91 7057700367</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="text-cyan-500" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Location</p>
                                    <p className={theme.heading}>Nagpur, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-8 text-center ${darkMode ? 'bg-slate-950 text-slate-600 border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-200'} text-sm border-t relative z-10 transition-colors duration-300`}>
                <p>© 2025 Yash Patil. Engineered with React & Tailwind.</p>
            </footer>

            {/* Styles for animations */}
            <style jsx>{`
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

