import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../services/jobService.js";

const catalogTemplate = (allJobs) => html`
<section id="dashboard">
<h2>Job Offers</h2>
${allJobs.length ? allJobs.map(j => jobCardTemplate(j)) : html`<h2>No offers yet.</h2>`}
</section>`;

const jobCardTemplate = (job) => html`
<div class="offer">
    <img src=${job.imageUrl} alt="example1" />
    <p><strong>Title: </strong><span class="title">${job.title}</span></p>
    <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
    <a class="details-btn" href="/details/${job._id}">Details</a>
</div>`

export async function catalogView(ctx){
    const allJobs = await getAll();
    ctx.render(catalogTemplate(allJobs));
}