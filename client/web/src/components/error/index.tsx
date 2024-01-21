import "./error.css";
import { goBack } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type errorProps = {
    statusCode: number;
    errorMessage: string;
    errorTitle?: string;
    showGoBack?: boolean;
    redirection?: boolean;
};

const Error: React.FC<errorProps> = ({
    statusCode,
    errorTitle,
    errorMessage,
    showGoBack = true,
    redirection = false,
}) => {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5)

    const startCountDown = () => {
        setInterval(()=>{
            setCountdown(countdown- 1)
        }, 1000)
    }

    useEffect(()=>{
        if(countdown < 0)
            navigate('/auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown])

    return (
        <>
            <div className=" flex flex-column">
                <div className=" error-container flex flex-column align-center justify-center gap-5">
                    <h1>Error {statusCode}</h1>
                    <h1 className="error-title">
                        {errorTitle}
                    </h1>
                    <p>{errorMessage}</p>
                    {showGoBack && <button onClick={goBack}>Go Back</button>}
                    {redirection && (
                        <>
                            {startCountDown()}
                            <h2>Redirecting you to Login page in <span>{countdown}</span></h2>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Error;
