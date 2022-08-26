const submitBtn = document.getElementById("submit-btn");
const form = document.querySelector("#grocery-form");
const groceryInput = document.getElementById("grocery-input");
const alert = document.querySelector(".alert");
const groceryContainer = document.querySelector(".grocery-container-box")
const groceryUl = document.querySelector(".grocery-ul")
const clearAllBtn = document.querySelector(".clear-all-btn")
//edit option
let editFlag = false;
let editElement;

form.addEventListener("submit", addItem)

function addItem(e){
    e.preventDefault();
    const value = groceryInput.value;
    let id = new Date().getTime().toString();


    if (value === ""){
        displayAlert("Please enter value", "red-alert")
    }else if (value !== "" &&!editFlag) {
        displayAlert("Item added to the list", "green-alert")
        
        groceryContainer.style.visibility = "visible"
        const groceryLi = document.createElement("li");
        groceryLi.setAttribute("id", id)
        const liText = document.createElement("span")
        liText.innerText = value
        liText.classList.add("li-text")
        groceryUl.appendChild(groceryLi)
        groceryInput.value = ""
        const icons = document.createElement("span")
        const iconEdit = document.createElement("i");
        iconEdit.setAttribute("id", id)
        iconEdit.classList.add("fa-solid", "fa-pen-to-square", "list-btn", "edit");
        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa-solid", "fa-trash-can", "list-btn", "delete");
        groceryLi.append(liText, icons);
        icons.append(iconEdit, iconDelete)

        clearAllBtn.addEventListener("click", clearItems)

        iconDelete.addEventListener("click", deleteItem)

        iconEdit.addEventListener("click", editItem)
    }else if (editFlag) {
        displayAlert("Value changed", "green-alert")
        editElement.innerHTML = value;
        submitBtn.innerHTML = "Submit"
        groceryInput.value = ""
        editFlag = false;
    }
}

function displayAlert(text, action){
    alert.style.visibility = "visible"
    alert.innerText = text
    alert.classList.add(action);
    setTimeout(()=>{
        alert.style.visibility = "hidden"
    }, 1000)
}

function clearItems(){
    displayAlert("Empty list", "red-alert")
    setBackToDefault()
}

function deleteItem(e) {
    displayAlert("Item removed", "red-alert")
    const element = e.currentTarget.parentNode.parentNode
    console.log(element)
    groceryUl.removeChild(element)
    if (groceryUl.innerHTML === "") {
        setBackToDefault()
    }
}

function editItem(e) {
    const element = e.currentTarget.parentNode.parentNode;
    editElement = e.currentTarget.parentNode.parentNode.firstChild;
    console.log(element)
    groceryInput.value = editElement.innerText
    submitBtn.innerText = "Edit";
    editFlag = true;
}

function submitBtnAfterEdit(){
    displayAlert("Value changed", "green-alert")

    element.innerText = groceryInput.value
    submitBtn.innerText = "Submit"
    groceryInput.value = ""
}


function setBackToDefault(){
    groceryUl.innerHTML = "";
    groceryContainer.style.visibility = "hidden"
}

