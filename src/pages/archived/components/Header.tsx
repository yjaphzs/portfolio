import { useEffect } from "react";
import Logo from "../../../assets/v1/images/global/logo.svg";

function Header() {
    useEffect(() => {
        const sections = document.querySelectorAll(".division");

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = Array.from(sections).indexOf(
                    entry.target as Element
                );
                const navItem = document.querySelector(
                    `#navigation-bar .nav-item:nth-child(${
                        index + 1
                    }) .nav-link`
                );
                if (!navItem) return;
                if (entry.isIntersecting) {
                    navItem.classList.add("active");
                } else {
                    navItem.classList.remove("active");
                }
            });
        }, options);

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <header className="header">
                <a id="logo" href="#">
                    <img src={Logo} alt="Logo" />
                </a>

                <nav id="navigation-bar">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#about">
                                <div className="text-wrapper">About Me</div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#portfolio">
                                <div className="text-wrapper">Portfolio</div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">
                                <div className="text-wrapper">Contact</div>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
