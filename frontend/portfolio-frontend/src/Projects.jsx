import './Projects.css'
import { motion } from 'framer-motion'
import RevealWords from './components/RevealWords'

const PROJECTS = [
    {
        title: 'Billsight',
        description:
            'Full-stack receipt intelligence platform using OCR, FastAPI, React, and PostgreSQL to automate expense tracking and spending analytics.',
        url: 'https://github.com/AaryanPuri/billsight-project',
        cover: 'billsight',
    },
    {
        title: 'Chat360 Agentic AI',
        description:
            'Agentic AI backend built during my Chat360 internship using Django, Celery, and Pinecone, with multi-platform integrations across Shopify, Zoho, and WhatsApp.',
        url: 'https://github.com/AaryanPuri/Chat360_Internship_Agentic-AI',
        cover: 'agentic',
    },
    {
        title: 'Sentiment Analysis',
        description:
            'NLP pipeline scraping student reviews via Selenium, classifying sentiment with scikit-learn, and visualizing insights through Power BI dashboards.',
        url: 'https://github.com/AaryanPuri/Sentiment-Analysis',
        cover: 'sentiment',
    },
    {
        title: 'Inventory Management System',
        description:
            'Inventory and billing management system built with Python, MySQL, and Tkinter, featuring role-based access, order tracking, and profit/loss reporting.',
        url: 'https://github.com/AaryanPuri/inventory-management-system',
        cover: 'inventory',
    },
]

function BillsightCover() {
    return (
        <svg viewBox="0 0 160 160" fill="none" className="project-cover-svg">
            <path
                d="M56 24h48v104l-8-6-8 6-8-6-8 6-8-6-8 6V24z"
                stroke="rgba(250,247,243,0.35)"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <line x1="66" y1="46" x2="94" y2="46" stroke="rgba(250,247,243,0.35)" strokeWidth="2" strokeLinecap="round" />
            <line x1="66" y1="58" x2="94" y2="58" stroke="rgba(250,247,243,0.35)" strokeWidth="2" strokeLinecap="round" />
            <line x1="66" y1="70" x2="86" y2="70" stroke="rgba(250,247,243,0.35)" strokeWidth="2" strokeLinecap="round" />
            <path
                d="M64 90l8 8 16-18"
                stroke="rgba(250,247,243,0.55)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function AgenticCover() {
    return (
        <svg viewBox="0 0 160 160" fill="none" className="project-cover-svg">
            <circle cx="80" cy="80" r="10" stroke="rgba(250,247,243,0.55)" strokeWidth="2" />
            <circle cx="34" cy="46" r="7" stroke="rgba(250,247,243,0.35)" strokeWidth="2" />
            <circle cx="126" cy="46" r="7" stroke="rgba(250,247,243,0.35)" strokeWidth="2" />
            <circle cx="34" cy="116" r="7" stroke="rgba(250,247,243,0.35)" strokeWidth="2" />
            <circle cx="126" cy="116" r="7" stroke="rgba(250,247,243,0.35)" strokeWidth="2" />
            <line x1="40" y1="50" x2="72" y2="74" stroke="rgba(250,247,243,0.25)" strokeWidth="1.5" />
            <line x1="120" y1="50" x2="88" y2="74" stroke="rgba(250,247,243,0.25)" strokeWidth="1.5" />
            <line x1="40" y1="112" x2="72" y2="86" stroke="rgba(250,247,243,0.25)" strokeWidth="1.5" />
            <line x1="120" y1="112" x2="88" y2="86" stroke="rgba(250,247,243,0.25)" strokeWidth="1.5" />
        </svg>
    )
}

function SentimentCover() {
    return (
        <svg viewBox="0 0 160 160" fill="none" className="project-cover-svg">
            <line x1="40" y1="108" x2="40" y2="90" stroke="rgba(250,247,243,0.35)" strokeWidth="8" strokeLinecap="round" />
            <line x1="64" y1="108" x2="64" y2="68" stroke="rgba(250,247,243,0.35)" strokeWidth="8" strokeLinecap="round" />
            <line x1="88" y1="108" x2="88" y2="46" stroke="rgba(250,247,243,0.35)" strokeWidth="8" strokeLinecap="round" />
            <line x1="112" y1="108" x2="112" y2="58" stroke="rgba(250,247,243,0.35)" strokeWidth="8" strokeLinecap="round" />
            <path
                d="M32 82L64 60L88 78L120 40"
                stroke="rgba(250,247,243,0.6)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function InventoryCover() {
    return (
        <svg viewBox="0 0 160 160" fill="none" className="project-cover-svg">
            <rect x="34" y="34" width="34" height="34" rx="3" stroke="rgba(250,247,243,0.4)" strokeWidth="2" />
            <rect x="92" y="34" width="34" height="34" rx="3" stroke="rgba(250,247,243,0.4)" strokeWidth="2" />
            <rect x="34" y="92" width="34" height="34" rx="3" stroke="rgba(250,247,243,0.4)" strokeWidth="2" />
            <rect x="92" y="92" width="34" height="34" rx="3" stroke="rgba(250,247,243,0.55)" strokeWidth="2" />
            <path d="M100 100l8 8 12-14" stroke="rgba(250,247,243,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const COVERS = {
    billsight: BillsightCover,
    agentic: AgenticCover,
    sentiment: SentimentCover,
    inventory: InventoryCover,
}

function ProjectCard({ project, index }) {
    const Cover = COVERS[project.cover]

    return (
        <motion.a
            className="project-card"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
        >
            <div className="project-image-wrap">
                <div className="project-image">
                    <Cover />
                </div>
            </div>
            <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
            </div>
        </motion.a>
    )
}

function ViewAllWorkLink() {
    return (
        <a
            className="projects-view-all"
            href="https://github.com/AaryanPuri?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="projects-view-all-text">View All Work</span>
            <span className="projects-view-all-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                </svg>
            </span>
        </a>
    )
}

function Projects() {
    return (
        <section className="projects-section" id="projects">
            <div className="projects-container">
                <div className="projects-header">
                    <RevealWords as="h2" text="Featured Projects" className="projects-heading" />
                    <ViewAllWorkLink />
                </div>

                <div className="projects-grid">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
