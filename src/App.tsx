import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TimeMachine } from "./components/time-machine/TimeMachine";
import NewPortfolio from "./pages/new/NewPortfolio";
import ArchivedPortfolio from "./pages/archived/ArchivedPortfolio";
import TechStackPage from "./pages/new/TechStack";
import ExperiencePage from "./pages/new/Experience";
import ProjectsPage from "./pages/new/Projects";
import ResumePage from "./pages/new/Resume";
import NotFound from "./pages/new/NotFound";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NewPortfolio />} />
                    <Route path="/tech-stack" element={<TechStackPage />} />
                    <Route path="/experience" element={<ExperiencePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                    <Route path="/archived/v1" element={<ArchivedPortfolio />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <TimeMachine />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
