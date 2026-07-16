import { motion } from 'framer-motion'

function RevealWords({ text, as: Tag = 'span', blur = 10, delay = 0, className = '' }) {
    const words = text.split(' ')

    return (
        <Tag className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                    initial={{ opacity: 0, filter: `blur(${blur}px)`, y: 10 }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: delay + i * 0.04, ease: 'easeOut' }}
                >
                    {word}
                </motion.span>
            ))}
        </Tag>
    )
}

export default RevealWords
