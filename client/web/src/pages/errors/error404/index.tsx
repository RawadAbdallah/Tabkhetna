import "../error.css";
import Header from "../../../components/header";
import { goBack } from "../../../utils/helper";
const Error404: React.FC = () => {
    return (
        <>
            <div className=" flex flex-column">
                <Header />
                <div className=" error-container flex flex-column align-center justify-center">
                    <h1>Error 404</h1>
                    <p>
                        Oh no! It seems that someone ate this page. No worries,
                        we are here to guide you back to the feast.
                    </p>
                    <button onClick={goBack}>Go Back</button>
                </div>
            </div>
        </>
    );
};

export default Error404;
