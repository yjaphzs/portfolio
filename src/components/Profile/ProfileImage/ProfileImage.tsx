import "./ProfileImage.scss";

import Circles from "../../tools/Circles";
import ProfilePhoto from "../../../assets/images/profile-photo.png";

function ProfileImage() {
    return (
        <div className="profile-image">
            <div className="image-wrapper">
                <img src={ProfilePhoto} alt="Profile Photo" />

                <Circles />
            </div>
        </div>
    );
}

export default ProfileImage;
