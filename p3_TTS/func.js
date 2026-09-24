function speakText() {
    const text = document.getElementById('textarea').value;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}