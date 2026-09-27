async function speakText() {
  const text = document.getElementById("textarea").value;

  if (text.trim() === "") return;

  try {
    // Saadame teksti TartuNLP tehisintellekti serverisse
    const response = await fetch("https://api.tartunlp.ai/text-to-speech/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        speaker: "Kalev", // Vali sobiv hääl (nt "mari", "kalev" vms)
        speed: 1.0,
      }),
    });

    if (!response.ok) {
      throw new Error("Võrguvigane vastus serverist.");
    }

    // Saame vastuseks helifaili (blob)
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Mängime heli veebilehel välja
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Kõnesünteesi viga:", error);
    alert("Hääle genereerimine ebaõnnestus.");
  }
}
