import './Navbar.css'

function Navbar({ onOpenTerminal }) {
    return (
        <nav className="navbar">
            <button type="button" className="navbar-terminal-btn" onClick={onOpenTerminal}>
                <span>CLI</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                </svg>
            </button>
        </nav>
    )
}

export default Navbar
