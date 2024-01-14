import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import "./home.css";
const Home: React.FC = () => {
    return (
        <div className="home-page">
            <Header />
            <div className="home-main flex align-items-left">
                <Sidebar />
            </div>
        </div>
    );
};

export default Home;
