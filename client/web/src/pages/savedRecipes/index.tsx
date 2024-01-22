import Header from "@/components/header";
import "./savedRecipes.css";
import Sidebar from "@/components/sidebar";
import Post from "@/components/post";
import CookmatesSidebar from "@/components/cookmatesSidebar";

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
            {
                profile_pic: "src/assets/images/default_profile_pic.png",
                username: "Hussein Mokdad",
                comment: "This is the best post I've ever seen.",
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

const SavedRecipes = () => {
    return (
        <div className="saved-recipes-page">
            <Header />
            <main className="main-saved-recipes flex">
                <Sidebar current_page="savedRecipes" />
                <div className="main-saved-recipes-section">
                    <h1>Saved Recipes</h1>
                    <section className="main-section flex flex-column gap-5">
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
                </div>
                <CookmatesSidebar />
            </main>
        </div>
    );
};

export default SavedRecipes;
