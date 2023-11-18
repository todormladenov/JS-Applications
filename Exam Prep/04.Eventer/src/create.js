import { html } from "../node_modules/lit-html/lit-html.js";
import { createRequest } from "./requests.js";

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Event</h2>
        <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="name" id="name" placeholder="Event" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
            <input type="text" name="category" id="event-category" placeholder="Category" />
            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>
            <input type="text" name="date" id="date" placeholder="When?" />
            <button type="submit">Add</button>
          </form>
    </div>
</section>`;

export function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

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

            await createRequest({ name, imageUrl, category, description, date });
            ctx.page.redirect('/events');
        } catch (error) {
            return alert(error.message);
        }
    }
}