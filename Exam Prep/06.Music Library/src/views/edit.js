import { html } from "../../node_modules/lit-html/lit-html.js";

const editTemplate = (album, onSubmit) => html`
<section id="edit">
<div class="form">
    <h2>Edit Album</h2>
    <form class="edit-form" @submit=${(e) => onSubmit(album._id, e)}>
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer}/>
        <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album}/>
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl}/>
        <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release}/>
        <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label}/>
        <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales}/>
        <button type="submit">post</button>
    </form>
</div>
</section>`;

let _render = undefined;
let _router = undefined;
let _albumService = undefined;

export function init(render, router, albumService) {
    _render = render;
    _router = router;
    _albumService = albumService;
}

export async function editView(ctx) {
    const album = await _albumService.getAlbumById(ctx.params.id);
    _render(editTemplate(album, onSubmit));
}

async function onSubmit(albumId, e) {
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

        await _albumService.updateAlbum({ singer, album, imageUrl, release, label, sales }, albumId);
        _router.redirect(`/details/${albumId}`);
    } catch (error) {
        return alert(error.message);
    }
}