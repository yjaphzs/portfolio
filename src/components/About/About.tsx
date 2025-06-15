import "./About.scss";

import Technology from "./Technology/Technology";

function About() {
    return (
        <div className="about-wrapper">
            <div className="about-info">
                <h2 className="about-title">
                    About <span className="me yellow-text">Me!</span>
                </h2>
                <div className="about-details-wrapper">
                    <p className="about-details">
                        Hello! My name is Jan Bautista, and I love building
                        things for the web. My passion for web development began
                        during college when I discovered the fun of creating
                        applications with the Laravel Framework. The thrill of
                        turning ideas into interactive websites sparked my
                        journey into full-stack development.
                    </p>
                    <p className="about-details">
                        Since then, I’ve had the opportunity to work in various
                        roles, from{" "}
                        <span className="highlight">teaching IT courses</span>{" "}
                        to{" "}
                        <span className="highlight">
                            developing university-wide systems
                        </span>{" "}
                        and even providing{" "}
                        <span className="highlight">IT support</span> for a
                        research institute. My focus these days is on crafting
                        robust web applications that make a difference.
                    </p>
                    <p className="about-details">
                        Here are some technologies I’ve been working with
                        recently:
                    </p>

                    <Technology />
                </div>
            </div>
        </div>
    );
}

export default About;
