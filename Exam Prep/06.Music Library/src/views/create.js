import { html } from "../../node_modules/lit-html/lit-html.js";

const createTemplate = (onSubmit) => html`
<section id="create">
<div class="form">
    <h2>Add Album</h2>
    <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
        <input type="text" name="release" id="album-release" placeholder="Release date" />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />
        <button type="submit">post</button>
    </form>
</div>
</section>`

let _render = undefined;
let _router = undefined;
let _albumService = undefined;

export function init(render, router, albumService) {
    _render = render;
    _router = router;
    _albumService = albumService;
}

export function createView() {
    _render(createTemplate(onSubmit));
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const singer = formData.get('singer').trim();
    const album = formData.get('album').trim();
    const imageUrl = formData.get('imageUrl').trim();
    const release = formData.get('release').trim();
    const label = formData.get('label').trim();
    const sales = formData.get('sales').trim();

    try {
        if (singer == '' || album == '' || imageUrl == '' || release == '' || label == '' || sales == '') {
            throw new Error('All fields are required!');
        }

        await _albumService.createAlbum({ singer, album, imageUrl, release, label, sales });
        _router.redirect('/dashboard');
    } catch (error) {
        return alert(error.message);
    }
}