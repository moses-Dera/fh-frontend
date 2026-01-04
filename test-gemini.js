const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const apiKey = "AIzaSyA3pI8Gpbyt939nLY-HdY94Q3osR3tpUi0";
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try a few specific variants
    const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-1.0-pro",
        "gemini-pro"
    ];

    for (const modelName of modelsToTry) {
        try {
            console.log(`\nTesting model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`SUCCESS with ${modelName}!`);
            console.log(result.response.text());
            break; // Stop on first success
        } catch (error) {
            console.log(`FAILED ${modelName}: ${error.message.split('[404')[0]}...`); // Shorten error
        }
    }
}

testGemini();
