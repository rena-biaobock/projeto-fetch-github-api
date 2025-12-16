import { getCommit } from "../services/commits.js";
import { emojiMap } from "../variables.js";

const screen = {
  userProfile: document.querySelector(".profile-data"),
  async renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                                        <img src="${
                                          user.avatarUrl
                                        }" alt="Foto de perfil do usuário" />
                                        <div class="data">
                                            <h1>${
                                              user.name ??
                                              "Não possui nome cadastrado 🥲"
                                            }</h1>
                                            <p>${
                                              user.bio ??
                                              "Não possui bio cadastrada 🥲"
                                            }</p>
                                            <p id="follow"><i class="fa-solid fa-users"></i>${
                                              user.followers
                                            } followers · ${
      user.following
    } following</p>
                                        </div>
                                    </div>`;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                    <ul>
                                        <li>🍴: ${repo.forks_count}</li>
                                        <li>⭐: ${repo.stargazers_count}</li>
                                        <li>👀: ${repo.watchers_count}</li>
                                        <li>🧑‍💻: ${repo.language}</li>
                                    </ul>
                                    </a>
                                </li>`)
    );
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`;
    }

    let eventItens = "";
    for (const event of user.events) {
      if (event.type == "CreateEvent") {
        eventItens += `<li><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a> - "Sem mensagem de commit"</li>`;
      }
      if (event.type == "PushEvent") {
        try {
          const eventCommit = await getCommit(
            event.repo.name,
            event.payload.head
          );
          eventItens += `<li><a href="https://github.com/${
            event.repo.name
          }" target="_blank">${event.repo.name}</a> - ${this.emojify(
            eventCommit.commit.message
          )}</li>`;
        } catch (error) {
          console.error("Error fetching commit message:", error);
          eventItens += `<li><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a> - "Erro ao buscar mensagem de commit"</li>`;
        }
      }
    }

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventItens}</ul>
                                        </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado.</h3>";
  },
  emojify(text) {
    return text.replace(/:\w+:/g, (e) => emojiMap[e] || e);
  },
};

export { screen };
