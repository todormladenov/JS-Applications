import { html, nothing } from "../node_modules/lit-html/lit-html.js";

const detailsTemplate = (product, isOwner, user, deleteHandler, buyHandler, boughtCount, isBought) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${product.imageUrl} alt="example1" />
  <p id="details-title">${product.name}</p>
  <p id="details-category">${product.category}</p>
  <p id="details-price">Price: <span id="price-number">${product.price}</span>$</p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Bought: <span id="buys">${boughtCount}</span> times.</h4>
      <span>${product.description}</span>
    </div>
  </div>
  ${isOwner ? html`
  <div id="action-buttons">
    <a href="/edit/${product._id}" id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn" @click=${() => deleteHandler(product._id)}>Delete</a>
  </div>` : nothing}
  ${user && !isOwner && isBought? html`
  <div id="action-buttons">
    <a href="javascript:void(0)" id="buy-btn" @click=${() => buyHandler(product._id)}>Buy</a>
  </div>` : nothing} 
</div>
</section>`;

let _render = undefined;
let _router = undefined;
let _productService = undefined;

export function init(render, router, productService) {
  _render = render;
  _router = router;
  _productService = productService;
}

export async function detailsView(ctx) {
  const user = ctx.user();
  const [product, boughtCount, isBought] = await Promise.all([
    _productService.getProductById(ctx.params.id),
    _productService.bought(ctx.params.id),
    _productService.isBought(ctx.params.id, user)]);
  const isOwner = user && user._id == product._ownerId;
  _render(detailsTemplate(product, isOwner, user, deleteHandler, buyHandler, boughtCount, isBought));
}

async function deleteHandler(productId) {
  if (confirm('Are you sure you want to delete this item?')) {
    await _productService.deleteItem(productId);
    _router.redirect('/catalog');
  }
}

async function buyHandler(productId) {
  await _productService.buyProduct({ productId });
  _router.redirect(`/details/${productId}`);
}