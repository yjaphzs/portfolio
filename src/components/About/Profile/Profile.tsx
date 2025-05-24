import Circles from "../../../components/tools/Circles";
import Socials from "../../../components/About/Socials/Socials";
import Link from "../../Link/Link";
import ProfilePhoto from "../../../assets/images/profile-photo.png";

function Profile() {
    return (
        <>
            <div className="profile-info">
                <h1 className="name">
                    <span className="first-name">Jan</span> Bautista
                </h1>
                <div className="position-wrapper">
                    <h3 className="position">
                        FULL-STACK <span className="developer">DEVELOPER</span>
                    </h3>
                </div>

                <Socials />

                <Link>
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
                </Link>
            </div>

            <div className="profile-image">
                <div className="image-wrapper">
                    <img src={ProfilePhoto} alt="Profile Photo" />

                    <Circles />
                </div>
            </div>
        </>
    );
}

export default Profile;
