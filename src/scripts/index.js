import { getUser } from "./services/users.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";   

document.querySelector("#btn-search").addEventListener("click", () => {
  const userName = document.querySelector("#input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.querySelector("#input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  if (validateEmptyInput(userName)) return;
  const key = e.which || e.keyCode;
  if (key === 13) {
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub.");
    return true;
  }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }
  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);

  screen.renderUser(user);

  console.log(eventsResponse);
}
