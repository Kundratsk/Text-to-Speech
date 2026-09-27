let currentAudio = null;

async function speakText() {
  const textarea = document.getElementById("textarea");
  let text = textarea.value;

  if (text.trim() === "") return;

  // Kursori asukoha kontrollimine
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;

  if (startPos !== endPos) {
    text = text.substring(startPos, endPos);
  } else if (startPos > 0) {
    text = text.substring(startPos);
  }

  if (text.trim() === "") return;

  // Peatame eelmise heli, kui see juba mängib
  stopText();

  try {
    // Teeme päringu omaenda turvalisse vaheserverisse
    const response = await fetch("http://localhost:3000/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        speaker: "mari",
        speed: 0.95,
      }),
    });

    if (!response.ok) {
      throw new Error(`Serveri viga: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    currentAudio = new Audio(audioUrl);
    currentAudio.play();
  } catch (error) {
    console.error("Kõnesünteesi viga:", error);
    alert(
      `Hääle genereerimine ebaõnnestus. Kontrolli, kas node server.js töötab!`,
    );
  }
}

function stopText() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}
