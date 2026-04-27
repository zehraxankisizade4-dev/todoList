// =====================
// ELEMENTLƏR
// =====================
const plus = document.querySelector(".plus");
const add = document.querySelector(".add");
const inputBox = document.querySelector(".inputBox");
const deleteIcon = document.querySelector(".delete");
const sort = document.querySelector(".sort-top-gray");
const input = document.querySelector(".input");
const list = document.querySelector(".list");

// false = A-Z
// true = Z-A
let isDesc = false;


// =====================
// SORT FUNCTION
// =====================
function sortList() {
    let items = Array.from(list.querySelectorAll("li"));

    items.sort((a, b) => {
        let textA = a.querySelector(".text").textContent.trim();
        let textB = b.querySelector(".text").textContent.trim();

        let compareResult = textA.localeCompare(
            textB,
            undefined,
            { sensitivity: "base" }
        );

        return isDesc ? -compareResult : compareResult;
    });

    list.innerHTML = "";
    items.forEach(item => list.appendChild(item));

    sort.src = isDesc
        ? "./images/sort-top-grey.svg"
        : "./images/sort-bottom-grey.svg";
}


// =====================
// INPUT BOX AÇ
// =====================
plus.addEventListener("click", () => {
    inputBox.style.display = "flex";
});


// =====================
// INPUT TƏMİZLƏ
// =====================
deleteIcon.addEventListener("click", () => {
    input.value = "";
});

deleteIcon.addEventListener("mouseover", () => {
    deleteIcon.src = "./images/delete-purple.svg";
});

deleteIcon.addEventListener("mouseout", () => {
    deleteIcon.src = "./images/delete.svg";
});


// =====================
// SORT HOVER
// =====================
sort.addEventListener("mouseover", () => {
    sort.src = isDesc
        ? "./images/sort-top.svg"
        : "./images/sort-bottom.svg";
});

sort.addEventListener("mouseout", () => {
    sort.src = isDesc
        ? "./images/sort-top-grey.svg"
        : "./images/sort-bottom-grey.svg";
});


// =====================
// SORT CLICK
// =====================
sort.addEventListener("click", () => {
    isDesc = !isDesc;
    sortList();
});


// =====================
// ADD ITEM
// =====================
add.addEventListener("click", () => {
    let value = input.value.trim();

    if (!value) return;

    let li = document.createElement("li");

    li.innerHTML = `
        <div class="box">
            <span class="text">${value}</span>
            <div class="tool">
                <img src="./images/edit1.svg" class="edit" alt="edit">
                <img src="./images/delete.svg" class="delete-item" alt="delete">
            </div>
        </div>
    `;

    list.appendChild(li);

    input.value = "";
    inputBox.style.display = "none";

    sortList();
});


// =====================
// ICON HOVER
// =====================
list.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("edit")) {
        e.target.src = "./images/edit2-purple.svg";
    }

    if (e.target.classList.contains("delete-item")) {
        e.target.src = "./images/delete-purple.svg";
    }
});

list.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("edit")) {
        e.target.src = "./images/edit1.svg";
    }

    if (e.target.classList.contains("delete-item")) {
        e.target.src = "./images/delete.svg";
    }
});


// =====================
// DELETE + EDIT + SAVE
// =====================
list.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-item")) {
        e.target.closest("li").remove();
    }

    if (e.target.classList.contains("edit")) {

        let li = e.target.closest("li");
        let textEl = li.querySelector(".text");
        let deleteBtn = li.querySelector(".delete-item");
        let tool = li.querySelector(".tool");

        e.target.style.display = "none";
        deleteBtn.style.display = "none";

        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.classList.add("edit-input");
        editInput.value = textEl.textContent;

        textEl.style.display = "none";
        li.prepend(editInput);

        let saveBtn = document.createElement("img");
        saveBtn.src = "./images/plus.svg";
        saveBtn.classList.add("plus-save");

        tool.prepend(saveBtn);

        editInput.focus();
    }

    if (e.target.classList.contains("plus-save")) {

        let li = e.target.closest("li");
        let editInput = li.querySelector(".edit-input");
        let textEl = li.querySelector(".text");
        let editBtn = li.querySelector(".edit");
        let deleteBtn = li.querySelector(".delete-item");

        if (editInput.value.trim() !== "") {
            textEl.textContent = editInput.value.trim();
        }

        textEl.style.display = "inline";
        editBtn.style.display = "block";
        deleteBtn.style.display = "block";

        editInput.remove();
        e.target.remove();

        sortList();
    }
});