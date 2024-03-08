import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://new-project-b4dff-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "books");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-btn");
const listAdd = document.getElementById("list");
const fromInputEl = document.getElementById("from-input");
const toInputEl = document.getElementById("to-input");

addButtonEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value;
    let fromValue = fromInputEl.value;
    let toValue = toInputEl.value;

    push(listInDB, {
         message: inputValue,
         from: fromValue, to: toValue 
    });

    clearInputFields();
});

onValue(listInDB, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        clearList();
        Object.values(data).forEach((item) => {
            appendList(item);
        });
    }
});

function clearList() {
    listAdd.innerHTML = "";
}

function clearInputFields() {
    inputFieldEl.value = "";
    fromInputEl.value = "";
    toInputEl.value = "";
}

function appendList(item) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");    
    messageBox.innerHTML = `
    <p><strong>From:</strong> ${item.from}</p>
    <p class="message">${item.message}</p>
    <p><strong>To:</strong> ${item.to} <i class="fa-solid fa-heart"></i> </p>`
    listAdd.appendChild(messageBox);
}



