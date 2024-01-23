import Header from "@/components/header";
import "./support.css";
import Sidebar from "@/components/sidebar";

const data = [
    {
        id: 1,
        question: "How to post a cook?",
        answer: "On the home page, choose what you want to post whether a video, a challenge, recipe or go Live",
    },
    {
        id: 2,
        question: "How to add a friend?",
        answer: "Here a 'friend' is called a cookmate, to add a cookmate, click on someone profile and on his profile page click on add cookmate.",
    },
    {
        id: 3,
        question: "Can I delete a post?",
        answer: "Yes you can. On the post click on the three dots, then click delete post.",
    },
];

const Support = () => {
    return (
        <div className="support-page">
            <Header />
            <main className="support-main flex">
                <Sidebar current_page="support" />
                <section className="main-support-section">
                    <h1>Welcome to the Support page</h1>
                    <div>
                        <h3>Frequently Asked Questions: </h3>
                        {data && data.length > 0 && (
                            <>
                                <ul>
                                    {data.map((question) => {
                                        return (
                                            <li
                                                className="faq-wrapper"
                                                key={question.id}
                                            >
                                                <h1>
                                                   {question.question}
                                                </h1>
                                                <p>{question.answer}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                    </div>

                    <footer>
                        <h3>
                            Need more help? contact us at{" "}
                            <a
                                href="mailto:tabkhetna@gmail.com"
                                style={{ textDecoration: "underline" }}
                            >
                                tabkhetna@gmail.com
                            </a>
                        </h3>
                    </footer>
                </section>
            </main>
        </div>
    );
};

export default Support;
