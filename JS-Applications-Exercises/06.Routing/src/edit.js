import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createEditRequest, getFurnitureById } from "./requests.js";
const container = document.querySelector('.container');

const editFormTemplate = (itemData, editFurniture, errorMsg, errors) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${editFurniture}>
        ${errorMsg ? html`<div class="form-group">${errorMsg}</div>` : null}
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${'form-control' + (errors.make ? ' is-invalid' : '')} id="new-make" type="text" name="make" value="${itemData.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${'form-control' + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model" value="${itemData.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${'form-control' + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year" value="${itemData.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${'form-control' + (errors.description ? ' is-invalid' : '')} id="new-description" type="text" name="description" value="${itemData.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${'form-control' + (errors.price ? ' is-invalid' : '')} id="new-price" type="number" name="price" value="${itemData.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${'form-control' + (errors.img ? ' is-invalid' : '')} id="new-image" type="text" name="img" value="${itemData.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${itemData.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`

export async function showEdit(ctx) {
    let itemData = await getFurnitureById(ctx.params.id)
    render(editFormTemplate(itemData, editFurniture, null, {}), container);

    async function editFurniture(e) {
        e.preventDefault();
        let form = e.currentTarget
        let formData = [...(new FormData(form)).entries()];

        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
        const missing = formData.filter(([k, v]) => k != 'material' && v.trim() == '');

        try {
            if (missing.length) {
                const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {})
                throw {
                    error: new Error('Please fill all mandatory fields!'),
                    errors
                };
            }
            data.year = Number(data.year);
            data.price = Number(data.price);

            await createEditRequest(data, ctx.params.id);
            form.reset();
            ctx.page.redirect('/');
        } catch (err) {
            console.log(err);
            const message = err.message || err.error.message;
            render(editFormTemplate(itemData, editFurniture, message, err.errors), container);
        }
    }
}