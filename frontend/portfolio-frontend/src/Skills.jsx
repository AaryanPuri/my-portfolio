import './Skills.css'
import { motion } from 'framer-motion'
import RevealWords from './components/RevealWords'

const SKILL_GROUPS = [
    { title: 'Languages', skills: ['Python', 'SQL'] },
    { title: 'Backend', skills: ['FastAPI', 'Django', 'Laravel', 'REST APIs'] },
    { title: 'Databases', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Pinecone'] },
    { title: 'Developer Tools', skills: ['JIRA', 'Postman', 'Power BI'] },
    { title: 'Cloud Infrastructure', skills: ['AWS', 'GCP', 'Docker', 'Git', 'Linux'] },
    { title: 'Core Domains', skills: ['NLP', 'Computer Vision', 'Generative AI', 'Agile Methodology'] },
    {
        title: 'AI / Machine Learning',
        skills: ['TensorFlow', 'Scikit-Learn', 'Keras', 'Pandas', 'NumPy', 'OpenCV', 'YOLO', 'CNNs', 'Machine Learning'],
    },
    {
        title: 'Generative AI',
        skills: ['LangChain', 'LangGraph', 'RAG', 'LLM Orchestration', 'OpenAI', 'Vector Databases', 'Agentic AI Systems'],
    },
]

function SkillCard({ group, index }) {
    return (
        <motion.div
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
        >
            <h3>{group.title}</h3>
            <div className="skill-chips">
                {group.skills.map((skill) => (
                    <span className="skill-chip" key={skill}>
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}

function Skills() {
    return (
        <section className="skills-section" id="skills">
            <div className="skills-container">
                <RevealWords as="h2" text="Skills" className="skills-heading" />

                <div className="skills-grid">
                    {SKILL_GROUPS.map((group, i) => (
                        <SkillCard key={group.title} group={group} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
