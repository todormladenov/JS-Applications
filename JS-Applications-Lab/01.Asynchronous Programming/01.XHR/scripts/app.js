// function loadRepos() {
//    let resultElement = document.getElementById('res');
//    let url = 'https://api.github.com/users/testnakov/repos';

//    const httpRequest = new XMLHttpRequest();

//    httpRequest.addEventListener('readystatechange', () => {
//       if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//          resultElement.textContent = httpRequest.responseText;
//       }
//    });
//    httpRequest.open('GET', url);
//    httpRequest.send();
// }

function loadRepos() {
   let resultElement = document.getElementById('res');
   let url = 'https://api.github.com/users/testnakov/repos';

   fetch(url)
      .then(res => res.text())
      .then(repos => resultElement.textContent = repos)
   .catch(err => console.log(err))

}

