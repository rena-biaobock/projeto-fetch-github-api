import { repoUrl } from "../variables.js";

async function getCommit(repoName, sha) {
  const maxItems = 1;
  const response = await fetch(`${repoUrl}/${repoName}/commits/${sha}`);
  return await response.json();
}

export { getCommit };
