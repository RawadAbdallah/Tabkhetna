import "../error.css";
import Header from "../../components/header";
import { goBack } from "../../utils/helper";

type errorProps = {
    statusCode: number;
    errorMessage: string;
};

const Error: React.FC<errorProps> = ({ statusCode, errorMessage }) => {
    return (
        <>
            <div className=" flex flex-column">
                <Header />
                <div className=" error-container flex flex-column align-center justify-center">
                    <h1>Error {statusCode}</h1>
                    <p>{errorMessage}</p>
                    <button onClick={goBack}>Go Back</button>
                </div>
            </div>
        </>
    );
};

export default Error;