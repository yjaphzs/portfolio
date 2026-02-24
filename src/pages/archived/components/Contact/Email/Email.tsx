import "./Email.scss";

import ButtonLink from "../../Link/ButtonLink/ButtonLink";

function Email() {
    return (
        <>
            <div className="contact-wrapper">
                <div className="contact-info">
                    <h2 className="contact-title">
                        Let's <span className="connect">Connect!</span>
                    </h2>
                    <p className="contact-details">
                        I'd love to hear from you! Whether you want to discuss a
                        project or just say hi, click the button below to send
                        me an email directly.
                    </p>
                    <div className="contact-email-wrapper">
                        <a
                            className="contact-email"
                            href="mailto:yjaphzs@gmail.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            yjaphzs@gmail.com
                        </a>
                    </div>

                    <ButtonLink href="mailto:yjaphzs@gmail.com">
                        Say Hello
                    </ButtonLink>
                </div>
            </div>
        </>
    );
}

export default Email;
