async function loadStudents() {
    let formElement = document.getElementById('form');
    let tbodyElement = document.querySelector('#results tbody');
    let url = 'http://localhost:3030/jsonstore/collections/students';

    let response = await fetch(url);
    let students = await response.json();

    Object.values(students).forEach(student => {
        let { firstName, lastName, facultyNumber, grade, _id } = student;
        trCreator(firstName, lastName, facultyNumber, grade);
    });

    formElement.addEventListener('submit', addStudent);

    async function addStudent(e) {
        e.preventDefault();
        let formData = getFormData();

        if (!formData) {
            alert('All fields must be fulfilled.')
            return;
        }
 
        let response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(formData)
        });
        let student = await response.json();

        let { firstName, lastName, facultyNumber, grade, _id } = student;
        trCreator(firstName, lastName, facultyNumber, grade);
    }

    function getFormData() {
        let formData = new FormData(formElement);

        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let facultyNumber = formData.get('facultyNumber');
        let grade = formData.get('grade');

        if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
            return;
        }

        return {
            firstName,
            lastName,
            facultyNumber,
            grade
        }
    }

    function trCreator(firstName, lastName, facultyNumber, grade) {
        let tr = document.createElement('tr');
        let firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;

        let lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;

        let facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;

        let gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        tbodyElement.appendChild(tr);
    }
}
loadStudents()