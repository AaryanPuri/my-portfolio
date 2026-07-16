"""Static knowledge base about Aaryan Puri, used as the retrieval corpus for
NOVA's Q&A endpoint. Sourced directly from the portfolio's own content
(resume, experience, projects, skills) so answers stay grounded in fact
rather than the LLM inventing anything.
"""

KNOWLEDGE_BASE = [
    {
        "id": "about",
        "title": "About Aaryan",
        "text": (
            "Aaryan Puri is a backend engineer and AI/ML practitioner based in Pune, Maharashtra, India. "
            "He is currently a Jr. Python Developer at Zensar Technologies, working on NVIDIA's Physical AI "
            "and robotics initiatives. He previously worked as an AI Engineer Intern and Technical Product "
            "Intern at Chat360, where he built Agentic AI systems using RAG pipelines, vector databases, and "
            "LLM-powered workflows. He is passionate about AI/ML and backend engineering, and holds a B.Tech "
            "in Computer Science Engineering from MIT ADT University (Jul 2021 - Jul 2025)."
        ),
    },
    {
        "id": "education",
        "title": "Education",
        "text": (
            "Aaryan completed his B.Tech in Computer Science Engineering at MIT ADT University "
            "(Jul 2021 - Jul 2025). He also completed a Research Fellowship at Texas A&M University-Texarkana."
        ),
    },
    {
        "id": "experience-zensar",
        "title": "Experience: Zensar Technologies (NVIDIA client) - Jr. Python Developer",
        "text": (
            "Since Nov 2025, Aaryan has worked as a Jr. Python Developer at Zensar Technologies, on the NVIDIA "
            "account, based in Pune, India. He designed automated data ingestion and validation pipelines for "
            "500+ session-based robotics/Physical AI datasets weekly, ensuring structured and consistent data "
            "via metadata enhancements and retrieval workflows. He built a PostgreSQL pipeline to centralize "
            "data and enable real-time sync with Google Sheets for improved visibility, and developed an "
            "LLM-powered RAG-based AI chatbot for query handling and issue logging, improving response "
            "efficiency and reducing manual effort. He also developed Python automation scripts and GUI tools "
            "to preprocess, validate, and manage large-scale dataset uploads to AWS S3 and Google Drive, with "
            "failure detection and automated reprocessing to ensure dataset integrity and pipeline stability, "
            "and tested/validated code updates from NVIDIA's US team for compatibility with local data workflows. "
            "This role directly involves NVIDIA's Physical AI and robotics ecosystem, including work related to "
            "NVIDIA GR00T."
        ),
    },
    {
        "id": "experience-chat360-ai-engineer",
        "title": "Experience: Chat360 - AI Engineer Intern",
        "text": (
            "From Jun 2025 to Sept 2025, Aaryan worked as an AI Engineer Intern at Chat360 in Pune, India. He "
            "designed and deployed a production-ready Agentic AI backend integrating RAG pipelines and vector "
            "databases, enabling context-aware autonomous decision workflows for enterprise clients. He "
            "optimized scalable embedding, LLM orchestration, and retrieval pipelines handling 2,000+ monthly "
            "queries, improving contextual accuracy by 22% and reducing response time by 30%, and developed "
            "benchmarks to reduce LLM hallucinations."
        ),
    },
    {
        "id": "experience-chat360-product",
        "title": "Experience: Chat360 - Technical Product Intern",
        "text": (
            "From Mar 2025 to Jun 2025, Aaryan worked as a Technical Product Intern at Chat360 in Pune, India. "
            "He designed and launched cross-platform analytics dashboards for WhatsApp, Facebook, and Instagram "
            "DM campaigns, consolidating campaign data across client deployments and improving engagement "
            "visibility. He built bilingual sentiment analysis and AI-powered reply automation workflows, "
            "reducing manual moderation effort by 30% and improving response turnaround time by 25%, while "
            "collaborating in agile sprints to ship an Agentic AI module."
        ),
    },
    {
        "id": "experience-tamut",
        "title": "Experience: Texas A&M University-Texarkana - Research Fellowship Intern",
        "text": (
            "From Jun 2024 to Jul 2024, Aaryan was a Research Fellowship Intern at Texas A&M University-Texarkana "
            "in Texarkana, Texas, USA. He evaluated deepfake detection models through dataset analysis and "
            "benchmarking, collaborated with an international research team, and led the project to win the "
            "Best Project Award."
        ),
    },
    {
        "id": "project-billsight",
        "title": "Project: Billsight",
        "text": (
            "Billsight is a full-stack receipt intelligence platform built by Aaryan using OCR, FastAPI, React, "
            "and PostgreSQL to automate expense tracking and spending analytics. Code: "
            "github.com/AaryanPuri/billsight-project."
        ),
    },
    {
        "id": "project-chat360-agentic",
        "title": "Project: Chat360 Agentic AI",
        "text": (
            "The Chat360 Agentic AI project is an agentic AI backend Aaryan built during his Chat360 internship "
            "using Django, Celery, and Pinecone (vector database), with multi-platform integrations across "
            "Shopify, Zoho, and WhatsApp. Code: github.com/AaryanPuri/Chat360_Internship_Agentic-AI."
        ),
    },
    {
        "id": "project-sentiment",
        "title": "Project: Sentiment Analysis / Education Insights",
        "text": (
            "Aaryan built an end-to-end sentiment analysis pipeline that scrapes student reviews via Selenium, "
            "classifies sentiment using NLTK, TextBlob, and scikit-learn, and visualizes insights through Power "
            "BI dashboards, to help improve course engagement. Code: github.com/AaryanPuri/Sentiment-Analysis."
        ),
    },
    {
        "id": "project-inventory",
        "title": "Project: Inventory Management System",
        "text": (
            "Aaryan built a Python-MySQL based inventory and billing management GUI application using Tkinter, "
            "with secure role-based access, real-time inventory tracking, order management, and graphical "
            "profit/loss reporting. Code: github.com/AaryanPuri/inventory-management-system."
        ),
    },
    {
        "id": "publication-yoga",
        "title": "Publication: Yoga Posture Monitoring Using CNN and Machine Learning",
        "text": (
            "Aaryan co-authored 'Yoga Posture Monitoring Using CNN and Machine Learning', an IEEE conference "
            "paper published at the 2024 IEEE 4th International Conference on ICT in Business Industry & "
            "Government (ICTBIG). The paper covers a CNN-based yoga posture monitoring system using computer "
            "vision and machine learning for posture classification and real-time pose analysis. Co-authors: "
            "Suvarna Pawar, Aaryan Puri, Jay Kumar Verma, Sumant Kulkarni. DOI: 10.1109/ICTBIG64922.2024.10911373."
        ),
    },
    {
        "id": "publication-sentiment",
        "title": "Publication: Elevating Education with Sentiment Analysis and Power BI Insights",
        "text": (
            "Aaryan authored 'Elevating Education with Sentiment Analysis and Power BI Insights', a journal "
            "article published in 2025. It explores sentiment analysis and Power BI-based educational analytics "
            "to derive actionable insights from feedback data and support data-driven decision-making in "
            "educational environments. DOI: 10.5281/ZENODO.15682719."
        ),
    },
    {
        "id": "skills",
        "title": "Technical Skills",
        "text": (
            "Languages: Python, SQL. Backend frameworks: FastAPI, Django, Laravel, REST APIs, React.js. "
            "Databases: PostgreSQL, MySQL, MongoDB, Pinecone (vector database). Developer tools: Git, Docker, "
            "Linux, JIRA, Postman, Power BI. Cloud: AWS, Google Cloud Platform (GCP). AI/ML libraries: "
            "TensorFlow, Scikit-learn, Keras, Pandas, NumPy, Matplotlib, OpenCV, YOLO, CNNs. Generative AI: "
            "LangChain, LangGraph, RAG (Retrieval-Augmented Generation), LLM orchestration, OpenAI, vector "
            "databases, Agentic AI systems. Core domains: Machine Learning, Generative AI, NLP, Computer Vision, "
            "Agile methodology."
        ),
    },
    {
        "id": "achievements",
        "title": "Achievements and Recognition",
        "text": (
            "Aaryan received a Client Focus Recognition award at Zensar Technologies for resolving operational "
            "downtimes and developing productivity-enhancing internal tools and pipelines on the NVIDIA project. "
            "He was nominated for Team of the Quarter at Zensar for contributions to establishing Zensar's "
            "Physical AI Foundry and supporting NVIDIA robotics initiatives. He also won the Best Project Award "
            "at Texas A&M University-Texarkana for leading the Deep Fake Detection Research Project."
        ),
    },
    {
        "id": "contact",
        "title": "Contact",
        "text": (
            "Aaryan can be reached by email at aaryanpuri75@gmail.com, on LinkedIn at "
            "linkedin.com/in/aaryan-puri-04923a228, on GitHub at github.com/AaryanPuri, or on X at "
            "@Aaryan_75. There is also a contact form on this portfolio's 'Let's Talk' section, and a resume "
            "download available through the NOVA menu."
        ),
    },
]


_STOPWORDS = {
    "the", "a", "an", "is", "are", "was", "were", "be", "been", "being", "to", "of", "in", "on", "at",
    "for", "and", "or", "but", "with", "about", "what", "who", "when", "where", "why", "how", "does",
    "did", "do", "his", "him", "he", "aaryan", "tell", "me", "your", "you", "i", "can", "please", "it",
    "this", "that", "have", "has", "had", "as", "by", "from", "which", "any", "some",
}


def _tokenize(text):
    return {w for w in "".join(c.lower() if c.isalnum() else " " for c in text).split() if w not in _STOPWORDS and len(w) > 1}


def retrieve(query, k=4):
    query_tokens = _tokenize(query)
    if not query_tokens:
        return [KNOWLEDGE_BASE[0]]

    scored = []
    for chunk in KNOWLEDGE_BASE:
        chunk_tokens = _tokenize(chunk["title"] + " " + chunk["text"])
        overlap = len(query_tokens & chunk_tokens)
        if overlap:
            scored.append((overlap, chunk))

    if not scored:
        return [KNOWLEDGE_BASE[0]]

    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [chunk for _, chunk in scored[:k]]
