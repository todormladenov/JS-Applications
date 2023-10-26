function loadRepos() {
	let baseUrl = 'https://api.github.com/users';
	let reposElement = document.getElementById('repos');
	let usernameElement = document.getElementById('username');

	fetch(`${baseUrl}/${usernameElement.value}/repos`)
		.then(res => res.json())
		.then(repos => {
			reposElement.innerHTML = '';
			if (Array.isArray(repos)) {
				repos.forEach((repo) => {
					let liElement = document.createElement('li');
	
					let aRepoElement = document.createElement('a');
					aRepoElement.textContent = repo.full_name;
					aRepoElement.href = repo.html_url;
	
					liElement.appendChild(aRepoElement)
					reposElement.appendChild(liElement);
				});
			} else {
				throw new Error ('Invalid data!')
			}

		})
		.catch((err) => {
			let liElement = document.createElement('li');
			liElement.textContent = `Error: ${err.message}`;

			reposElement.appendChild(liElement);

		});

}