import { html } from "../../node_modules/lit-html/lit-html.js";
import { createComment } from "../services/comentsService.js";

export const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}.</p>
</li>`;

export const commentsFormTemplate = (onSubmit) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form class="form" @submit=${onSubmit}>
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`;

export async function onSubmit(ctx, data, event) {
    try {
        if (data.comment.trim() == '') {
            throw new Error('All fields are required!');
        }

        await createComment(ctx.params.id, data.comment);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (error) {
        return alert(error.message);
    }
}