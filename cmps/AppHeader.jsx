const { Link } = ReactRouterDOM;

export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Books</h1>
                <div>
                    <span style={{ marginLeft: "1em" }}><Link to="/home">Home</Link></span>
                    <span style={{ marginLeft: "1em" }}><Link to="/about">About</Link></span>
                    <span style={{ marginLeft: "1em" }}><Link to="/book">Books</Link></span>
                </div>
            </section>
        </header>
    )
}
