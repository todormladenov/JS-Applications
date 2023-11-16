import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createRequest } from "./requests.js";

const root = document.getElementById('root');

const createTemplate = (onSubmit) => html`
<section id="create">
    <h2>Add Motorcycle</h2>
  <div class="form">
    <h2>Add Motorcycle</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="model" id="model" placeholder="Model" />
        <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
        <input type="number" name="year" id="year" placeholder="Year" />
        <input type="number" name="mileage" id="mileage" placeholder="mileage" />
        <input type="text" name="contact" id="contact" placeholder="contact" />
        <textarea id="about" name="about" placeholder="about" rows="10" cols="50"></textarea>
        <button type="submit">Add Motorcycle</button>
      </form>
  </div>
</section>`;

export function viewCreate(ctx) {
  ctx.updateNavBar();
  render(createTemplate(onSubmit), root);

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

      await createRequest({ model, imageUrl, year, mileage, contact, about });
      e.target.reset();
      ctx.page.redirect('/catalog');
    } catch (err) {
      return alert(err.message);
    }
  }
}