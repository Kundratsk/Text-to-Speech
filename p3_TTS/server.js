const express = require("express");
const cors = require("cors");

const app = express();

// Lubame sinu kohalikul veebilehel (Live Serveril) selle serveriga suhelda
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

// Vahenduspunkt brauseri ja TartuNLP vahel
app.post("/tts", async (req, res) => {
  try {
    const response = await fetch("https://api.tartunlp.ai/text-to-speech/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).send("TartuNLP serveri tõrge");
    }

    // Suuname saadud helifaili otse brauserile tagasi
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set("Content-Type", "audio/wav");
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Sisemine serveri viga");
  }
});

app.listen(3000, () => {
  console.log("Vaheserver käivitus pordil 3000. Jäta see aken avatuks!");
});
