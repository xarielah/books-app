const { Link } = ReactRouterDOM;

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <nav className="header-container">
                <h1><Link to="/">Miss Books</Link></h1>
                <div>
                    <span style={{ marginLeft: "1em" }}><Link to="/home">Home</Link></span>
                    <span style={{ marginLeft: "1em" }}><Link to="/about">About</Link></span>
                    <span style={{ marginLeft: "1em" }}><Link to="/book">Catalouge</Link></span>
                </div>
            </nav>
        </header>
    )
}
