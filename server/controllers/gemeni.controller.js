const { GoogleGenerativeAI } = require("@google/generative-ai");
const { gemeniAPIKey } = require("../configs/gemini.config");

const genAI = new GoogleGenerativeAI(gemeniAPIKey);

const getEngineeredPrompt = (title, listOfCurrentInfo, missing) => {
    let currentInfo = "instructions";
    if (missing === "instructions") {
        currentInfo = "ingredients";
    }
    return `As a food chef, generate a basic set of instructions for a ${title} with the provided ${currentInfo}. Please provide clear and concise steps, avoiding additional phrases and don't generate any ${currentInfo}, just generate the ${missing}. Ensure that no comma is used within a sentence; use a comma only when separating each ${missing}. Omit numbers or dashes as items are separated by commas. Format the instructions as follows: (${missing}, ${missing}, ...). Keep it within 300 characters. I repeat commas are only written when item seperation is needed, for example: "Grab the milk, water and the eggs " should be without commas like this "Grab the milk water and the eggs". Here's the ${currentInfo} list: ${listOfCurrentInfo}`;
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
