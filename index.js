const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
btn.addEventListener('click', () => {
search.classList.toggle('active')
input.focus()
})

const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];




const closeBox = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const urlTag = document.getElementById("website-url");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

const menuel = document.querySelector(".iconel");

const showbookmark = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let litag = `<li class="note">
                            <div class="details">
                                <p> ${note.title} </p>
                                <p> ${note.url} </p>
                                <span>${note.description}
                                </span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <span>${note.time}</span>
                                <div class="settings">
                                    <i onclick=showMenu(this) class="fa-solid fa-ellipsis iconel"></i>
                                    <ul class="menu">
                                        <li onclick="editNote(${index},'${note.title}','${note.description},${note.url}')"><i class="fa-light fa-pen"></i>Edit</li>
                                        <li onclick="deleteNote(${index})"><i class="fa-duotone fa-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                     </li>`;

    addBox.insertAdjacentHTML("afterend", litag);
  });
};

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.onclick = (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  };
  // console.log(elem)
}

function deleteNote(noteId) {
  notes.splice(noteId, 1);

  localStorage.setItem("notes", JSON.stringify(notes));
  showbookmark();
}

function editNote(noteId, title, description,url) {
  titleTag.value = title;
  urlTag.value = url;
  descTag.value = description;
  addBox.click();

  deleteNote(noteId);
  // console.log(noteId)
}

addBox.onclick = () => popupBox.classList.add("show");
closeBox.onclick = () => {
  titleTag.value = "";
  urlTag.value = "";
  descTag.value = "";
  popupBox.classList.remove("show");
};

addBtn.onclick = (e) => {
  e.preventDefault();
  //    menuel.classList.add('hide-icon')

  let ti = titleTag.value;
  let desc = descTag.value;
  let u = urlTag.value;

  let currentDate = new Date();
  let month = months[currentDate.getMonth()];
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  let ct = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

  let noteInfo = {
    title: ti,
    url : u,
    description: desc,
    date: `${day} ${month} ${year}`,
    time : ct,
  };

  notes.push(noteInfo);

  localStorage.setItem("notes", JSON.stringify(notes));

  closeBox.click();

  //    menuel.classList.remove('hide-icon')
  showbookmark();
};

showbookmark();