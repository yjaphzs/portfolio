import "./ProfileImage.scss";
import { useState } from "react";
import Circles from "../../tools/Circles";
import ProfilePhoto from "../../../../../assets/v1/images/profile-photo.png";

interface ProfileImageProps {
    onImageLoad?: () => void;
}

function ProfileImage({ onImageLoad }: ProfileImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        if (onImageLoad) {
            onImageLoad();
        }
    };

    return (
        <div className="profile-image">
            <div className="image-wrapper">
                <img 
                    src={ProfilePhoto} 
                    alt="Profile Photo"
                    onLoad={handleImageLoad}
                    style={{ 
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                />

                <Circles />
            </div>
        </div>
    );
}

export default ProfileImage;
