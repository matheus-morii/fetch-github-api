const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class= "info">
                                        <img src= "${user.avatarUrl}" alt= "Foto do perfil do usuário" />
                                        <div class= "data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrado 😢'}</p>
                                            <p>Seguidores: ${user.followers ?? 0}</p>
                                            <p>Seguindo: ${user.following ?? 0}</p>
                                        </div>
                                    </div>`

        let repositoriesItems = ""
        user.repositories.forEach(repo => repositoriesItems += `<li><a href= "${repo.html_url}" target= "_blank">${repo.name}
                                                                <ul>
                                                                <li>🍴 ${repo.forks}</li>
                                                                <li>⭐ ${repo.stargazers_count}</i></li>
                                                                <li>👀 ${repo.watchers}</li>
                                                                <li>🧑‍💻 ${repo.language ?? "Indefinide"}</li>
                                                                </ul>
                                                                </a></li>`)

        if (user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class= "repositories section">
                                                <h2>Repositório</h2>
                                                <ul>${repositoriesItems}</ul>
                                            </div>`
        }  

        let eventsItens = ''
        user.events.forEach(events => {
            const eventName = events.repo.name
            const eventsCommits = events.payload.commits
            if (events.type === "PushEvent") {
                eventsCommits.forEach(msg => {
                    const eventMsg = msg.message

                    eventsItens += `<li>${eventName} - ${eventMsg} </li>
                                    <br>`
                })
            } else if (events.type === "CreateEvent") {
                eventsItens += `<li><strong>${eventName}</strong> - Sem msg de commit</li>
                                <br> `
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class= "repositories section">
                                                                <h2>Eventos</h2>
                                                                <ul>${eventsItens}</ul>
                                                            </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usúario não encontrado</h3>"
    }
}

export { screen }