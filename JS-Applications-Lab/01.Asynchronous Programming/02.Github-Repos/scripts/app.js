function loadRepos() {
	let baseUrl = 'https://api.github.com/users';
	let reposElement = document.getElementById('repos');
	let usernameElement = document.getElementById('username');

	fetch(`${baseUrl}/${usernameElement.value}/repos`)
		.then(res => res.json())
		.then(repos => {
			reposElement.innerHTML = '';

			repos.forEach((repo) => {
				let liElement = document.createElement('li');

				let aRepoElement = document.createElement('a');
				aRepoElement.textContent = repo.full_name;
				aRepoElement.href = repo.html_url;

				liElement.appendChild(aRepoElement)
				reposElement.appendChild(liElement);
			});
		})
		.catch((err) => {
			let liElement = document.createElement('li');
			liElement.textContent = `Error: 404 (Not Found)`;

			reposElement.appendChild(liElement);

		});

}