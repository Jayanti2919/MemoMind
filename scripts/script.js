let notes = [];
console.log(notes);

const apiKey = ['hf_JDozXGnFQLbMUM','bFuaceYtykdLpSTplhVG']

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
            <button id="deleteNote_${index}" class="deleteBtn">Delete</button>
            <button id="editNote_${index}" class="editBtn">Edit</button>
        `;
    notesContainer.appendChild(noteElement);
  });

  notes.forEach((note, index) => {
    document
      .getElementById(`deleteNote_${index}`)
      .addEventListener("click", deleteNote);
    document
      .getElementById(`editNote_${index}`)
      .addEventListener("click", editNote);
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

async function summarizeText() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(apiKey.join(''))
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['scripts/content.js']
    }, () => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'scrapeAndSummarize',
        apiUrl: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        apiKey: apiKey.join('')
      }, (response) => {
        if (response && response.summary) {
          displaySummary(response.summary);
        } else {
          console.error('Failed to get summary.');
        }
      });
    });
  });
}

function displaySummary(summary) {
  let summaryContainer = document.getElementById('summary');
  summaryContainer.innerHTML = `<h2>Summary</h2><p>${summary}</p>`;
}

document.getElementById("addNoteBtn").addEventListener("click", addNote);
document.getElementById("summarizeBtn").addEventListener("click", summarizeText);

displayNotes();
