import { useEffect, useState } from "react";
import "./auth.css";
import upload_icon from "../../assets/images/upload_icon.svg";

type Credentials = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirm_password: string,
    profilePic?: string 
}

const Auth: React.FC = () => {

    //Use States
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        profilePic: "",
    })
    const [formText, setFormText] = useState({
        header_title: "Welcome Back! Let's Start Cooking",
        header_paragraph: "Please login to continue",
        button: "Login",
        have_an_account: "Don't have an account?",
        go_to: "Register",
    });


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

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const imageSrc = e.target?.result as string;
                const img = new Image();
    
                img.onload = () => {
                    const aspectRatio = img.width / img.height;
    
                    let squareSize:number = img.width;
                    let startX:number = 0;
                    let startY:number = 0;

                    //Converts image aspect ratio to 1:1 and centers it
                    if (aspectRatio > 1) {
                        squareSize = img.height;
                        startX = (img.width - squareSize) / 2;
                    } else {
                        startY = (img.height - squareSize) / 2; 
                    }
    
                    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    canvas.width = squareSize;
                    canvas.height = squareSize;
    
                    ctx?.drawImage(img, startX, startY, squareSize, squareSize, 0, 0, squareSize, squareSize);
    
                    const croppedImageSrc = canvas.toDataURL();
    
                    setProfilePic(croppedImageSrc);
                    console.log(profilePic);
                };
    
                img.src = imageSrc;
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
                        <br/>
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
                                onChange={handleProfilePicChange}
                                hidden={true}
                                accept="image/png, image/jpeg"
                            />
                        </div>
                    )}

                    <p>Enter your credentials</p>
                    <input type="email" required placeholder="Email Address" />
                    <input type="password" required placeholder="Password" />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="Confirm password"
                            id="confirm-password"
                            name="confirm-password"
                        />
                    )}

                    {!isLogin && (
                        <>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Firstname"
                                    id="firstname"
                                    name="firstname"
                                />
                                <input
                                    type="text"
                                    placeholder="Lastname"
                                    id="lastname"
                                    name="lastname"
                                />
                            </div>
                        </>
                    )}
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
