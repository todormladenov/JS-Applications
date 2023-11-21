import { html } from "../node_modules/lit-html/lit-html.js";

const editTemplate = (product, onSubmit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Product</h2>
  <form class="edit-form" @submit=${(e) => onSubmit(product._id, e)}>
    <input type="text" name="name" id="name" placeholder="Product Name" .value=${product.name}/>
    <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${product.imageUrl}/>
    <input type="text" name="category" id="product-category" placeholder="Category" .value=${product.category}/>
    <textarea id="product-description" name="description" placeholder="Description" rows="5"cols="50">${product.description}</textarea>
    <input type="text" name="price" id="product-price" placeholder="Price" .value=${product.price}/>
    <button type="submit">post</button>
  </form>
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

export async function editView(ctx) {
    const product = await _productService.getProductById(ctx.params.id);
    _render(editTemplate(product, onSubmit));
}

async function onSubmit(productId, e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get('name').trim();
    const imageUrl = formData.get('imageUrl').trim();
    const category = formData.get('category').trim();
    const description = formData.get('description').trim();
    const price = formData.get('price').trim();

    try {
        if (name == '' || imageUrl == '' || category == '' || description == '' || price == '') {
            throw new Error('All fields are required!');
        }

        await _productService.updateItem(productId, { name, imageUrl, category, description, price });
        _router.redirect(`/details/${productId}`);
    } catch (error) {
        return alert(error.message);
    }
}