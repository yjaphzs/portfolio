import "./Footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    Design inspired by industry portfolios
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
