//Auth Page helper functions
import Credentials from "../types/credentials";

export const validateEmail = (email: string): string => {
    if (!email) {
        return "Email is missing";
    }

    const emailRegex: RegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return "Email format is invalid";
    }
    return "";
};

export const validateForm = (
    credentials: Credentials,
    setIsInvalid: React.Dispatch<React.SetStateAction<Credentials>>
) => {
    const {
        email,
        firstname,
        lastname,
        password,
        confirm_password,
        gender,
        country,
    } = credentials;
    //email validation
    const emailError = validateEmail(email);
    if (emailError) {
        setIsInvalid((prev) => ({ ...prev, email: emailError }));
    }

    //password validation
    if (!password) {
        setIsInvalid((prev) => ({ ...prev, password: "Password is missing" }));
    } else if (password.length < 6 || password.length > 16) {
        setIsInvalid((prev) => ({
            ...prev,
            password: "Password should be between 6 and 16 characters",
        }));
    }

    //confirm password validation
    if (!confirm_password) {
        setIsInvalid((prev) => ({
            ...prev,
            confirm_password: "Confirm password is missing",
        }));
    } else if (confirm_password !== password) {
        setIsInvalid((prev) => ({
            ...prev,
            confirm_password: "Passwords don't match",
        }));
    }

    //Firstname validation

    if (!firstname) {
        setIsInvalid((prev) => ({
            ...prev,
            firstname: "Firstname is missing",
        }));
    } else if (firstname.length <= 2) {
        setIsInvalid((prev) => ({
            ...prev,
            firstname: "Firstname should be at least 2 characters",
        }));
    }

    // Lastname validation
    if (!lastname) {
        setIsInvalid((prev) => ({ ...prev, lastname: "Lastname is missing" }));
    } else if (lastname.length <= 2) {
        setIsInvalid((prev) => ({
            ...prev,
            lastname: "Lastname should be at least 2 characters",
        }));
    }

    if (!gender) {
        setIsInvalid((prev) => ({
            ...prev,
            gender: "Select a gender",
        }));
    }

    if (!country) {
        setIsInvalid((prev) => ({
            ...prev,
            country: "Please select your Country",
        }));
    }
};

// Go back feature function

export const goBack = () => {
    window.history.back();
};

// Authentication helpers

// Setting and getting from localStorage
export const saveUser = (
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    profile_pic: File,
    token: string
) => {
    localStorage.setItem(
        "tabkhetna_user",
        JSON.stringify({ id, email, firstname, lastname, profile_pic, token })
    );
};

export const getUser = (): string | null => {
    return localStorage.getItem("tabkhetna_user");
};

export const checkAuthentication = (): boolean => {
    const user = getUser();
    return user !== null && isValidSession(user);
};

const isValidSession = (user: string): boolean => {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.token;
    return parsedUser && token;
};
