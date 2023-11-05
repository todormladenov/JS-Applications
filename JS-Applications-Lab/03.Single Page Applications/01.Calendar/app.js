import { showYears } from "./yearsView.js";

const sections = document.querySelectorAll('section');

sections.forEach(section => {
    if (section.id != 'years') {
        section.style.display = 'none';
    }
});

showYears();