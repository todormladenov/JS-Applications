import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { apply, getApplications, getById, getOwnApply, remove } from "../services/jobService.js";

const detailsTemplate = (job, removePost, applyForJob) => html`
<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${job.imageUrl} alt="example1" />
          <p id="details-title">${job.title}</p>
          <p id="details-category">Category: <span id="categories">${job.category}</span></p>
          <p id="details-salary">Salary: <span id="salary-number">${job.salary}</span></p>
          <div id="info-wrapper">
            <div id="details-description">
              <h4>Description</h4>
              <span>${job.description}</span>
            </div>
            <div id="details-requirements">
              <h4>Requirements</h4>
              <span>${job.requirements}</span>
            </div>
          </div>
          <p>Applications: <strong id="applications">${job.applications}</strong></p>

        ${job.isOwner
        ? html`
        <div id="action-buttons">
            <a href="/edit/${job._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${removePost}>Delete</a>
      </div>` : nothing}
      ${job.user && !job.isOwner && job.ownApply
        ? html`
      <div id="action-buttons">
            <a href="javascript:void(0)" id="apply-btn" @click=${applyForJob}>Apply</a>
      </div>` : nothing}
        </div>
</section>`;

export async function detailsView(ctx) {
    const jobId = ctx.params.id;
    const user = ctx.user();
    const [job, applications, ownApply] = await Promise.all([
        getById(jobId), 
        getApplications(jobId), 
        getOwnApply(jobId, user)]);

    job.ownApply = ownApply;    
    job.applications = applications;

    job.user = user;
    if (user) {
        const isOwner = user._id == job._ownerId;
        job.isOwner = isOwner;
    }

    ctx.render(detailsTemplate(job, removePost, applyForJob));

    async function removePost() {
        if (confirm(`Are you sure you want to delete ${job.title}`)) {
            await remove(jobId);
            ctx.page.redirect('/catalog');
        }
    }

    async function applyForJob() {
        const sendApply = await apply({ jobId });
        ctx.page.redirect(`/details/${jobId}`);
    }
}