import "./ProfileInfo.scss";

import Socials from "../Socials/Socials";
import TextLink from "../../Link/TextLink/TextLink";
import ResumePDF from "../../../assets/documents/JBautista-Resume.pdf";

function ProfileInfo() {
    return (
        <>
            <div className="profile-info">
                <h1 className="name">
                    <span className="first-name yellow-text">Jan</span> Bautista
                </h1>
                <div className="position-wrapper">
                    <h3 className="position">
                        FULL-STACK <span className="developer">DEVELOPER</span>
                    </h3>
                </div>

                <Socials />

                <TextLink href={ResumePDF} download="JBautista-Resume.pdf">
                    View Resumé{" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-arrow-up-right"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                        />
                    </svg>
                </TextLink>
            </div>
        </>
    );
}

export default ProfileInfo;
