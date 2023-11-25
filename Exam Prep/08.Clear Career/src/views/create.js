import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../services/jobService.js";
import { createSubmitHandler } from "../services/utils.js";

const createTemplate = (onSubmit) => html`
<section id="create">
<div class="form">
  <h2>Create Offer</h2>
  <form class="create-form" @submit=${onSubmit}>
    <input type="text" name="title" id="job-title" placeholder="Title" />
    <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
    <input type="text" name="category" id="job-category" placeholder="Category" />
    <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
    <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"cols="50"></textarea>
    <input type="text" name="salary" id="job-salary" placeholder="Salary" />
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export function createView(ctx){
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        const emptyField = Object.values(data).some(f => f.trim() == '');
        if (emptyField) {
            throw new Error('All fields are required!');
        }

        await create(data.title, data.imageUrl, data.category, data.description, data.requirements, data.salary);
        event.target.reset();
        ctx.page.redirect('/catalog');
    } catch (error) {
        return alert(error.message);
    }
}