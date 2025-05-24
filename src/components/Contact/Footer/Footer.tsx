import "./Footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    Loosely inspired by Brittany Chiang's{" "}
                    <a
                        className="contact-btn"
                        href="https://brittanychiang.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        portfolio website
                    </a>{" "}
                    and crafted in{" "}
                    <a
                        className="contact-btn"
                        href="https://code.visualstudio.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Visual Studio Code
                    </a>
                    . Built with{" "}
                    <a
                        className="contact-btn"
                        href="https://react.dev/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        React
                    </a>{" "}
                    and manually styled using{" "}
                    <a
                        className="contact-btn"
                        href="https://sass-lang.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        SASS
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
}

export default Footer;
