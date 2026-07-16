"""Hard backend-side guardrails for NOVA's /api/ask endpoint.

These checks run BEFORE any call to the LLM, so they can't be talked around
by clever phrasing in the prompt itself -- they are plain string/regex
checks in Python, not instructions the model could be persuaded to ignore.
"""

import re

REFUSAL_MESSAGE = (
    "I'm NOVA, and I'm only set up to answer questions about Aaryan's background, "
    "skills, projects, and experience. Try asking about those, or use the "
    "Contact / Download Resume options!"
)

# common prompt-injection / jailbreak / role-override phrasings
_INJECTION_PATTERNS = [
    r"ignore (all |any |every )?(previous|prior|above|preceding) (instructions?|prompts?|rules?)",
    r"disregard (all |any |every )?(previous|prior|above) (instructions?|prompts?|rules?)",
    r"forget (all |everything )?(you (know|were told)|(the |your )?(instructions?|rules?))",
    r"new instructions?\s*[:\-]",
    r"you are (now|no longer)\b",
    r"\bact as (a|an)\s+\w+",
    r"pretend (you are|to be)",
    r"role\s*-?\s*play as",
    r"\bjailbreak\b",
    r"\bdan\b",
    r"developer mode",
    r"unrestricted (ai|mode|assistant)",
    r"\bsystem prompt\b",
    r"reveal (your|the) (prompt|instructions|system message)",
    r"print (your|the) (prompt|instructions|system message)",
    r"show (me )?(your|the) (prompt|instructions|system message)",
    r"repeat (the )?(instructions?|prompt) (above|verbatim)",
    r"what (is|are) your (instructions?|system prompt|rules?)",
    r"translate (this|the following)",
    r"write\s+(me\s+|us\s+)?(a|an|some)?\s*.{0,25}?\b(poem|song|essay|story|code|script|function|program)\b",
    r"\b(generate|create)\s+.{0,25}?\b(code|script|function|program)\b",
    r"\bsolve\b.*\b(equation|integral|derivative|math problem)\b",
]

_COMPILED_PATTERNS = [re.compile(p, re.IGNORECASE) for p in _INJECTION_PATTERNS]

# defensive check on the model's own output, in case a clever phrasing still
# slipped past the input patterns above and coaxed the model into echoing
# its instructions
_LEAK_MARKERS = [
    "you are nova",
    "system prompt",
    "as an ai language model",
    "i am an ai language model",
]


def is_blocked_input(question: str) -> bool:
    return any(pattern.search(question) for pattern in _COMPILED_PATTERNS)


def looks_like_leak(answer: str) -> bool:
    lowered = answer.lower()
    return any(marker in lowered for marker in _LEAK_MARKERS)
