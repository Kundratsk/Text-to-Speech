function speakText() {
  const text = document.getElementById("textarea").value;
  // Check if the text is not empty before speaking
  if (text.trim() !== "") {
    //Pean leidma parema hääle ja viisi, et ta räägiks sujuvamalt
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }
}
