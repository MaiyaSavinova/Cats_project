const block = document.querySelector(".wrapper");
const addBtn = document.querySelector(".add");
const mdBox = document.querySelector(".modal-block");
const mdClose = mdBox.querySelector(".modal-close");
// const mdClose = mdBox.firstElementChild;
/*const blockShow = document.querySelector(".btn-eye");
const catModal = document.querySelector(".modal-block-cat"); */

const addForm = document.forms.add;
const prevTag = addForm.querySelector(".preview");

let name = "maiya_sav";
let path = `https://cats.petiteweb.dev/api/single/${name}`;

/*
    JSON.stringify(obj) => преобразует объект в строку
    JSON.parse(str) => преобразует строку в объект
*/

let pets = localStorage.getItem("maiya_sav");
// let pets = localStorage.getItem("unic");
if (pets) {
    try {
        pets = JSON.parse(pets);
        for (let pet of pets) {
            createCard(pet, block);
        }
    } catch(err) {
        console.warn(err.message);
        pets = null;
    }
}
console.log("pets", pets);