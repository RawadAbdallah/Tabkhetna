import "./auth.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "@components/loader";
import upload_icon from "@images/upload_icon.svg";
import Credentials from "@/types/credentials";
import { getUser, saveUser, validateForm } from "@/utils/helpers";
import SEO from "@utils/seo";
import { request } from "@services/request";
import { setUser } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
    //Use States
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const countries = [
        "Country",
        "Lebanon",
        "United State",
        "France",
        "Iraq",
        "Palestine",
        "Saudi Arabia",
        "Jordan",
        "Italy",
        "Mexico",
        "Spain",
        "Portogul",
        "Germany",
        "Other",
    ];
    const [credentials, setCredentials] = useState<Credentials>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        confirm_password: "",
        profile_pic: undefined,
        keep_me_logged_in: false,
        country: "",
    });
    const [formText, setFormText] = useState({
        header_title: "Welcome Back! Let's Start Cooking",
        header_paragraph: "Please login to continue",
        button: "Login",
        have_an_account: "Don't have an account?",
        go_to: "Register",
    });
    const [isInvalid, setIsInvalid] = useState<Credentials>({
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        password: "",
        confirm_password: "",
        country: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        //Check if user is saved in localStorage
        if (getUser()) {
            navigate("/");
        }
        setFormText(getFormText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, isInvalid]);

    const changeAuth = () => {
        setIsLogin(!isLogin);
        setIsInvalid({
            firstname: "",
            gender: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: "",
            country: "",
        });
    };

    //Shows uploaded image
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

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const croppedFile = new File(
                                [blob],
                                "profile_pic.png",
                                { type: "image/png" }
                            );
                            console.log(croppedFile);

                            setCredentials((prev) => ({
                                ...prev,
                                profile_pic: croppedFile,
                            }));
                        }
                    }, "image/png");
                };
                img.src = imageSrc;
                setCredentials((prev) => {
                    return {
                        ...prev,
                        profileSrc: img.src,
                    };
                });
            };

            reader.readAsDataURL(file);
        }
    };

    //Handles form change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const name = e.target.name;
        setCredentials((prev) => ({ ...prev, [`${name}`]: e.target.value }));
        setIsInvalid((prev) => ({ ...prev, [`${name}`]: "" }));
        console.log(name);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        validateForm(credentials, setIsInvalid);
        // login
        try {
            if (
                isLogin &&
                isInvalid.email.length === 0 &&
                isInvalid.password.length === 0
            ) {
                setIsLoading(true);
                const response = await request({
                    route: "/auth/login",
                    body: {
                        email: credentials.email,
                        password: credentials.password,
                    },
                    method: "POST",
                });
                //Error handling
                if (response && response.status === 200) {
                    const { token } = response.data;
                    const { _id, firstname, lastname, email, profile_pic } =
                        response.data.user;
                    dispatch(
                        setUser({
                            id: _id,
                            token,
                            firstname,
                            lastname,
                            email,
                            profile_pic,
                        })
                    );
                    saveUser(
                        _id,
                        email,
                        firstname,
                        lastname,
                        profile_pic,
                        token
                    );
                    navigate("/");
                } else if (response && response.status === 401) {
                    setIsInvalid((prev) => ({
                        ...prev,
                        email: "Invalid email/password",
                    }));
                } else {
                    setIsInvalid((prev) => ({
                        ...prev,
                        email: JSON.stringify(response?.data.error),
                    }));
                }
            } else {
                //Register & validity checking on all fields
                const {
                    email,
                    password,
                    confirm_password,
                    lastname,
                    firstname,
                    gender,
                    country,
                } = isInvalid;
                if (
                    !email &&
                    !password &&
                    !confirm_password &&
                    !lastname &&
                    !firstname &&
                    !gender &&
                    !country
                ) {
                    const formData = new FormData();
                    formData.append("email", credentials.email);
                    formData.append("password", credentials.password);
                    formData.append("firstname", credentials.firstname);
                    formData.append("lastname", credentials.lastname);
                    formData.append("gender", credentials.gender);
                    formData.append("country", credentials.country);

                    if (credentials.profile_pic instanceof File) {
                        formData.append(
                            "profile_pic",
                            credentials.profile_pic,
                            "profile_pic.png"
                        );
                    }

                    setIsLoading(true);
                    const response = await request({
                        route: "/auth/register",
                        body: formData,
                        method: "POST",
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    if (response && response.status === 200) {
                        console.log("registered successfully");
                        setIsLogin(true);
                    } else if (response && response.status === 400) {
                        console.log("something went wrong");
                    } else if (response && response.status === 409) {
                        setIsInvalid((prev) => ({
                            ...prev,
                            email: "Email already registered",
                        }));
                    } else {
                        setIsInvalid((prev) => ({
                            ...prev,
                            email: "Something went wrong, try refreshing",
                        }));
                    }
                }
            }
        } catch (e) {
            setIsInvalid((prev) => ({
                ...prev,
                email: "Something went wrong, try refreshing",
            }));
        } finally {
            setIsLoading(false);
        }
    };

    SEO({
        title: "Tabkhetna | Login or Register",
    });

    return (
        <div
            className={
                isLogin ? "auth-container login" : "auth-container register"
            }
        >
            {/* Loader rendering */}
            {isLoading && <Loader />}

            <form
                className="auth-form"
                method="POST"
                encType="multipart/form-data"
            >
                <div className="auth-header">
                    <div>
                        <h1>{formText.header_title}</h1>
                        <br />
                        <p>{formText.header_paragraph}</p>
                    </div>
                    <img src="/logo.png" alt="Tabkhetna" />
                </div>

                <div className="auth-body">
                    {!isLogin && (
                        <div className="profile_pic">
                            <label htmlFor="profile_pic">
                                <img
                                    src={credentials.profileSrc || upload_icon}
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

                    {!isLogin && (
                        <div className="flex gap-3">
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
                                    className={
                                        isInvalid.firstname ? "error" : ""
                                    }
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
                                    className={
                                        isInvalid.lastname ? "error" : ""
                                    }
                                />
                            </div>
                        </div>
                    )}

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
                        <span className="field-missing">
                            {isInvalid.password}
                        </span>
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
                                className={
                                    isInvalid.confirm_password ? "error" : ""
                                }
                            />
                        </>
                    )}
                    {!isLogin && (
                        <div className="select-options flex gap-3">
                            <div className="select-wrapper flex flex-column gap-3">
                                {isInvalid.gender && (
                                    <span className="field-missing">
                                        {isInvalid.gender}
                                    </span>
                                )}
                                <select
                                    title="Gender"
                                    className={`${
                                        isInvalid.gender ? "error" : ""
                                    } select`}
                                    name="gender"
                                    onChange={handleChange}
                                    defaultValue={""}
                                >
                                    <option value="" disabled>
                                        Gender
                                    </option>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                </select>
                            </div>
                            <div className="select-wrapper flex flex-column gap-3">
                                {isInvalid.country && (
                                    <span className="field-missing">
                                        {isInvalid.country}
                                    </span>
                                )}
                                <select
                                    title="Country"
                                    className={`${
                                        isInvalid.country ? "error" : ""
                                    } select`}
                                    name="country"
                                    id="country"
                                    defaultValue={""}
                                    onChange={handleChange}
                                >
                                    {countries.map((item, index) => {
                                        if (index === 0)
                                            return (
                                                <option
                                                    key={item + index}
                                                    value=""
                                                    disabled
                                                >
                                                    {item}
                                                </option>
                                            );
                                        return (
                                            <option
                                                key={item + index}
                                                value={item.toLowerCase()}
                                            >
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
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
            </form>
        </div>
    );
};

export default Auth;
