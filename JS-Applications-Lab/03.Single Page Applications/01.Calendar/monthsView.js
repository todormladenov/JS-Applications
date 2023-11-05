export function showDays(yearSection, currentYear){
    
    yearSection.addEventListener('click', (e) => {
        if (e.target.tagName == 'TD') {
            const months = Array.from(yearSection.querySelectorAll('div'));
            const currMonth = months.find(month => month.textContent.trim() == e.target.textContent.trim());
            let monthNumber = months.indexOf(currMonth) + 1;
            let monthSection = document.getElementById(`month-${currentYear}-${monthNumber}`)
            yearSection.style.display = 'none';
            monthSection.style.display = 'block';
        }
    });
}