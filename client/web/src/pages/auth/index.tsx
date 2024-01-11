import { useEffect, useState } from "react";
import "./auth.css";
import upload_icon from "../../assets/images/upload_icon.svg";
import { request } from "../../services/request";

type Credentials = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
    profile_pic?: string | null;
    keep_me_logged_in: boolean;
};

const Auth: React.FC = () => {
    //Use States
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [credentials, setCredentials] = useState<Credentials>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        profile_pic: null,
        keep_me_logged_in: false,
    });
    const [formText, setFormText] = useState({
        header_title: "Welcome Back! Let's Start Cooking",
        header_paragraph: "Please login to continue",
        button: "Login",
        have_an_account: "Don't have an account?",
        go_to: "Register",
    });
    const [isInvalid, setIsInvalid] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
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
        setIsInvalid({ firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",})
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

                    let squareSize: number = img.width;
                    let startX: number = 0;
                    let startY: number = 0;

                    //Converts image aspect ratio to 1:1 and centers it
                    if (aspectRatio > 1) {
                        squareSize = img.height;
                        startX = (img.width - squareSize) / 2;
                    } else {
                        startY = (img.height - squareSize) / 2;
                    }

                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    canvas.width = squareSize;
                    canvas.height = squareSize;

                    ctx?.drawImage(
                        img,
                        startX,
                        startY,
                        squareSize,
                        squareSize,
                        0,
                        0,
                        squareSize,
                        squareSize
                    );

                    const croppedImageSrc = canvas.toDataURL();

                    setCredentials((prev) => ({
                        ...prev,
                        profile_pic: croppedImageSrc,
                    }));
                    console.log(credentials.profile_pic);
                };

                img.src = imageSrc;
            };

            reader.readAsDataURL(file);
        }
    };

    const validateEmail = (email:string):string => {
        if(!email){
          return "Email is missing"
        }
      
        const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)){
          return "Email format is invalid"
        }
        return ""
      }
    const validateForm = () => {
        const { email, firstname, lastname, password, confirm_password } =
            credentials;
        //email validation
        const emailError = validateEmail(email)
        if(emailError){
            setIsInvalid((prev) => ({...prev, email: emailError}) )
        }

        //password validation
        if(!password){
            setIsInvalid((prev) => ({...prev, password: "Password is missing"}) )
        }

        else if(password.length < 6 || password.length > 16){
            setIsInvalid((prev) => ({...prev, password: "Password should be between 6 and 16 characters"}) )
        }

        //confirm password validation
        if(!confirm_password){
            setIsInvalid((prev) => ({...prev, confirm_password: "Confirm password is missing"}))
        }
        else if(confirm_password !== password){
            setIsInvalid((prev) => ({...prev, confirm_password: "Passwords don't match"}))
        }

        //Firstname validation

        if(!firstname){
            setIsInvalid((prev) => ({...prev, firstname: "Firstname is missing"}))
        }

        else if(firstname.length <= 2){
            setIsInvalid((prev) => ({...prev, firstname: "Firstname should be at least 2 characters"}))
        }

        // Lastname validation
        if(!lastname){
            setIsInvalid((prev) => ({...prev, lastname: "Lastname is missing"}))
        }

        else if(lastname.length <= 2){
            setIsInvalid((prev) => ({...prev, lastname: "Lastname should be at least 2 characters"}))
        }


    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setCredentials((prev) => ({ ...prev, [`${name}`]: e.target.value }));
        setIsInvalid((prev) => ({ ...prev, [`${name}`]: "" }));
        console.log(name)
    };

    const handleSubmit = () => {
        validateForm();
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
                        <br />
                        <p>{formText.header_paragraph}</p>
                    </div>
                    <img src="logo.png" alt="Tabkhetna Logo" />
                </div>

                <div className="auth-body">
                    {!isLogin && (
                        <div className="profile_pic">
                            <label htmlFor="profile_pic">
                                <img
                                    src={credentials.profile_pic || upload_icon}
                                    alt="upload pic"
                                    className={
                                        credentials.profile_pic
                                            ? "profile_pic_selected"
                                            : ""
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
                    {isInvalid.email && (
                        <span className="field-missing">{isInvalid.email}</span>
                    )}  
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        onChange={handleChange}
                        className={isInvalid.email ? "error" : ""}
                    />
                     {isInvalid.password && (
                        <span className="field-missing">{isInvalid.password}</span>
                    )}  
                    
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={handleChange}
                        className={isInvalid.password ? "error" : ""}
                    />
                    {!isLogin && (
                        <>
                        {isInvalid.confirm_password && (
                        <span className="field-missing">
                        {isInvalid.confirm_password}
                    </span>
                    )} 
                           
                            <input
                                type="password"
                                placeholder="Confirm password"
                                id="confirm_password"
                                name="confirm_password"
                                onChange={handleChange}
                                className={isInvalid.confirm_password ? "error" : ""}
                            />
                        </>
                    )}
                    {!isLogin && (
                        <div>
                            <div className="flex">
                                <div className="w-50">
                                {isInvalid.firstname && (
                        <span className="field-missing">
                        {isInvalid.firstname}
                    </span>
                    )} 
                                    <input
                                        type="text"
                                        placeholder="Firstname"
                                        id="firstname"
                                        name="firstname"
                                        onChange={handleChange}
                                        className={isInvalid.firstname ? "error" : ""}
                                    />
                                </div>
                                <div className="w-50">
                                {isInvalid.lastname && (
                        <span className="field-missing">
                        {isInvalid.lastname}
                    </span>
                    )} 
                                    <input
                                        type="text"
                                        placeholder="Lastname"
                                        id="lastname"
                                        name="lastname"
                                        onChange={handleChange}
                                        className={isInvalid.lastname ? "error":""}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Conditional rendering on keep me logged in */}
                    {isLogin && (
                        <div className="auth-body-footer">
                            <div className="auth-body-footer-left">
                                <input
                                    type="checkbox"
                                    name="keep_me_logged_in"
                                    id="keep_me_logged_in"
                                    onChange={() => {
                                        setCredentials((prev) => ({
                                            ...prev,
                                            keep_me_logged_in:
                                                !prev.keep_me_logged_in,
                                        }));
                                    }}
                                />
                                <label htmlFor="keep_me_logged_in">
                                    Keep me logged in
                                </label>
                            </div>
                            <div className="auth-body-footer-right">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    )}
                    <div className="auth-footer">
                        <button
                            className="auth-submit-btn"
                            onClick={handleSubmit}
                        >
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
