import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getDonations, getOwnDonation, getPetById, removePet, sendDonation } from "../services/petService.js";

const detailsTemplate = (pet, deleteHandler, donateHandler) => html`<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${pet.donation * 100}$</h4>
        </div>
        ${pet.isOwner
        ? html`
        <div class="actionBtn">
            <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a href="javascript:void(0)" class="remove" @click=${deleteHandler}>Delete</a>
        </div>`
        : (pet.user && pet.ownDonation ? html`
        <div class="actionBtn">
            <a href="javascript:void(0)" class="donate" @click=${donateHandler}>Donate</a>
        </div>`
            : nothing)}
        
    </div>
</div>
</section>`;

export async function detailsView(ctx) {
    const petId = ctx.params.id;
    const user = ctx.user();
    const [pet, donation, ownDonation] = await Promise.all([
        getPetById(petId),
        getDonations(petId),
        getOwnDonation(petId, user)]);

    pet.donation = donation;
    pet.ownDonation = ownDonation;

    pet.user = user;
    if (user) {
        pet.isOwner = user._id == pet._ownerId;
    }

    ctx.render(detailsTemplate(pet, deleteHandler, donateHandler));

    async function deleteHandler() {
        if (confirm(`Are you sure you want to delete ${pet.name}`)) {
            await removePet(petId);
            ctx.page.redirect('/dashboard');
        }
    }

    async function donateHandler() {
        await sendDonation({ petId });
        ctx.page.redirect(`/details/${petId}`);
    }
}