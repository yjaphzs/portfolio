import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TimeMachine } from "./components/time-machine/TimeMachine";

// v3 — current
import Portfolio from "./pages/v3/Portfolio";
import V3Stack from "./pages/v3/Stack";
import V3Experience from "./pages/v3/Experience";
import V3Projects from "./pages/v3/Projects";
import V3Setup from "./pages/v3/Setup";

// Version-neutral: one print document, shared by every version.
import ResumePage from "./pages/Resume";
import NotFound from "./pages/NotFound";

// v2 — archived
import V2Portfolio from "./pages/v2/NewPortfolio";
import V2TechStack from "./pages/v2/TechStack";
import V2Experience from "./pages/v2/Experience";
import V2Projects from "./pages/v2/Projects";

// v1 — archived
import ArchivedPortfolio from "./pages/archived/ArchivedPortfolio";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/stack" element={<V3Stack />} />
                    <Route path="/experience" element={<V3Experience />} />
                    <Route path="/projects" element={<V3Projects />} />
                    <Route path="/setup" element={<V3Setup />} />
                    <Route path="/resume" element={<ResumePage />} />

                    <Route path="/archived/v2" element={<V2Portfolio />} />
                    <Route path="/archived/v2/tech-stack" element={<V2TechStack />} />
                    <Route path="/archived/v2/experience" element={<V2Experience />} />
                    <Route path="/archived/v2/projects" element={<V2Projects />} />

                    <Route path="/archived/v1" element={<ArchivedPortfolio />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <TimeMachine />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
