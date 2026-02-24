import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileImage from "./ProfileImage/ProfileImage";

interface ProfileProps {
    onProfileImageLoad?: () => void;
}

function Profile({ onProfileImageLoad }: ProfileProps) {
    return (
        <>
            <ProfileInfo />
            <ProfileImage onImageLoad={onProfileImageLoad} />
        </>
    );
}

export default Profile;
