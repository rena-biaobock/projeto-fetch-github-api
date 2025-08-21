import { baseUrl } from "/src/scripts/variables.js";

async function repos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos`)
    return await response.json()
}

export { repos }