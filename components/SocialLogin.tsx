import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    return (
        <>
            <FaApple className="h-12 w-12 rounded-full bg-white text-black p-1 cursor-pointer"
                onClick={() => {
                    alert("Apple login is not implemented yet");
                }}
            />
            <FcGoogle className="h-12 w-12 rounded-full bg-white p-1 cursor-pointer"
                onClick={() => {
                    alert("Google login is not implemented yet");
                }}
            />
            <FaFacebook
                className="h-12 w-12 rounded-full bg-white p-1 cursor-pointer"
                style={{ color: "#1877F3" }}
                onClick={() => {
                    alert("Facebook login is not implemented yet");
                }}
            />
        </>
    )
}

export default SocialLogin;