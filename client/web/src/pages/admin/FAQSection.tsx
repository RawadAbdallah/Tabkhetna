import { useState } from "react";

const mockFAQs = [
    { question: "What is this?", answer: "This is a sample FAQ." },
    { question: "How to use?", answer: "Just follow the instructions." },
    // Add more FAQs as needed
];

const FAQSection : React.FC = () => {
    const [showFaqForm, setShowFaqForm] = useState<boolean>(false);
    const [newFaq, setNewFaq] = useState({
        question: "",
        answer: "",
    });
    const handleClick = () => {
        setShowFaqForm(!showFaqForm);
    };

    const handleAdd = () => {
      if (newFaq.question && newFaq.answer) {
        setShowFaqForm(!showFaqForm);
        mockFAQs.push({
          question: newFaq.question,
          answer: newFaq.answer,
        })
      } else {
        alert("Please fill out all fields.")
      }
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setNewFaq((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    return (
        <div className="faqs-section flex flex-column align-start gap-5">
            <h2>FAQ Section</h2>
            {mockFAQs.map((faq, index) => (
                <div key={index}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                </div>
            ))}

            <button onClick={handleClick}>Add a FAQ & answer</button>
            {showFaqForm && (
                <div className="add-faq-section">
                    <input
                        type="text"
                        placeholder="Question"
                        id="question"
                        name="question"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Answer"
                        id="answer"
                        name="answer"
                        onChange={handleChange}
                    />

                    <div className="flex gap-5 align-center">
                        <button onClick={handleClick}>Cancel</button>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQSection;
