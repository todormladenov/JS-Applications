import { html } from "../../node_modules/lit-html/lit-html.js";
import { getPetById, updatePet } from "../services/petService.js";
import { createSubmitHandler } from "../services/utils.js";

const editTemplate = (pet, onSubmit) => html`
<section id="editPage">
<form class="editForm" @submit=${onSubmit}>
    <img src=${pet.image}>
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" .value=${pet.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" .value=${pet.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" .value=${pet.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" .value=${pet.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" .value=${pet.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`;

export async function editView(ctx){
    const pet = await getPetById(ctx.params.id);
    ctx.render(editTemplate(pet, createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, event){
    try {
        const emptyField = Object.values(data).some(f => f.trim() == '');
        if (emptyField) {
            throw new Error('All fields are required!');
        }

        await updatePet(ctx.params.id, data);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (error) {
        return alert(error.message);
    }
}