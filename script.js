document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
});

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const noteText = document.getElementById('noteInput').value;

  const res = await fetch('api/saveNote.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: noteText })
  });

  const resText = await res.text();
  console.log('RAW POST RESPONSE:', resText);

  let result = {};
  try {
    result = JSON.parse(resText);
    console.log(result);
  } catch (err) {
    console.error('POST JSON PARSE ERROR:', err);
  }

  document.getElementById('noteInput').value = '';
  loadNotes();
});

async function loadNotes() {
  const res = await fetch('api/getNotes.php');
  const text = await res.text();
  // console.log('RAW GET RESPONSE:', text);

  let notes = [];
  try {
    notes = JSON.parse(text);
  } catch (err) {
    console.error('JSON PARSE ERROR:', err);
    return; // don't continue if parsing failed
  }

  const container = document.getElementById('notesContainer');
  container.innerHTML = '';

  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <p>${note.text}</p>
      <div class="littletxt">
        <small class="tstmp">${new Date(note.timestamp * 1000).toLocaleString()}</small><br>
        <small class="analys">Words: ${note.analysis?.word_count ?? '-'} | Longest: "${note.analysis?.longest_word ?? '-'}"</small>
      </div>
        <div class="btns">
        <a href="#" class="btn edit-btn" data-id="${note.id}">Edit</a>
        <a href="#" class="btn delete-btn" data-id="${note.id}">Remove</a>
      </div>
    `;
    container.prepend(div);
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Yoo I was clicked!");
      const id = btn.getAttribute('data-id');
      const noteText = btn.closest('.card').querySelector('p').textContent;
      showEditModal(id, noteText);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showConfirmButton: false,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: "Delete",
      }).then(async (result) => {
        if (result.isDenied) {
          Swal.fire("Deleted", "Your note has been deleted", "success");
          const id = btn.getAttribute('data-id');

          const res = await fetch('api/deleteNote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });

          const result = await res.json();
          console.log('DELETE RESULT:', result);
          loadNotes(); // Reload
        } else {
          Swal.fire("Cancelled", "Your note is safe", "error");
        }
      });
    });
  });
}

function showEditModal(id, currentText) {
  const modal = document.getElementById('editModal');
  const textarea = document.getElementById('editTextarea');
  const saveBtn = document.getElementById('saveEditBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  textarea.value = currentText;
  modal.style.display = 'block';
  saveBtn.dataset.id = id;

  saveBtn.onclick = async () => {
    const newText = textarea.value;
    await fetch('api/editNote.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text: newText })
    });
    modal.style.display = 'none';
    Swal.fire({
      title: 'Saved!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
      position: 'top-end'
    });
    loadNotes();
  };
  cancelBtn.onclick = () => {modal.style.display='none'}
}

/* GOING NOW TO MINOR JS (LINKS, TOGGLES) */
var homeLink = document.getElementById("lk_home");
var notesLink = document.getElementById("lk_notes");
var helpLink = document.getElementById("lk_help");

// Not working by now:
notesLink.addEventListener("click", () => {
  Swal.fire("Not working... yet.", "I will soon update this link so it works!", "error");
});

helpLink.addEventListener("click", () => {
  Swal.fire("Not working... yet.", "I will soon update this link so it works!", "error");
})