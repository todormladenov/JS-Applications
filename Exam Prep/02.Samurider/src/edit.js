import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createEditRequest, getItemById } from "./requests.js";

const root = document.getElementById('root');

const editTemplate = (onSubmit, itemData) => html`
<section id="edit">
<h2>Edit Motorcycle</h2>
<div class="form" @submit=${onSubmit}>
  <h2>Edit Motorcycle</h2>
  <form class="edit-form">
    <input type="text" name="model" id="model" placeholder="Model" .value=${itemData.model}/>
    <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" .value=${itemData.imageUrl}/>
    <input type="number" name="year" id="year" placeholder="Year" .value=${itemData.year}/>
    <input type="number" name="mileage" id="mileage" placeholder="mileage" .value=${itemData.mileage}/>
    <input type="number" name="contact" id="contact" placeholder="contact" .value=${itemData.contact}/>
    <textarea id="about" name="about" placeholder="about" rows="10" cols="50">${itemData.about}</textarea>
    <button type="submit">Edit Motorcycle</button>
  </form>
</div>
</section>`;

export async function viewEdit(ctx) {
  const itemData = await getItemById(ctx.params.id);
  render(editTemplate(onSubmit, itemData), root);

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const year = formData.get('year');
    const mileage = formData.get('mileage');
    const contact = formData.get('contact');
    const about = formData.get('about');

    try {
      if (model == '' || imageUrl == '' || year == '' || mileage == '' || contact == '' || about == '') {
        throw new Error('Fields are required!');
      }

      await createEditRequest({ model, imageUrl, year, mileage, contact, about }, ctx.params.id);
      e.target.reset();
      ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (err) {
      return alert(err.message);
    }
  }
}