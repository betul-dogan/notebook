const notesContainer = document.getElementById("notesContainer");
const floatingTextarea = document.getElementById("floatingTextarea");
const addNoteBtn = document.getElementById("addNoteBtn");

// load notes
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => createNoteElement(note.text, note.color));
}

// save notes
function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note").forEach((note) => {
    notes.push({
      text: note.textContent.replace("🗑", "").trim(),
      color: note.style.backgroundColor,
    });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// create note element
  function createNoteElement(text) {
  const col = document.createElement("div");
  col.className = "col-md-3";

  const note = document.createElement("div");
  note.className = "note";
  note.textContent = text;

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "bi bi-trash delete-icon";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.addEventListener("click", () => {
    col.remove();
    saveNotes();
  });

  note.appendChild(deleteIcon);
  col.appendChild(note);
  notesContainer.appendChild(col);
}

// Not ekleme
function addNote() {
  const text = floatingTextarea.value.trim();
  if (text) {
    createNoteElement(text);
    saveNotes();
    floatingTextarea.value = "";
    floatingTextarea.focus();
  }
}

// Olay dinleyicileri
addNoteBtn.addEventListener("click", addNote);

floatingTextarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addNote();
  }
});

// Sayfa yüklendiğinde notları getir
loadNotes();
