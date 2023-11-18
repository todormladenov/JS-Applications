import { html } from "../node_modules/lit-html/lit-html.js";
import { createEditRequest, getItemById } from "./requests.js";

const editTemplate = (onSubmit, evenData) => html`
<section id="edit">
<div class="form">
  <h2>Edit Event</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="name" id="name" placeholder="Event" .value=${evenData.name}/>
    <input type="text" name="imageUrl" id="event-image" placeholder="Event Image" .value=${evenData.imageUrl}/>
    <input type="text" name="category" id="event-category" placeholder="Category" .value=${evenData.category}/>
    <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50">${evenData.description}</textarea>
    <label for="date-and-time">Event Time:</label>
    <input type="text" name="date" id="date" placeholder="When?" .value=${evenData.date}/>
    <button type="submit">Edit</button>
  </form>
</div>
</section>`;

export async function editView(ctx) {
    const evenData = await getItemById(ctx.params.id)
    ctx.render(editTemplate(onSubmit, evenData));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const category = formData.get('category').trim();
        const description = formData.get('description').trim();
        const date = formData.get('date').trim();

        try {
            if (name == '' || imageUrl == '' || category == '' || description == '' || date == '') {
                throw new Error('All fields are required!');
            }

            await createEditRequest({ name, imageUrl, category, description, date }, ctx.params.id);
            ctx.page.redirect(`/details/${ctx.params.id}`);
        } catch (error) {
            return alert(error.message);
        }
    }
}