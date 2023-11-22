import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = (album, isOwner, user, removeHandler, likes, ownLike, likeHandler) => html`
<section id="details">
<div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
        <img src=${album.imageUrl} alt="example1"/>
    </div>
    <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
        <p><strong>Album name:</strong><span id="details-album">${album.album}</span></p>
        <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
    ${isOwner ? html`
    <div id="action-buttons">
        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a href="javascript:void(0)" id="delete-btn" @click=${() => removeHandler(album._id)}>Delete</a>
    </div>` : nothing}
    ${!isOwner && user && ownLike ? html`
    <div id="action-buttons">
        <a href="javascript:void(0)" id="like-btn" @click=${() => likeHandler(album._id)}>Like</a>
    </div>`: nothing} 
</div>
</section>`;

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

export async function detailsView(ctx) {
    const albumId = ctx.params.id;
    const user = _authService.getUser();
    const [album, likes, ownLike] = await Promise.all([
        _albumService.getAlbumById(albumId),
        _albumService.getAllAlbumLikes(albumId),
        _albumService.getOwnAlbumLike(albumId, user)]);
    const isOwner = user && user._id == album._ownerId;
    _render(detailsTemplate(album, isOwner, user, removeHandler, likes, ownLike, likeHandler));
}

async function removeHandler(albumId) {
    if (confirm('Are you sure you want to delete this?')) {
        await _albumService.deleteAlbum(albumId);
        _router.redirect('/dashboard');
    }
}

async function likeHandler(albumId) {
    await _albumService.sendAlbumLike({ albumId });
    _router.redirect(`/details/${albumId}`);
}