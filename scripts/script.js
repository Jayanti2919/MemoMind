let notes = [];
console.log(notes);

function addNote() {
  let noteText = document.getElementById("noteInput").value.trim();
  if (noteText !== "") {
    notes.push(noteText);
    displayNotes();
    document.getElementById("noteInput").value = "";
  }
  console.log(notes);
}

function displayNotes() {
  let notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    let noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
            <span>${note}</span>
            <button id="deleteNote_${index}">Delete</button>
            <button id="editNote_${index}">Edit</button>
        `;
    notesContainer.appendChild(noteElement);
  });
}

function deleteNote() {
  let index = this.id.split("_")[1];
  console.log("Called deleteNote", index, notes[index]);
  notes.splice(index, 1);
  displayNotes();
}

function editNote() {
  let index = this.id.split("_")[1];
  console.log("Called editNote", index, notes[index]);
  let newText = prompt("Edit Note:", notes[index]);
  if (newText !== null) {
    notes[index] = newText.trim();
    displayNotes();
  }
}

document.getElementById("addNoteBtn").addEventListener("click", addNote);

notes.forEach((note, index) => {
  document
    .getElementById(`editNote_${index}`)
    .addEventListener("click", editNote);
});
notes.forEach((note, index) => {
  document
    .getElementById(`deleteNote_${index}`)
    .addEventListener("click", deleteNote);
});

displayNotes();
