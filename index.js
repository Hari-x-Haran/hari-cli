#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const args = process.argv.slice(2);

const command = args[0];
const projectName = args[1];

if (command === "vino") {
  if (!projectName) {
    console.log("❌ Please provide a project name.");
    console.log("Example: hari vino myproject");
    process.exit();
  }

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`❌ Folder "${projectName}" already exists.`);
    process.exit();
  }

  // Create folders
  fs.mkdirSync(projectPath);
  fs.mkdirSync(path.join(projectPath, "css"));
  fs.mkdirSync(path.join(projectPath, "js"));
  fs.mkdirSync(path.join(projectPath, "public"));
  fs.mkdirSync(path.join(projectPath, "pages"));

  // ================= HTML =================

  fs.writeFileSync(
    path.join(projectPath, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Hari ♥ Vino</title>

  <link rel="stylesheet" href="./css/style.css">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
</head>

<body>

  <div class="noise"></div>

  <div class="background"></div>

  <div class="hearts"></div>

  <main class="hero">

    <div class="glow glow-one"></div>
    <div class="glow glow-two"></div>

    <section class="content">

      <p class="subtitle">
        A STORY WRITTEN IN THE STARS
      </p>

      <h1>
        Hari
        <span>♥</span>
        Vino
      </h1>

      <div class="line"></div>

      <p class="description">
        Some stories are not written with ink.
        <br>
        They are written with moments, memories,
        and two hearts finding their way back to each other.
      </p>

      <button id="enterBtn">
        Enter Our Story
      </button>

    </section>

  </main>

  <script src="./js/script.js"></script>

</body>
</html>`
  );

  // ================= CSS =================

  fs.writeFileSync(
    path.join(projectPath, "css", "style.css"),
    `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  overflow: hidden;
  background: #090909;
  color: white;
  font-family: "Montserrat", sans-serif;
}

.background {
  position: fixed;
  inset: 0;

  background:
    radial-gradient(
      circle at 20% 30%,
      rgba(120, 0, 40, 0.35),
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(70, 0, 20, 0.4),
      transparent 45%
    ),
    linear-gradient(
      135deg,
      #050505,
      #120006,
      #050505
    );

  z-index: -3;
}

.noise {
  position: fixed;
  inset: 0;

  opacity: 0.05;

  background-image:
    url("https://grainy-gradients.vercel.app/noise.svg");

  pointer-events: none;

  z-index: 10;
}

.hero {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  position: relative;
}

.content {
  max-width: 900px;
  padding: 30px;

  animation: cinematicEntry 2s ease forwards;
}

.subtitle {
  font-size: 11px;

  letter-spacing: 7px;

  color: rgba(255, 255, 255, 0.55);

  margin-bottom: 30px;
}

h1 {
  font-family: "Cormorant Garamond", serif;

  font-size: clamp(70px, 12vw, 160px);

  font-weight: 500;

  letter-spacing: 8px;

  line-height: 1;

  text-shadow:
    0 0 30px rgba(255, 0, 80, 0.2);
}

h1 span {
  display: inline-block;

  font-size: 0.45em;

  color: #e63956;

  margin: 0 20px;

  animation: heartbeat 2s infinite;
}

.line {
  width: 120px;
  height: 1px;

  margin: 35px auto;

  background:
    linear-gradient(
      90deg,
      transparent,
      #e63956,
      transparent
    );
}

.description {
  font-family: "Cormorant Garamond", serif;

  font-size: 22px;

  line-height: 1.7;

  color: rgba(255,255,255,0.7);

  margin-bottom: 40px;
}

button {
  padding: 15px 35px;

  border: 1px solid rgba(255,255,255,0.3);

  background: transparent;

  color: white;

  letter-spacing: 3px;

  text-transform: uppercase;

  font-size: 10px;

  cursor: pointer;

  transition: 0.4s;
}

button:hover {
  background: white;
  color: black;

  transform: translateY(-3px);

  box-shadow:
    0 15px 50px rgba(255,255,255,0.15);
}

.glow {
  position: absolute;

  width: 500px;
  height: 500px;

  border-radius: 50%;

  filter: blur(120px);

  opacity: 0.15;

  z-index: -1;
}

.glow-one {
  background: #d90429;

  top: -200px;
  left: -200px;

  animation: float 8s infinite alternate;
}

.glow-two {
  background: #800f2f;

  bottom: -200px;
  right: -200px;

  animation: float 10s infinite alternate-reverse;
}

.heart {
  position: fixed;

  color: rgba(255, 50, 90, 0.4);

  animation: floatHeart linear infinite;

  pointer-events: none;
}

@keyframes heartbeat {

  0%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

}

@keyframes cinematicEntry {

  from {
    opacity: 0;
    transform: scale(1.05);
    filter: blur(10px);
  }

  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }

}

@keyframes float {

  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(100px, 50px);
  }

}

@keyframes floatHeart {

  from {
    transform: translateY(110vh) rotate(0deg);
  }

  to {
    transform: translateY(-10vh) rotate(360deg);
  }

}

@media (max-width: 600px) {

  h1 {
    letter-spacing: 2px;
  }

  .subtitle {
    letter-spacing: 4px;
    font-size: 9px;
  }

  .description {
    font-size: 18px;
  }

}`
  );

  // ================= JAVASCRIPT =================

  fs.writeFileSync(
    path.join(projectPath, "js", "script.js"),
    `const heartsContainer = document.querySelector(".hearts");

for (let i = 0; i < 20; i++) {

  const heart = document.createElement("div");

  heart.classList.add("heart");

  heart.innerHTML = "♥";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.fontSize =
    Math.random() * 20 + 10 + "px";

  heart.style.animationDuration =
    Math.random() * 10 + 8 + "s";

  heart.style.animationDelay =
    Math.random() * 5 + "s";

  heartsContainer.appendChild(heart);
}

document
  .getElementById("enterBtn")
  .addEventListener("click", () => {

    document.body.style.transition = "1s";
    document.body.style.opacity = "0";

    setTimeout(() => {

      document.body.style.opacity = "1";

      alert("Welcome to our story ♥");

    }, 1000);

  });`
  );

  // ================= SVG HEART =================

  fs.writeFileSync(
    path.join(projectPath, "public", "heart.svg"),
    `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
  <path
    fill="#e63956"
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    2 5.42 4.42 3 7.5 3
    c1.74 0 3.41.81 4.5 2.09
    C13.09 3.81 14.76 3 16.5 3
    19.58 3 22 5.42 22 8.5
    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  />
</svg>`
  );

  console.log(`\\n✨ Project "${projectName}" created successfully!`);
  console.log(`❤️ Romantic cinematic template generated.`);
  console.log(`🚀 Opening VS Code and Live Server...\\n`);

  // Open VS Code
  exec(`code "${projectPath}"`);

  // Start live server
  exec(`live-server "${projectPath}"`);

} else {

  console.log("❌ Unknown command.");
  console.log("Try: hari vino myproject");

}