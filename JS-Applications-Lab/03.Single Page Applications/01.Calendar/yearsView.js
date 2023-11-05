import { showDays } from "./monthsView.js";

export function showYears() {
    const yearsSection = document.getElementById('years');

    yearsSection.addEventListener('click', (e) => {
        if (e.target.tagName == 'TD') {
            const currentYear = e.target.textContent.trim();
            const yearSection = document.getElementById(`year-${currentYear}`);
            yearsSection.style.display = 'none';
            yearSection.style.display = 'block';

            showDays(yearSection, currentYear);
        }
    });
}