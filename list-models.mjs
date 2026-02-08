
import fs from 'fs';
import path from 'path';

async function listModels() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.error("No API Key found");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    console.log("Fetching models from:", url.replace(apiKey, "HIDDEN_KEY"));

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error status:", response.status, response.statusText);
            const text = await response.text();
            console.error("Error body:", text);
            return;
        }
        const data = await response.json();
        const jsonStr = JSON.stringify(data, null, 2);
        fs.writeFileSync('models.json', jsonStr, 'utf-8');
        console.log("Models saved to models.json");
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

listModels();
