import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../services/jobService.js";
import { createSubmitHandler } from "../services/utils.js";

const editTemplate = (job, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${job.title}/>
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${job.imageUrl}/>
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${job.category}/>
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50">${job.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"cols="50">${job.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${job.salary}/>
            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editView(ctx){
    const job = await getById(ctx.params.id);
    ctx.render(editTemplate(job, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        const emptyField = Object.values(data).some(f => f.trim() == '');
        if (emptyField) {
            throw new Error('All fields are required!');
        }
        
        const jobId = ctx.params.id
        await update(jobId, data.title, data.imageUrl, data.category, data.description, data.requirements, data.salary);
        event.target.reset();
        ctx.page.redirect(`/details/${jobId}`);
    } catch (error) {
        return alert(error.message);
    }
}