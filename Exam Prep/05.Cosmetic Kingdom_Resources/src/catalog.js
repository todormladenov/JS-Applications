import { html } from "../node_modules/lit-html/lit-html.js";

const catalogTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
    ${products.length ? products.map(p => productTemplate(p)) : html`<h2>No products yet.</h2>`}
</section>`;

const productTemplate = (product) => html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
</div>`;

let _render = undefined;
let _router = undefined;
let _productService = undefined;

export function init(render, router, productService) {
    _render = render;
    _router = router;
    _productService = productService;
}

export async function catalogView() {
    const products = await _productService.getAllProducts();
    _render(catalogTemplate(products));
}