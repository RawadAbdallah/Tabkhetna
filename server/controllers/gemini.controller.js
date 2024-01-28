const { GoogleGenerativeAI } = require("@google/generative-ai");
const { gemeniAPIKey } = require("../configs/gemini.config");

const genAI = new GoogleGenerativeAI(gemeniAPIKey);

const getEngineeredPrompt = (title, listOfCurrentInfo, missing) => {
    let currentInfo = "instructions";
    if (missing === "instructions") {
        currentInfo = "ingredients";
    }
    return `As a food chef, generate a basic set of instructions for a ${title} with the provided ${currentInfo}. Please provide clear and concise steps, avoiding additional phrases and don't generate any ${currentInfo}, just generate the ${missing}. Don't make it as a vertical list, use a dash '-' to seperate each ${missing}, so only use dash characters whenever you need to separate each item. Omit numbers, and if you want to a dash character in a sentence, use space instead, in example don't write for example 12-inch write it instead 12 inch. Format the instructions as follows: (${missing} -${missing}- ...). Keep it within 300 characters. I repeat dashes are only written when item seperation is needed. Here's the ${currentInfo} list: ${listOfCurrentInfo}`;
};

const generateRecipeMissingInfo = async (req, res) => {
    let { title, listOfCurrentInfo, missing } = req.body;
    const prompt = getEngineeredPrompt(title, listOfCurrentInfo, missing);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return res.status(200).json({ text });
    } catch (error) {
        console.log("Error generating text:", error.message);
    }
};

module.exports = generateRecipeMissingInfo;
