console.log("testing ");

function addTodo() {
  let todoTitle = document.getElementById("titleTxt");
  let todoTxt = document.getElementById("todoTxt");
  if (todoTxt.value && todoTitle.value !== "") {
    var key = firebase.database().ref("todos").push().key;

    var todo = {
      todoTitle: todoTitle.value,
      todoTxt: todoTxt.value,
      key: key,
    };

    firebase.database().ref(`todos/${key}`).set(todo);
    todoTitle.value = "";
    todoTxt.value = "";
  } else {
    alert("please fill both input fields");
  }
}

let addBtn = document.getElementById("addTxt");

addBtn.addEventListener("click", addTodo);

firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    let notes = document.getElementById("notesArea");

    if (notes.innerHTML != "") {
      let html = "";
      html = ` 
            
            
 
            
  <div class="my-3 mx-2  ">
      <div class="card" style="width: 18rem;">
 
          <div class="card-body">
              <h5 class="card-title">${data.val().todoTitle}</h5>
              <p class="card-text">${data.val().todoTxt}</p>
              <button type="button" class="btn btn-primary" id="${
                data.val().key
              }" onclick="todoDel(this)">Delete</button>
              <button type="button" class="btn btn-primary" id="${
                data.val().key
              }" onclick="editTodo(this)">Edit</button>
          </div>
      </div>
 
  </div>
 `;

      notes.innerHTML += html;
    } else {
      notes.innerText = "please add notes";
    }
  });

function todoDel(e) {
  firebase.database().ref("todos").child(e.id).remove();

  console.log(e.parentNode.parentNode.parentNode.remove());
}

function editTodo(e) {
  let editText = e.parentElement.childNodes[3].innerText;
  let chngText = prompt("Edit Todo", editText);
  e.parentElement.childNodes[3].innerText = chngText;

  let todoEdit = {
    todoTxt: chngText,
    key: e.id,
  };
  firebase.database().ref(`todos/${e.id}`).set(todoEdit);
}
