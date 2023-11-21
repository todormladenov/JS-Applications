import { html } from "../node_modules/lit-html/lit-html.js";

const createTemplate = (onSubmit) => html`
<section id="create">
        <div class="form">
          <h2>Add Product</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"cols="50"></textarea>
            <input type="text" name="price" id="product-price" placeholder="Price" />
            <button type="submit">Add</button>
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

export function createView() {
    _render(createTemplate(onSubmit));
}

async function onSubmit(e) {
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

        await _productService.createProduct({ name, imageUrl, category, description, price });
        _router.redirect('/catalog');
    } catch (error) {
        return alert(error.message);
    }
}