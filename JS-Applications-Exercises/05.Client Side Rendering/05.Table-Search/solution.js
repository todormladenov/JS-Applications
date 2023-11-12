import { html, render } from "../node_modules/lit-html/lit-html.js";

document.querySelector('#searchBtn').addEventListener('click', onClick);
const tbody = document.querySelector('tbody');
const searchField = document.getElementById('searchField');
const url = 'http://localhost:3030/jsonstore/advanced/table';

async function getStudents() {
   let response = await fetch(url);
   let students = await response.json();

   return Object.values(students);
}
const trTemplate = (students, match) => html`${students.map(student => html`
   <tr data-id=${student._id} class=${match && isMatched(student, match) ? 'select' : ''}>
      ${tdTemplate(student)}
   </tr>`)}`;

const tdTemplate = (student) => html`
         <td>${student.firstName} ${student.lastName}</td>
         <td>${student.email}</td>
         <td>${student.course}</td>`;

let students = await getStudents();
render(trTemplate(students), tbody);

function isMatched(student, match) {
   let studentArr = Object.values(student);
   let foundMatch = studentArr.find(x => x.toLowerCase().includes(match));

   if (foundMatch) {
      return true;
   }
   return false;
}

function onClick() {
   let match = searchField.value.toLowerCase();
   render(trTemplate(students, match), tbody);
   searchField.value = '';
}
