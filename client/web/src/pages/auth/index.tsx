import { useEffect, useState } from "react";
import "./auth.css";
import upload_icon from "../../assets/images/upload_icon.svg";
import edit_icon from "../../assets/images/pen_icon.svg";

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [profilePic, setProfilePic] = useState<string | null>(null);

    const getInitialFormText = () => ({
        header_title: "Welcome Back! Let's Start Cooking",
        header_paragraph: "Please login to continue",
        button: "Login",
        have_an_account: "Don't have an account?",
        go_to: "Register",
    });

    const [formText, setFormText] = useState(getInitialFormText());

    const getFormText = () => ({
        header_title: isLogin
            ? "Welcome Back! Let's Start Cooking"
            : "Join the Culinary Adventure!",
        header_paragraph: isLogin
            ? "Please login to continue"
            : "Let's Begin Your Cooking Journey",
        button: isLogin ? "Login" : "Register",
        have_an_account: isLogin
            ? "Don't have an account?"
            : "Already have an account?",
        go_to: isLogin ? "Register" : "Login",
    });

    useEffect(() => {
        setFormText(getFormText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);

    const changeAuth = () => {
        setIsLogin(!isLogin);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageSrc = e.target?.result as string;
                setProfilePic(imageSrc);
                console.log(profilePic);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            className={
                isLogin ? "auth-container login" : "auth-container register"
            }
        >
            <div className="auth-form">
                <div className="auth-header">
                    <div>
                        <h1>{formText.header_title}</h1>
                        <p>{formText.header_paragraph}</p>
                    </div>
                    <img src="logo.png" alt="Tabkhetna Logo" />
                </div>

                <div className="auth-body">
                    {!isLogin && (
                        <div className="profile_pic">
                            <label htmlFor="profile_pic">
                                <img
                                    src={profilePic || upload_icon}
                                    alt="upload pic"
                                    className={
                                        profilePic ? "profile_pic_selected" : ""
                                    }
                                />
                            </label>
                            <input
                                type="file"
                                name="profile_pic"
                                id="profile_pic"
                                onChange={handleImageChange}
                                hidden={true}
                            />
                        </div>
                    )}

                    <p>Enter your credentials</p>
                    <input type="email" required placeholder="Email Address" />
                    <input type="password" required placeholder="Password" />
                    {!isLogin && 
                        <input type="password" placeholder="Confirm password" id="confirm-password" name="confirm-password" />
                    }

                    {!isLogin && <>
                        <div className="flex">
                            <input type="text" placeholder="Firstname" id="firstname" name="firstname"/>
                            <input type="text" placeholder="Lastname" id="lastname" name="lastname"/>
                        </div>
                    </>}
                    {isLogin && (
                        <div className="auth-body-footer">
                            <div className="auth-body-footer-left">
                                <input
                                    type="checkbox"
                                    name="keep-me-logged-in"
                                    id="keep-me-logged-in"
                                />
                                <label htmlFor="keep-me-logged-in">
                                    Keep me logged in
                                </label>
                            </div>
                            <div className="auth-body-footer-right">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    )}

                    <div className="auth-footer">
                        <button className="auth-submit-btn">
                            {formText.button}
                        </button>
                        <p>{formText.have_an_account}</p>
                        <a href="#" onClick={changeAuth}>
                            {formText.go_to}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
