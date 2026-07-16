const ABOUT_TEXT = `ABOUT
Backend engineer and AI/ML practitioner based in Pune, India.

Currently a Jr. Python Developer at Zensar Technologies,
working with NVIDIA on Physical AI and robotics systems.

Previously built Agentic AI systems at Chat360 using RAG
pipelines, vector databases, and LLM-powered workflows.

B.Tech in Computer Science Engineering, MIT ADT University.
Passionate about AI/ML and backend engineering.`

const ZENSAR_TEXT = `ZENSAR TECHNOLOGIES
Jr. Python Developer
Working with NVIDIA in the Physical AI domain

* Developed automation pipelines for Physical AI and
  robotics datasets.
* Built Python-based validation, preprocessing, and
  upload pipelines for robotics datasets.
* Worked within the NVIDIA GR00T ecosystem, supporting
  large-scale dataset operations for Physical AI
  workflows.
* Developed internal tools, dashboards, and tracking
  systems to improve operational efficiency and data
  reliability.`

const CHAT360_TEXT = `CHAT360
AI Engineer Intern

* Built Agentic AI workflows using RAG pipelines and
  vector databases.
* Developed context-aware autonomous decision systems
  powered by LLMs.
* Built analytics and monitoring dashboards for business
  insights and campaign tracking.
* Contributed to AI-powered customer engagement,
  sentiment analysis, and reply automation solutions.`

const TAMU_TEXT = `TEXAS A&M UNIVERSITY
Research Fellowship Intern

* Conducted Deep Fake Detection research and model
  evaluation.
* Led project development and experimentation within an
  international research team.
* Awarded Best Project Award for outstanding research
  contribution.`

const EXPERIENCE_TEXT = `EXPERIENCE\n${ZENSAR_TEXT}\n\n${CHAT360_TEXT}\n\n${TAMU_TEXT}`

const YOJA_TEXT = `YOJA
Yoga Posture Monitoring`

const AGENTIC_PROJECT_TEXT = `AGENTIC AI BACKEND
Production Agentic AI backend built during my Chat360
internship. Django, Celery, Pinecone.`

const DEEPFAKE_TEXT = `DEEP FAKE DETECTION RESEARCH
Research Fellowship project at Texas A&M University.
Won the Best Project Award.`

const INVENTORY_TEXT = `INVENTORY MANAGEMENT SYSTEM
Inventory & billing GUI application.
Python, MySQL, Tkinter.`

const PROJECTS_TEXT = `PROJECTS\n${YOJA_TEXT}\n\n${AGENTIC_PROJECT_TEXT}\n\n${DEEPFAKE_TEXT}\n\n${INVENTORY_TEXT}`

const SKILLS_TEXT = `SKILLS
Languages       Python, SQL
Backend         FastAPI, Django, Laravel, REST APIs
Databases       PostgreSQL, MySQL, MongoDB, Pinecone
Dev Tools       JIRA, Postman, Power BI
Cloud           AWS, GCP, Docker, Git, Linux
AI / ML         TensorFlow, Scikit-learn, Keras, OpenCV, YOLO
Generative AI   LangChain, LangGraph, RAG, LLM Orchestration
Core Domains    NLP, Computer Vision, Agentic AI Systems`

const ACHIEVEMENTS_TEXT = `ACHIEVEMENTS
* Client Focus Recognition -- Zensar Technologies
  Resolved operational downtimes, built productivity tools.

* Team of the Quarter Nomination -- Zensar Technologies
  Contributions to establishing Zensar's Physical AI Foundry.

* Best Project Award -- Texas A&M University
  Led the Deep Fake Detection Research Project.`

const YOGA_PUBLICATION_TEXT = `YOGA POSTURE MONITORING USING CNN AND MACHINE LEARNING
IEEE Conference Paper -- 2024
2024 IEEE 4th International Conference on ICT in Business
Industry & Government (ICTBIG)
DOI: 10.1109/ICTBIG64922.2024.10911373

CNN-based yoga posture monitoring system using computer
vision and machine learning for posture classification and
real-time pose analysis.`

const SENTIMENT_PUBLICATION_TEXT = `ELEVATING EDUCATION WITH SENTIMENT ANALYSIS AND POWER BI INSIGHTS
Journal Article -- 2025
DOI: 10.5281/ZENODO.15682719

Sentiment analysis and Power BI-based educational analytics
to derive actionable insights from feedback data and support
data-driven decision-making in educational environments.`

const RESEARCH_TEXT = `RESEARCH & PUBLICATIONS\n${YOGA_PUBLICATION_TEXT}\n\n${SENTIMENT_PUBLICATION_TEXT}`

const CONTACT_TEXT = `CONTACT
Email     aaryanpuri75@gmail.com
LinkedIn  linkedin.com/in/aaryan-puri-04923a228
GitHub    github.com/AaryanPuri
X         @Aaryan_75

Or use the contact form in the "Let's Talk" section.`

export const PROMPT_HOST = 'aaryan@portfolio'

export function formatPrompt(cwd) {
    const path = cwd.length === 0 ? '~' : `~/${cwd.join('/')}`
    return `${PROMPT_HOST}:${path}$`
}

// virtual filesystem -- explored via ls / cd / cat
export const FILESYSTEM = {
    'about.txt': { type: 'file', content: ABOUT_TEXT },
    experience: {
        type: 'dir',
        children: {
            'zensar.txt': { type: 'file', content: ZENSAR_TEXT },
            'chat360.txt': { type: 'file', content: CHAT360_TEXT },
            'tamu.txt': { type: 'file', content: TAMU_TEXT },
        },
    },
    projects: {
        type: 'dir',
        children: {
            'yoja.txt': { type: 'file', content: YOJA_TEXT },
            'agentic-ai-backend.txt': { type: 'file', content: AGENTIC_PROJECT_TEXT },
            'deepfake-research.txt': { type: 'file', content: DEEPFAKE_TEXT },
            'inventory-management.txt': { type: 'file', content: INVENTORY_TEXT },
        },
    },
    'skills.txt': { type: 'file', content: SKILLS_TEXT },
    'achievements.txt': { type: 'file', content: ACHIEVEMENTS_TEXT },
    research: {
        type: 'dir',
        children: {
            'yoga-posture-monitoring.txt': { type: 'file', content: YOGA_PUBLICATION_TEXT },
            'sentiment-analysis-education.txt': { type: 'file', content: SENTIMENT_PUBLICATION_TEXT },
        },
    },
    'resume.pdf': { type: 'file', download: true },
    'contact.txt': { type: 'file', content: CONTACT_TEXT },
}

// flat shortcut commands -- kept working alongside ls/cd/cat, undocumented in
// help (help now teaches the filesystem verbs as the primary interaction)
export const SHORTCUTS = {
    about: ABOUT_TEXT,
    experience: EXPERIENCE_TEXT,
    projects: PROJECTS_TEXT,
    skills: SKILLS_TEXT,
    achievements: ACHIEVEMENTS_TEXT,
    research: RESEARCH_TEXT,
    contact: CONTACT_TEXT,

    groot: `NVIDIA GR00T
Aaryan works within the NVIDIA GR00T ecosystem at Zensar --
building automated data ingestion and validation pipelines
for 500+ Physical AI / robotics datasets weekly, supporting
the same foundation-model initiative behind NVIDIA's
humanoid robot research.`,

    agentic: `AGENTIC AI SYSTEMS
Designed and deployed a production-ready Agentic AI backend
at Chat360 -- RAG pipelines and vector databases enabling
context-aware, autonomous decision workflows.

Handled 2,000+ monthly queries. +22% contextual accuracy.
-30% response time.`,

    nvidia: `NVIDIA COLLABORATION
Aaryan works directly with NVIDIA's Physical AI initiative
through Zensar Technologies -- building dataset pipelines,
internal RAG tooling, and validating workflows against
NVIDIA's own engineering team.

Nominated for Team of the Quarter for contributions to
Zensar's Physical AI Foundry.`,
}

export const HELP_TEXT = `Available commands:

ls           - list files and directories
cd <dir>     - change directory
cat <file>   - view a file (try: cat resume.pdf)
resume       - download resume
clear        - clear terminal`

export const COMMANDS = [
    'help',
    'ls',
    'cd',
    'cat',
    'pwd',
    'resume',
    'clear',
    ...Object.keys(SHORTCUTS),
]

export function getUnknownCommandOutput(cmd) {
    return `Command not found: "${cmd}"\nType 'help' to see available commands.`
}
