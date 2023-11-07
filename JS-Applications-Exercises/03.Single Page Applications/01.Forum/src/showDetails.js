const mainElement = document.querySelector('main');
const detailsElement = document.querySelector('.details-view');

export function showDetails(){
    mainElement.replaceChildren(detailsElement);
}