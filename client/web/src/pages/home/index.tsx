import Sidebar from "@components/sidebar";
import Header from "@components/header";
import CreatePost from "@components/create-post";
import CookmatesSidebar from '@components/cookmates-sidebar'
import Post from "@components/post";
import "./home.css";
import SEO from "@/utils/seo";

const posts = [
    {
        uploader: "Rawad Abdallah",
        profile_pic: "src/assets/images/default_profile_pic.png",
        created_at: "2 hours ago",
        title: "This is a test post for the home page.",
        ingredients: "This is a ingredients",
        instructions: "Instructions are: cook and egg",
        media: [
            "src/assets/images/register-background.png",
            "src/assets/images/login-background.png",
        ],
        likes: 10,
        saves: 5,
        comments: [
            {
                profile_pic: "src/assets/images/default_profile_pic.png",
                username: "Mohammad Ali",
                comment: "Not bad",
            },
        ],
    },

    {
        uploader: "Rawad Abdallah",
        profile_pic: "src/assets/images/default_profile_pic.png",
        created_at: "2 hours ago",
        title: "This is a test post for the home page.",
        instructions: "Instructions are: cook and egg",
        media: [
            "src/assets/images/register-background.png",
            "src/assets/images/login-background.png",
        ],
        likes: 10,
        saves: 5,
        comments: [
            {
                profile_pic: "src/assets/images/default_profile_pic.png",
                username: "Mohammad Ali",
                comment: "Not bad",
            },
        ],
    },
];

const Home: React.FC = () => {
    SEO({
        title: "Home | Tabkhetna",
        description: "Tabkhetna's home page"
    })
    return (
        <div className="home-page">
            <Header />
            <div className="home-main flex">
                <Sidebar />
                <section className="main-section flex flex-column gap-5">
                    <CreatePost />
                    <div className="posts-container flex flex-column gap-5">
                        {posts.map((post, i) => {
                            return (
                                    <Post
                                        key={i}
                                        title={post.title}
                                        uploader={post.uploader}
                                        profile_pic={post.profile_pic}
                                        created_at={post.created_at}
                                        media={post.media}
                                        likes={post.likes}
                                        saves={post.saves}
                                        comments={post.comments}
                                        ingredients={post.ingredients}
                                        instructions={post.instructions}
                                    />
                            );
                        })}
                    </div>
                </section>
                <CookmatesSidebar />
            </div>
        </div>
    );
};

export default Home;
