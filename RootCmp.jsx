
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/about/AboutUs.jsx"
import { BookDetails } from "./pages/book/BookDetails.jsx"
import { BookEdit } from "./pages/book/BookEdit.jsx"
import { BookIndex } from "./pages/book/BookIndex.jsx"
import { HomePage } from "./pages/home/HomePage.jsx"

const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;


export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}