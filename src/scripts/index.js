import { user } from '/src/scripts/services/users.js'
import { repos } from '/src/scripts/services/repositories.js'

document.querySelector('#btn-search').addEventListener('click', () => {
    const userName = document.querySelector('#input-search').value
    getUserProfile(userName)
})

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    if (key === 13) {
        getUserProfile(userName)
    }
})

function getUserProfile(userName) {
    user(userName).then(userData => {
        let userInfo = `<div class="info">
                            <img src="${userData.avatar_url}" alt="Foto de perfil do usuário" />
                            <div class="data">
                                <h1>${userData.name ?? 'Não possui nome cadastrado 🥲'}</h1>
                                <p>${userData.bio ?? 'Não possui bio cadastrada 🥲'}</p>
                            </div>
                        </div>`
        document.querySelector('.profile-data').innerHTML = userInfo
    })
    getUserRepositories(userName)
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        });
        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                <h2>Repositórios</h2>
                                                                <ul>${repositoriesItens}</ul>
                                                              </div>`
    })
}