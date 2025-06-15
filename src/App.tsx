import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Layout imports
import Content from "./components/Content";
import Header from "./components/Header";
import Division from "./components/Division";
import Card from "./components/Card";

// Section imports
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import Work from "./components/Work/Work";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

// Tool imports
import Cover from "./components/tools/Cover";
import Pointer from "./components/tools/Pointer";

import "./App.scss";

function App() {
    useEffect(() => {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        const handleClick = function (
            this: HTMLAnchorElement,
            event: MouseEvent
        ) {
            event.preventDefault();
            const href = this.getAttribute("href");
            if (!href) return;
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };
        smoothScrollLinks.forEach((link) => {
            link.addEventListener("click", handleClick as EventListener);
        });
        return () => {
            smoothScrollLinks.forEach((link) => {
                link.removeEventListener("click", handleClick as EventListener);
            });
        };
    }, []);

    return (
        <>
            {/* Pointer Circle Background */}
            <Pointer />

            {/* Main Content */}
            <Content>
                {/* Header */}
                <Header />

                {/* About Section */}
                <Division id="about">
                    <Card color="black">
                        <Profile />
                    </Card>

                    <Card color="white">
                        <About />
                    </Card>
                </Division>

                {/* Portfolio Section */}
                <Division id="portfolio">
                    <Card color="black">
                        <Work />
                    </Card>

                    <Card color="white">
                        <Projects />
                    </Card>
                </Division>

                <Division id="contact">
                    <Card color="black">
                        <Contact />
                    </Card>
                </Division>
            </Content>

            {/* Page Load/Resize Cover */}
            <Cover />
        </>
    );
}

export default App;
