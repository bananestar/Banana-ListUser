/*
 * Created on Thu Jun 09 2022 13:32:36
 *
 * Copyright (c) 2022 Simon Vander Linden
 */

// user = [
//     {
//         lastname: 'lastname',
//         firstname: 'firstname',
//         email : 'email'
//     }
// ]

const bodyEl = document.getElementById("apps");
const btnAddUser = document.getElementById("btnAddUser");
const btnFormCreate = document.getElementById("btnFormCreate");

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.length == 0) {
    addUserForm();
  }

  btnFormCreate.addEventListener("click", function () {
    addUserForm();
  });

  btnAddUser.addEventListener("click", function () {
    addUser();
    listUser();
  });

  if (localStorage.length >= 1) {
    listUser();
  }
});

function addUserForm() {
  const formEl = document.createElement("form");

  const fnameDiv = document.createElement("div");
  const lnameDiv = document.createElement("div");
  const emailDiv = document.createElement("div");

  const fnameLabel = document.createElement("label");
  const lnameLabel = document.createElement("label");
  const emailLabel = document.createElement("label");

  const fnameInput = document.createElement("input");
  const lnameInput = document.createElement("input");
  const emailInput = document.createElement("input");

  btnAddUser.style.display = "block";
  btnFormCreate.style.display = "none";

  bodyEl.textContent = "";

  formEl.setAttribute("method", "POST");

  //DIV
  fnameDiv.classList.add("form-group");
  lnameDiv.classList.add("form-group");
  emailDiv.classList.add("form-group");

  //First Name
  fnameLabel.setAttribute("for", "fname");
  fnameLabel.textContent = "First name:";

  fnameInput.classList.add("form-control");
  fnameInput.setAttribute("type", "text");
  fnameInput.setAttribute("id", "fname");
  fnameInput.setAttribute("placeholder", "First name");
  fnameInput.required = true;

  //Last Name
  lnameLabel.setAttribute("for", "lname");
  lnameLabel.textContent = "Last name:";

  lnameInput.classList.add("form-control");
  lnameInput.setAttribute("type", "text");
  lnameInput.setAttribute("id", "lname");
  lnameInput.setAttribute("placeholder", "Last name");
  lnameInput.required = true;

  //Email
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email:";

  emailInput.classList.add("form-control");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("placeholder", "votre_email@gmail.com");
  emailInput.required = true;

  //ADD TO HTML
  fnameDiv.appendChild(fnameLabel);
  fnameDiv.appendChild(fnameInput);

  lnameDiv.appendChild(lnameLabel);
  lnameDiv.appendChild(lnameInput);

  emailDiv.appendChild(emailLabel);
  emailDiv.appendChild(emailInput);

  formEl.appendChild(fnameDiv);
  formEl.appendChild(lnameDiv);
  formEl.appendChild(emailDiv);
  //   formEl.appendChild(btnSubmit);

  bodyEl.appendChild(formEl);
}

function addUser() {
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");

  if (fname.value == "") {
    addUserForm();
    alert("first name is null");
  }
  if (lname.value == "") {
    addUserForm();
    alert("last name is null");
  }
  if (email.value == "") {
    addUserForm();
    alert("email is null");
  }

  if (fname.value != "" || lname.value != "" || email.value != "") {
    const user = {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
    };

    const jsonObj = JSON.stringify(user);

    let idUser =
      lname.value.replace(/\s+/g, "") + fname.value.replace(/\s+/g, "");

    localStorage.setItem(idUser, jsonObj);
  }
}

function listUser() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const trTitle = document.createElement("tr");
  const thTitleBlank = document.createElement("th");
  const thTitleFname = document.createElement("th");
  const thTitleLname = document.createElement("th");
  const thTitleEmail = document.createElement("th");
  const thTitleAction = document.createElement("th");

  let nb = 0;

  bodyEl.textContent = "";

  btnFormCreate.style.display = "block";
  btnAddUser.style.display = "none";

  table.classList.add("table", "table-dark");

  thTitleBlank.setAttribute("scope", "col");
  thTitleBlank.textContent = "#";

  thTitleFname.setAttribute("scope", "col");
  thTitleFname.textContent = "First Name";

  thTitleLname.setAttribute("scope", "col");
  thTitleLname.textContent = "Last Name";

  thTitleEmail.setAttribute("scope", "col");
  thTitleEmail.textContent = "Email";

  thTitleAction.setAttribute("scope", "col");
  thTitleAction.textContent = "Action";

  trTitle.appendChild(thTitleBlank);
  trTitle.appendChild(thTitleFname);
  trTitle.appendChild(thTitleLname);
  trTitle.appendChild(thTitleEmail);
  trTitle.appendChild(thTitleAction);

  thead.appendChild(trTitle);
  table.appendChild(thead);

  Object.keys(localStorage).forEach(function (key) {
    const parsedObj = JSON.parse(localStorage.getItem(key));

    const tr = document.createElement("tr");
    const thBlank = document.createElement("th");
    const thFname = document.createElement("th");
    const thLname = document.createElement("th");
    const thEmail = document.createElement("th");
    const thAction = document.createElement("th");

    const btnInfo = document.createElement("button");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");

    btnInfo.setAttribute("type", "button");
    btnEdit.setAttribute("type", "button");
    btnDelete.setAttribute("type", "button");

    btnInfo.classList.add("btn", "btn-info");
    btnEdit.classList.add("btn", "btn-warning");
    btnDelete.classList.add("btn", "btn-danger");

    btnInfo.id = "btnInfo";
    btnEdit.id = "btnEdit";
    btnDelete.id = "btnDelete";

    btnInfo.textContent = "Info";
    btnEdit.textContent = "Edit";
    btnDelete.textContent = "Delete";

    btnInfo.onclick = () => {
      infoUser(key);
    };

    btnEdit.onclick = () => {
      editUser(key);
    };

    btnDelete.onclick = () => {
      deleteUser(key);
    };

    nb++;

    thBlank.setAttribute("scope", "row");
    thBlank.textContent = nb;

    thFname.textContent = parsedObj.fname;
    thLname.textContent = parsedObj.lname;
    thEmail.textContent = parsedObj.email;

    thAction.appendChild(btnInfo);
    thAction.appendChild(btnEdit);
    thAction.appendChild(btnDelete);

    tr.appendChild(thBlank);
    tr.appendChild(thFname);
    tr.appendChild(thLname);
    tr.appendChild(thEmail);
    tr.appendChild(thAction);

    tbody.appendChild(tr);

    console.log(localStorage.getItem(key));
  });

  table.appendChild(tbody);

  bodyEl.appendChild(table);
}

function deleteUser(key) {
  localStorage.removeItem(key);

  if (localStorage.length == 0) {
    addUserForm();
  } else {
    listUser();
  }
}

function editUser(key) {
  const formEl = document.createElement("form");

  const fnameDiv = document.createElement("div");
  const lnameDiv = document.createElement("div");
  const emailDiv = document.createElement("div");

  const fnameLabel = document.createElement("label");
  const lnameLabel = document.createElement("label");
  const emailLabel = document.createElement("label");

  const fnameInput = document.createElement("input");
  const lnameInput = document.createElement("input");
  const emailInput = document.createElement("input");

  btnAddUser.style.display = "block";
  btnFormCreate.style.display = "none";

  bodyEl.textContent = "";

  const str = localStorage.getItem(key);
  const parsedObj = JSON.parse(str);

  formEl.setAttribute("method", "POST");

  //DIV
  fnameDiv.classList.add("form-group");
  lnameDiv.classList.add("form-group");
  emailDiv.classList.add("form-group");

  //First Name
  fnameLabel.setAttribute("for", "fname");
  fnameLabel.textContent = "First name:";

  fnameInput.classList.add("form-control");
  fnameInput.setAttribute("type", "text");
  fnameInput.setAttribute("id", "fname");
  fnameInput.setAttribute("placeholder", "First name");
  fnameInput.setAttribute("value", parsedObj.fname);
  fnameInput.required = true;

  //Last Name
  lnameLabel.setAttribute("for", "lname");
  lnameLabel.textContent = "Last name:";

  lnameInput.classList.add("form-control");
  lnameInput.setAttribute("type", "text");
  lnameInput.setAttribute("id", "lname");
  lnameInput.setAttribute("placeholder", "Last name");
  lnameInput.setAttribute("value", parsedObj.lname);
  lnameInput.required = true;

  //Email
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email:";

  emailInput.classList.add("form-control");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("placeholder", "votre_email@gmail.com");
  emailInput.setAttribute("value", parsedObj.email);
  emailInput.required = true;

  //ADD TO HTML
  fnameDiv.appendChild(fnameLabel);
  fnameDiv.appendChild(fnameInput);

  lnameDiv.appendChild(lnameLabel);
  lnameDiv.appendChild(lnameInput);

  emailDiv.appendChild(emailLabel);
  emailDiv.appendChild(emailInput);

  formEl.appendChild(fnameDiv);
  formEl.appendChild(lnameDiv);
  formEl.appendChild(emailDiv);

  bodyEl.appendChild(formEl);

  localStorage.removeItem(key);
}

function infoUser(key) {
  const divUser = document.createElement("div");
  const hUser = document.createElement("h4");
  const btnList = document.createElement("button");
  const btnEdit = document.createElement("button");
  const btnDelete = document.createElement("button");

  const str = localStorage.getItem(key);
  const parsedObj = JSON.parse(str);

  btnAddUser.style.display = "none";
  btnFormCreate.style.display = "none";

  bodyEl.textContent = "";

  hUser.textContent =
    parsedObj.lname + " " + parsedObj.fname + " " + parsedObj.email;

  divUser.appendChild(hUser);

  btnList.setAttribute("type", "button");
  btnEdit.setAttribute("type", "button");
  btnDelete.setAttribute("type", "button");

  btnList.classList.add("btn", "btn-info");
  btnEdit.classList.add("btn", "btn-warning");
  btnDelete.classList.add("btn", "btn-danger");

  btnList.id = "btnList";
  btnEdit.id = "btnEdit";
  btnDelete.id = "btnDelete";

  btnList.textContent = "List";
  btnEdit.textContent = "Edit";
  btnDelete.textContent = "Delete";

  btnList.onclick = () => {
    listUser();
  };

  btnEdit.onclick = () => {
    editUser(key);
  };

  btnDelete.onclick = () => {
    deleteUser(key);
  };

  divUser.appendChild(btnList);
  divUser.appendChild(btnEdit);
  divUser.appendChild(btnDelete);

  bodyEl.appendChild(divUser);
}
