// On Page Load: Check if there is a note in the URL
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('data')) {
    document.getElementById('setup-view').style.display = "none";
    document.getElementById('locked-view').style.display = "block";
  }
};

function generateLink() {
  const note = document.getElementById('note-input').value;
  const pass = document.getElementById('pass-input').value;

  if (!note || !pass) {
    alert("Enter a note and password!");
    return;
  }

  // Combine note and password with a separator, then encode to Base64
  const combined = btoa(encodeURIComponent(note + "|||" + pass));
  
  // Create the new URL
  const newUrl = window.location.origin + window.location.pathname + "?data=" + combined;
  
  document.getElementById('share-url').value = newUrl;
  document.getElementById('setup-view').style.display = "none";
  document.getElementById('share-view').style.display = "block";
}

function copyLink() {
  const copyText = document.getElementById("share-url");
  copyText.select();
  document.execCommand("copy");
  alert("Link copied! Send this to your friend.");
}

function unlockNote() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get('data');
  const enteredPass = document.getElementById('unlock-pass').value;
  
  try {
    // Decode the data
    const decoded = decodeURIComponent(atob(encodedData));
    const [originalNote, originalPass] = decoded.split("|||");

    if (enteredPass === originalPass) {
      document.getElementById('unlock-pass').style.display = "none";
      document.querySelector('.unlock-btn')?.remove(); // clean up button
      document.getElementById('reveal-area').innerText = originalNote;
      document.getElementById('reveal-area').style.display = "block";
      document.getElementById('vault-icon').innerText = "🔓";
    } else {
      document.querySelector('.vault-card').classList.add('shake');
      setTimeout(() => document.querySelector('.vault-card').classList.remove('shake'), 400);
    }
  } catch (e) {
    alert("Invalid Link!");
  }
}
