import { html } from "../../node_modules/lit-html/lit-html.js";

const dashboardTemplate = (albums) => html`
<section id="dashboard">
<h2>Albums</h2>
<ul class="card-wrapper">
   ${albums.length ? albums.map(a => albumCardTemplate(a)) : html`<h2>There are no albums added yet.</h2>`}
</ul>
</section>`;

const albumCardTemplate = (album) => html`
<li class="card">
    <img src=${album.imageUrl} alt="travis" />
    <p><strong>Singer/Band: </strong><span class="singer">${album.singer}</span></p>
    <p><strong>Album name: </strong><span class="album">${album.album}</span></p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
</li>`;

let _render = undefined;
let _router = undefined;
let _authService = undefined;
let _albumService = undefined;

export function init(render, router, authService, albumService) {
    _render = render;
    _router = router;
    _authService = authService;
    _albumService = albumService;
}

export async function dashboardView() {
    const albums = await _albumService.getAllAlbums();
    _render(dashboardTemplate(albums));
}