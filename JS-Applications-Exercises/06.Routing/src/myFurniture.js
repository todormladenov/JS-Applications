import { render, html } from "../node_modules/lit-html/lit-html.js";
import { getMyFurniture } from "./requests.js";

const container = document.querySelector('.container');
const user = JSON.parse(localStorage.getItem('user'));

const myFurnitureTemplate = (furnitureData) => html`
<div class="row space-top">
<div class="col-md-12">
    <h1>My Furniture</h1>
    <p>Select furniture from the catalog to view details.</p>
</div>
</div>
<div class="row space-top">${furnitureData.map(item => furnitureTemplate(item))}</div>`;

const furnitureTemplate = (itemData) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${itemData.img}" />
                <p>${itemData.description}</p>
                <footer>
                    <p>Price: <span>${itemData.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${itemData._id}" class="btn btn-info">Details</a>
                </div>
        </div>
</div>`;

export async function showMyFurniture(cxt){
    cxt.updateNav();
    const myFurniture = await getMyFurniture(user._id)
    render(myFurnitureTemplate(myFurniture), container);
}
