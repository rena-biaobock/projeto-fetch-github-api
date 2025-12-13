import { baseUrl } from "../variables.js";

async function getRepositories(userName) {
  const maxItems = 10;
  const response = await fetch(
    `${baseUrl}/${userName}/repos?per_page=${maxItems}`
  );
  return await response.json();
}

export { getRepositories };
