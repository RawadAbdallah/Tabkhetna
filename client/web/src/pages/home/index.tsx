import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import CreatePost from "../../components/create-post";
import "./home.css";
const Home: React.FC = () => {
    return (
        <div className="home-page">
            <Header />
            <div className="home-main flex">
                <Sidebar />
                <section className="main-section">
                    <CreatePost />
                    <div className="posts-container"></div>
                </section>
            </div>
        </div>
    );
};

export default Home;
