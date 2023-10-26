function loadCommits() {
    let usernameElement = document.getElementById('username');
    let repoElement = document.getElementById('repo');
    let commitsElement = document.getElementById('commits');

    let username = usernameElement.value;
    let repo = repoElement.value;

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            return res.json();
        })
        .then(commits => {
            commitsElement.innerHTML = '';
            commits.forEach(commit => {
                let name = commit.commit.author.name;
                let message = commit.commit.message;

                let liElement = document.createElement('li');
                liElement.textContent = `${name}: ${message}`;
                commitsElement.appendChild(liElement);
            });
        })
        .catch((error) => {
            commitsElement.innerHTML = '';
            let liElement = document.createElement('li');
            liElement.textContent = `Error: ${error.message} (Not Found)`;
            commitsElement.appendChild(liElement);
        })
}