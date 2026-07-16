import './CertAchievements.css'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealWords from './components/RevealWords'
import bestProjectPhoto from './assets/achievements/best-project-award.jpeg'
import clientFocusPage1 from './assets/achievements/client-focus/page-1.png'
import clientFocusPage2 from './assets/achievements/client-focus/page-2.png'
import clientFocusPage3 from './assets/achievements/client-focus/page-3.png'
import teamNominationPage1 from './assets/achievements/team-nomination/page-1.png'
import teamNominationPage2 from './assets/achievements/team-nomination/page-2.png'
import teamNominationPage3 from './assets/achievements/team-nomination/page-3.png'
import mayankAvatar from './assets/testimonials/mayank-srivastava.png'
import sushilAvatar from './assets/testimonials/sushil-sharma.png'
import taeguenAvatar from './assets/testimonials/taeguen-kang.png'

const CERTIFICATIONS = [
    {
        title: 'Claude Certified Architect - Foundations',
        org: 'Anthropic',
        category: 'Generative AI',
        url: 'https://verify.skilljar.com/c/dvv5fpd55xb6',
    },
    {
        title: 'From Zero to Agents: Building End-to-End Data Pipelines for an AI Agent',
        org: 'Snowflake',
        category: 'Agentic AI',
        url: 'https://developerbadges.snowflake.com/61333b14-a63d-489a-8ef1-80b7630b0f6a',
    },
    {
        title: 'Databricks Certified Machine Learning Professional',
        org: 'Databricks',
        category: 'Machine Learning',
        url: 'https://credentials.databricks.com/d00126ca-eaf3-46cd-a52a-43031795f1d4',
    },
    {
        title: 'AWS Academy Graduate - AWS Academy Machine Learning Foundations',
        org: 'Amazon Web Services (AWS)',
        category: 'Cloud / Machine Learning',
        url: 'https://www.credly.com/badges/db1198b9-5a47-474c-b597-96651af137b1/linked_in_profile',
    },
    {
        title: 'Postman API Fundamentals Student Expert',
        org: 'Canvas Credentials (Badgr)',
        category: 'APIs',
        url: 'https://api.badgr.io/public/assertions/WaK9QfQqQaSoBqK5BY20tw',
    },
    {
        title: 'IBM Python',
        org: 'Etrain',
        category: 'Python',
        url: 'https://courses.etrain.skillsnetwork.site/certificates/96ea5cd9601e4670b4bac1726c522ba7',
    },
    {
        title: 'PCAP: Programming Essentials in Python',
        org: 'Cisco Networking Academy',
        category: 'Python',
        url: 'https://www.netacad.com/certificates?issuanceId=e94d73c0-fac0-4460-90a6-e08a7cb05b5d',
    },
    {
        title: 'Fundamentals of Accelerated Computing with CUDA Python',
        org: 'NVIDIA',
        category: 'Accelerated Computing',
        url: 'https://learn.nvidia.com/certificates?id=zDMnRFhoTLW1GlGLXCykzA',
    },
    {
        title: 'Fundamentals of Accelerated Computing with CUDA C/C++',
        org: 'NVIDIA',
        category: 'Accelerated Computing',
        url: 'https://learn.nvidia.com/certificates?id=8cmkGpoPT-iWhf2hH4QRnA',
    },
]

const ACHIEVEMENTS = [
    {
        title: 'Client Focus Recognition',
        org: 'Zensar Technologies',
        description: 'Recognized for resolving operational downtimes and developing productivity enhancing internal tools and pipelines.',
        photos: [clientFocusPage1, clientFocusPage2, clientFocusPage3],
    },
    {
        title: 'Team of the Quarter Nomination',
        org: 'Zensar Technologies',
        description:
            "Recognized through a Team of the Quarter nomination for contributions to establishing Zensar's Physical AI Foundry and supporting NVIDIA robotics initiatives.",
        photos: [teamNominationPage1, teamNominationPage2, teamNominationPage3],
    },
    {
        title: 'Best Project Award',
        org: 'Texas A&M University',
        description: 'Led the Deep Fake Detection Research Project',
        photos: [bestProjectPhoto],
    },
]

const PUBLICATIONS = [
    {
        title: 'Yoga Posture Monitoring Using CNN and Machine Learning',
        type: 'IEEE Conference Paper',
        conference: '2024 IEEE 4th International Conference on ICT in Business Industry & Government (ICTBIG)',
        year: '2024',
        doi: '10.1109/ICTBIG64922.2024.10911373',
        description:
            'Developed a CNN-based yoga posture monitoring system using computer vision and machine learning techniques for posture classification and real-time pose analysis.',
    },
    {
        title: 'Elevating Education with Sentiment Analysis and Power BI Insights',
        type: 'Journal Article',
        year: '2025',
        doi: '10.5281/ZENODO.15682719',
        description:
            'Explored sentiment analysis and Power BI-based educational analytics to derive actionable insights from feedback data and support data-driven decision-making in educational environments.',
    },
]

const TESTIMONIALS = [
    {
        quote:
            "Aaryan consistently demonstrated initiative, technical curiosity, and strong problem solving skills throughout his internship. His adaptability, ownership, and ability to coordinate effectively made him a valuable contributor across multiple AI projects.",
        name: 'Mayank Srivastava',
        role: 'Associate Product Manager',
        company: 'Chat360',
        avatar: mayankAvatar,
    },
    {
        quote:
            "Aaryan consistently demonstrated exceptional leadership, technical expertise, and a collaborative mindset. His contributions significantly advanced our research project, and his ability to communicate complex ideas and inspire teamwork made him an outstanding leader.",
        name: 'Dr. Taeguen Kang',
        role: 'Research Mentor',
        company: 'Texas A&M University, Texarkana',
        avatar: taeguenAvatar,
    },
    {
        quote:
            "Aaryan's intellectual curiosity, teamwork, and technical dedication distinguished him throughout the program. His contributions were instrumental in helping his team earn the Best Project Award.",
        name: 'Dr. Sushil K. Sharma',
        role: 'Dean',
        company: 'Texas A&M University, Texarkana',
        avatar: sushilAvatar,
    },
]

function TrophyIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7 4h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M12 12v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path
                d="M9 19.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path d="M8 20h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    )
}

function ArrowUpRightIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function PersonIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path
                d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    )
}

function CertCard({ item, index }) {
    return (
        <motion.a
            className="cert-card"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="cert-category">{item.category}</span>
            <h4>{item.title}</h4>
            <p>{item.org}</p>
        </motion.a>
    )
}

function PublicationCard({ item, index }) {
    const doiUrl = `https://doi.org/${item.doi}`

    return (
        <motion.div
            className="publication-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="publication-top">
                <span className="publication-type">{item.type}</span>
                <span className="publication-year">{item.year}</span>
            </div>

            <h4 className="publication-title">{item.title}</h4>

            {item.conference && <p className="publication-conference">{item.conference}</p>}

            <p className="publication-description">{item.description}</p>

            <div className="publication-doi">
                <span className="publication-doi-label">DOI</span>
                <span className="publication-doi-value">{item.doi}</span>
            </div>

            <div className="publication-actions">
                <a className="publication-link publication-link-primary" href={doiUrl} target="_blank" rel="noopener noreferrer">
                    <span>View Publication</span>
                    <ArrowUpRightIcon />
                </a>
            </div>
        </motion.div>
    )
}

function AchievementCard({ item, index, onOpen }) {
    const hasPhoto = Boolean(item.photos?.length)

    return (
        <motion.div
            className={`achievement-card${hasPhoto ? ' has-photo' : ''}`}
            onClick={hasPhoto ? () => onOpen(item) : undefined}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="achievement-icon">
                <TrophyIcon />
            </span>
            <h4>{item.title}</h4>
            {item.org && <p className="achievement-org">{item.org}</p>}
            <p className="achievement-description">{item.description}</p>

            {hasPhoto && (
                <span className="achievement-view-link">
                    View Achievement
                    <ArrowUpRightIcon />
                </span>
            )}
        </motion.div>
    )
}

function AchievementModal({ item, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        document.body.classList.add('achievement-modal-open')
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = overflow
            document.body.classList.remove('achievement-modal-open')
        }
    }, [onClose])

    return (
        <motion.div
            className="achievement-modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                className="achievement-modal"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
                <button className="achievement-modal-close" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>
                <div className="achievement-modal-images">
                    {item.photos.map((src, i) => (
                        <div className="achievement-modal-image" key={src}>
                            <img src={src} alt={`${item.title} ${i + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="achievement-modal-info">
                    <h4>{item.title}</h4>
                    {item.org && <p className="achievement-modal-org">{item.org}</p>}
                    <p className="achievement-modal-description">{item.description}</p>
                </div>
            </motion.div>
        </motion.div>
    )
}

function TestimonialCard({ item, index }) {
    return (
        <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
            <p className="testimonial-quote">“{item.quote}”</p>
            <div className="testimonial-author">
                <span className="testimonial-avatar">
                    {item.avatar ? <img src={item.avatar} alt={item.name} /> : <PersonIcon />}
                </span>
                <span className="testimonial-author-text">
                    {item.name && <span className="testimonial-name">{item.name}</span>}
                    <span className="testimonial-role">
                        {item.role}
                        {item.company && ` • ${item.company}`}
                    </span>
                </span>
            </div>
        </motion.div>
    )
}

function CertAchievements() {
    const [activeAchievement, setActiveAchievement] = useState(null)

    return (
        <section className="cat-section" id="recognition">
            <div className="cat-container">
                <div className="cat-subsection" id="certifications">
                    <RevealWords as="h2" text="Certifications" className="cat-subheading" />
                    <div className="cert-grid">
                        {CERTIFICATIONS.map((item, i) => (
                            <CertCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>

                <div className="cat-subsection" id="achievements">
                    <RevealWords as="h2" text="Achievements" className="cat-subheading" />
                    <div className="achievement-grid">
                        {ACHIEVEMENTS.map((item, i) => (
                            <AchievementCard key={item.title} item={item} index={i} onOpen={setActiveAchievement} />
                        ))}
                    </div>
                </div>

                <div className="cat-subsection" id="research">
                    <RevealWords as="h2" text="Research & Publications" className="cat-subheading" />
                    <p className="cat-subtext">
                        Published research, conference papers, and technical contributions in AI, Machine Learning, and
                        Data Analytics.
                    </p>
                    <div className="publication-grid">
                        {PUBLICATIONS.map((item, i) => (
                            <PublicationCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>

                <div className="cat-subsection" id="testimonials">
                    <RevealWords as="h2" text="Testimonials" className="cat-subheading" />
                    <div className="testimonial-grid">
                        {TESTIMONIALS.map((item, i) => (
                            <TestimonialCard key={item.name || item.role} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {activeAchievement && (
                    <AchievementModal item={activeAchievement} onClose={() => setActiveAchievement(null)} />
                )}
            </AnimatePresence>
        </section>
    )
}

export default CertAchievements
