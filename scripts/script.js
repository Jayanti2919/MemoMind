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
            <button id="deleteNote_${index}" class="deleteBtn">Delete</button>
            <button id="editNote_${index}" class="editBtn">Edit</button>
        `;
    notesContainer.appendChild(noteElement);
  });

  // Add event listeners for the newly created buttons
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
  // Scrape the text from the webpage (e.g., from all paragraphs)
  let textContent = Array.from(document.querySelectorAll('p')).map(p => p.textContent).join(' ');
  console.log(textContent);

 // Send the scraped text to the summarization API
  // let response = await fetch('https://api-inference.huggingface.co/models/Falconsai/text_summarization', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer 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'  // Replace with your actual API key
  //   },
  //   body: JSON.stringify({ text: textContent })
  // });

  // if (response.ok) {
  //   let result = await response.json();
  //   displaySummary(result.summary);
  // } else {
  //   console.error('Failed to summarize text:', response.statusText);
  // }
}

function displaySummary(summary) {
  let summaryContainer = document.getElementById('summary');
  summaryContainer.innerHTML = `<h2>Summary</h2><p>${summary}</p>`;
}

//document.getElementById("summarizeBtn").addEventListener("click", summarizeText);

document.getElementById("addNoteBtn").addEventListener("click", addNote);
document.getElementById("summarizeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: summarizeText
    });
  });
});


displayNotes();
