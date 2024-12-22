const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: "your_github_personal_access_token"
});

async function getFile() {
    try {
        const response = await octokit.repos.getContent({
            owner: "your_username",
            repo: "your_repo",
            path: "data.json",
        });

        const content = Buffer.from(response.data.content, "base64").toString();
        console.log("File content:", JSON.parse(content));
    } catch (error) {
        console.error("Error fetching file:", error.message);
    }
}

getFile();
