import './Experience.css'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealWords from './components/RevealWords'
import zensarLogo from './assets/logos/zensar.svg'
import nvidiaLogo from './assets/logos/nvidia.svg'
import chat360Logo from './assets/logos/chat360.jpg'
import tamutLogo from './assets/logos/tamut.svg'

const EXPERIENCE = [
    {
        company: 'Zensar Technologies',
        client: 'Client: NVIDIA',
        location: 'Pune, Maharashtra, India',
        logos: [
            { src: zensarLogo, url: 'https://www.zensar.com/' },
            { src: nvidiaLogo, url: 'https://www.nvidia.com/en-in/' },
        ],
        roles: [{ title: 'Jr. Python Developer', duration: 'Nov 2025 – Present' }],
        highlights: [
            'Developed automation pipelines for Physical AI and robotics datasets.',
            'Built Python-based validation, preprocessing, and upload pipelines for robotics datasets.',
            'Worked within the NVIDIA GR00T ecosystem, supporting large-scale dataset operations for Physical AI workflows.',
            'Developed internal tools, dashboards, and tracking systems to improve operational efficiency and data reliability.',
        ],
    },
    {
        company: 'Chat360',
        location: 'Pune, Maharashtra, India',
        logos: [{ src: chat360Logo, url: 'https://www.chat360.io/' }],
        roles: [
            { title: 'AI Engineer Intern', duration: 'Jun 2025 – Sept 2025' },
            { title: 'Technical Product Intern', duration: 'Mar 2025 – Jun 2025' },
        ],
        highlights: [
            'Built Agentic AI workflows using RAG pipelines and vector databases.',
            'Developed context-aware autonomous decision systems powered by LLMs.',
            'Built analytics and monitoring dashboards for business insights and campaign tracking.',
            'Contributed to AI-powered customer engagement, sentiment analysis, and reply automation solutions.',
        ],
    },
    {
        company: 'Texas A&M University–Texarkana',
        location: 'Texarkana, Texas, USA',
        logos: [{ src: tamutLogo, url: 'https://www.tamut.edu/' }],
        roles: [{ title: 'Research Fellowship Intern', duration: 'Jun 2024 – Jul 2024' }],
        highlights: [
            'Conducted Deep Fake Detection research and model evaluation.',
            'Led project development and experimentation within an international research team.',
            'Awarded Best Project Award for outstanding research contribution.',
        ],
    },
]

function ExperienceCard({ item, index }) {
    return (
        <motion.div
            className="experience-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="experience-marker">
                <motion.span
                    className="experience-node"
                    initial={{ scale: 0.4, opacity: 0.4 }}
                    whileInView={{ scale: [0.4, 1.3, 1], opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            </div>

            <div className="experience-card">
                <div className={'experience-logos' + (item.logos.length > 1 ? ' has-multiple' : '')}>
                    {item.logos.map((logo, i) => (
                        <a
                            className="experience-logo"
                            key={i}
                            href={logo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={logo.src} alt="" />
                        </a>
                    ))}
                </div>

                <div className="experience-heading">
                    <h3>{item.company}</h3>
                    {item.client && <span className="experience-client">{item.client}</span>}
                </div>

                <div className="experience-roles">
                    {item.roles.map((role, i) => (
                        <div
                            className={'experience-role-row' + (item.roles.length > 1 ? ' has-sub-dot' : '')}
                            key={i}
                        >
                            {item.roles.length > 1 && <span className="experience-sub-dot" />}
                            <span className="experience-role">{role.title}</span>
                            <span className="experience-role-duration">{role.duration}</span>
                        </div>
                    ))}
                </div>

                <p className="experience-location">{item.location}</p>

                <div className="experience-highlights">
                    <span className="experience-highlights-label">Highlights</span>
                    <ul>
                        {item.highlights.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

function Experience() {
    const timelineRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.85', 'end 0.4'],
    })
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section className="experience-section" id="experience">
            <div className="experience-container">
                <RevealWords as="h2" text="Experience" className="experience-heading-title" />

                <div className="experience-timeline" ref={timelineRef}>
                    <div className="experience-line-track" />
                    <motion.div className="experience-line-progress" style={{ scaleY: lineScale }} />

                    {EXPERIENCE.map((item, i) => (
                        <ExperienceCard key={item.company} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
