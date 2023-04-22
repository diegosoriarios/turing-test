const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth / 2;
gameCanvas.height = (560 / 720) * gameCanvas.width;

const MESSAGES_ARRAY = [
  "Thank you for participate on our Turing Test",
  "You need to react acording to the sentences given",
  "Be careful with the red bar",
  "You should be happy with supporting messages",
  "You should be sad with bad news",
  "You should be angry with insults (don't worry, they are light)",
  "You should be surprise with any accusations",
  "Be happy and sad to start the game"
];

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const img = new Image();
const angryImage = new Image();
const happyImage = new Image();
const sadImage = new Image();
const surprisedImage = new Image();

const initialize = () => {
  happyImage.src = `assets/happy.png`;
  sadImage.src = `assets/sad.png`;
  surprisedImage.src = `assets/surprised.png`;
  angryImage.src = `assets/angry.png`;
};

let enemy = {};
let suspicious = false;
let state = "GAME";

const states = {
  MENU: "MENU",
  GAME: "GAME",
  MESSAGE: "MESSAGE",
  OVER: "OVER",
  LANGUAGE: "LANGUAGE"
};

async function generateEnemy() {
  menuExpressions.angry = 0;
  menuExpressions.happy = 0;
  menuExpressions.sad = 0;
  menuExpressions.surprised = 0;
  const feelingList = ["happy", "sad", "angry", "surprised"];
  const random = randomIntFromInterval(1, 16);
  const feeling = feelingList[randomIntFromInterval(1, 4) - 1];

  const randomNameIndex = randomIntFromInterval(1, response.names.length - 1);
  const fullName =
    response.names[randomNameIndex] +
    " " +
    response.surnames[randomIntFromInterval(1, response.surnames.length - 1)];
  const list = response[feeling];
  const sentence = list[randomIntFromInterval(1, list.length) - 1];

  img.src = `assets/people/${random}.png`;

  enemy = {
    name: fullName,
    image: random,
    sentence,
    feeling,
  };
}

let messageWasRead = false;

const colors = {
  black: "black",
  white: "white",
  red: "#BE2633",
  green: "#26BEB1",
};

const menuExpressions = {
  happy: 0,
  sad: 0,
  surprised: 0,
  angry: 0,
};

const resetMenuExpressions = () => {
  menuExpressions.angry = 0;
  menuExpressions.happy = 0;
  menuExpressions.sad = 0;
  menuExpressions.surprised = 0;
}

const handleWrong = () => {
  if (suspicious) {
    state = states.OVER;
    resetMenuExpressions();
  }
  suspicious = true;
  generateEnemy();
  timer = 0;
}

const handleRight = () => {
  score++;
  generateEnemy();
  timer = 0;
  suspicious = false;
}

const drawMenu = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Complete the 4 expressions"],
    gameCanvas.width / 2 -
      ctx.measureText(labels["Complete the 4 expressions"]).width / 2,
    100
  );

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    gameCanvas.width / 5 - 45,
    (gameCanvas.height / 2 - happyImage.height / 2 - 25 + 150) - (150 * menuExpressions.happy),
    120,
    (150 * menuExpressions.happy),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    happyImage,
    gameCanvas.width / 5 - happyImage.width / 2,
    gameCanvas.height / 2 - happyImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Happy"],
    gameCanvas.width / 5 - ctx.measureText(labels["Happy"]).width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.happy >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      gameCanvas.width / 5 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 2 - 45,
    (gameCanvas.height / 2 - sadImage.height / 2 - 25 + 150) - (150 * menuExpressions.sad),
    120,
    (150 * menuExpressions.sad),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    sadImage,
    (gameCanvas.width / 5) * 2 - sadImage.width / 2,
    gameCanvas.height / 2 - sadImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Sad"],
    (gameCanvas.width / 5) * 2 - ctx.measureText(labels["Sad"]).width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.sad >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 2 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 3 - 42,
    (gameCanvas.height / 2 - surprisedImage.height / 2 - 25 + 150) - (150 * menuExpressions.surprised),
    120,
    (150 * menuExpressions.surprised),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    surprisedImage,
    (gameCanvas.width / 5) * 3 - surprisedImage.width / 2,
    gameCanvas.height / 2 - surprisedImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(
    labels["Surprised"],
    (gameCanvas.width / 5) * 3 - ctx.measureText(labels["Surprised"]).width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.surprised >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 3 - 42,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 4 - 40,
    (gameCanvas.height / 2 - angryImage.height / 2 - 25 + 150) - (150 * menuExpressions.angry),
    120,
    (150 * menuExpressions.angry),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    angryImage,
    (gameCanvas.width / 5) * 4 - angryImage.width / 2,
    gameCanvas.height / 2 - angryImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Angry"],
    (gameCanvas.width / 5) * 4 - ctx.measureText(labels["Angry"]).width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.angry >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 4 - 40,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }
};

const draw = () => {
  // ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.red;
  ctx.fillRect(
    0,
    timer * (gameCanvas.height / 100),
    10,
    gameCanvas.height - timer * (gameCanvas.height / 100)
  );

  //ENEMY
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    img,
    gameCanvas.width / 2 - 100,
    gameCanvas.height / 2 - 100,
    200,
    200
  );

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    enemy.name,
    gameCanvas.width / 2 - ctx.measureText(enemy.name).width / 2,
    gameCanvas.height / 2 - 130
  );
  ctx.fillText(
    labels[enemy.sentence],
    gameCanvas.width / 2 - ctx.measureText(labels[enemy.sentence]).width / 2,
    gameCanvas.height / 2 + 130
  );

  if (suspicious) {
    ctx.fillText(
      labels["Alert"],
      gameCanvas.width / 2 - ctx.measureText(labels["Alert"]).width / 2,
      25
    );
  }

  ctx.fillText(
    score,
    gameCanvas.width / 2 - ctx.measureText(score).width / 2,
    50
  );

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    gameCanvas.width / 2 - 200, 
    gameCanvas.height - 130,
    menuExpressions.happy * 50,
    40,
  );
  ctx.fillStyle = colors.white;
  ctx.font = "30px Arial";
  ctx.fillText(labels["Happy"], gameCanvas.width / 2 - 140, gameCanvas.height - 100);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    happyImage,
    gameCanvas.width / 2 - 190,
    gameCanvas.height - 122,
    25,
    25
  );
  ctx.strokeStyle = colors.white;
  ctx.strokeRect(gameCanvas.width / 2 - 200, gameCanvas.height - 130, 200, 40);

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    gameCanvas.width / 2 - 200, 
    gameCanvas.height - 82,
    menuExpressions.sad * 50,
    40,
  );
  ctx.fillStyle = "white";
  ctx.fillText(labels["Sad"], gameCanvas.width / 2 - 140, gameCanvas.height - 50);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    sadImage,
    gameCanvas.width / 2 - 190,
    gameCanvas.height - 73,
    25,
    25
  );
  ctx.strokeStyle = colors.white;
  ctx.strokeRect(gameCanvas.width / 2 - 200, gameCanvas.height - 82, 200, 40);

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    gameCanvas.width / 2 + 45, 
    gameCanvas.height - 130,
    menuExpressions.angry * 50,
    40,
  );
  ctx.fillStyle = "white";
  ctx.fillText(labels["Angry"], gameCanvas.width / 2 + 100, gameCanvas.height - 100);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    angryImage,
    gameCanvas.width / 2 + 50,
    gameCanvas.height - 122,
    25,
    25
  );
  ctx.strokeStyle = colors.white;
  ctx.strokeRect(gameCanvas.width / 2 + 45, gameCanvas.height - 130, 200, 40);

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    gameCanvas.width / 2 + 45, 
    gameCanvas.height - 82,
    menuExpressions.surprised  * 50,
    40,
  );
  ctx.fillStyle = "white";
  ctx.fillText(labels["Surprised"], gameCanvas.width / 2 + 100, gameCanvas.height - 50);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    surprisedImage,
    gameCanvas.width / 2 + 50,
    gameCanvas.height - 73,
    25,
    25
  );
  ctx.strokeStyle = colors.white;
  ctx.strokeRect(gameCanvas.width / 2 + 45, gameCanvas.height - 82, 200, 40);
};

const takePlayerAction = (expression) => {
  if (!expression) return "";
  const { happy, sad, angry, surprised, neutral } = expression;
  const obj = { happy, sad, angry, surprised, neutral };

  let max = Object.entries(obj).reduce(
    (max, entry) => (entry[1] >= max[1] ? entry : max),
    [0, -Infinity]
  );
  const [action] = max;

  const playerActions = {
    happy: "happy",
    sad: "sad",
    angry: "angry",
    surprised: "surprised",
    neutral: "",
  };

  menuExpressions[action] += 0.1;
  if (state !== "GAME" && menuExpressions[action] >= 1) menuExpressions[action] = 1;
  if (state === "GAME" && menuExpressions[action] >= 4) menuExpressions[action] = 4;
  if (
    menuExpressions.angry >= 1 &&
    menuExpressions.happy >= 1 &&
    menuExpressions.sad >= 1 &&
    menuExpressions.surprised >= 1 &&
    state === states.MENU
  ) {
    state = states.MESSAGE;
    timer = -50;
  }
  return "";
};

const drawMessages = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  MESSAGES_ARRAY.forEach((message, index) => {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(
      labels[message],
      gameCanvas.width / 2 -
        ctx.measureText(labels[message]).width / 2,
      100 + (30 * index)
    );
  })
  
  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 2 - 45,
    (gameCanvas.height / 2 - happyImage.height / 2 - 25 + 200) - (150 * menuExpressions.happy),
    120,
    (150 * menuExpressions.happy),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    happyImage,
    (gameCanvas.width / 5) * 2 - happyImage.width / 2,
    gameCanvas.height / 2 + 50,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Angry"],
    (gameCanvas.width / 5) * 2 - ctx.measureText(labels["Angry"]).width / 4 - 6,
    gameCanvas.height / 2 + 150
  );
  if (menuExpressions.happy >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 2 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 + 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 3 - 42,
    (gameCanvas.height / 2 - sadImage.height / 2 - 25 + 200) - (150 * menuExpressions.sad),
    120,
    (150 * menuExpressions.sad),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    sadImage,
    (gameCanvas.width / 5) * 3 - sadImage.width / 2,
    gameCanvas.height / 2 + 50,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(
    labels["Sad"],
    (gameCanvas.width / 5) * 3 - ctx.measureText(labels["Sad"]).width / 4 + 6,
    gameCanvas.height / 2 + 150
  );
  if (menuExpressions.sad >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 3 - 42,
      gameCanvas.height / 2 - sadImage.height / 2 + 25,
      120,
      150
    );
  }
};

const drawOver = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    "Game Over",
    gameCanvas.width / 2 - ctx.measureText("Game Over").width / 2,
    100
  );

  ctx.fillText(
    labels["Complete the 4 expressions to go to the game"],
    gameCanvas.width / 2 -
      ctx.measureText(labels["Complete the 4 expressions to go to the game"]).width / 2,
    130
  );

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    gameCanvas.width / 5 - 45,
    (gameCanvas.height / 2 - happyImage.height / 2 - 25 + 150) - (150 * menuExpressions.happy),
    120,
    (150 * menuExpressions.happy),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    happyImage,
    gameCanvas.width / 5 - happyImage.width / 2,
    gameCanvas.height / 2 - happyImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Happy"],
    gameCanvas.width / 5 - ctx.measureText(labels["Happy"]).width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.happy >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      gameCanvas.width / 5 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 2 - 45,
    (gameCanvas.height / 2 - sadImage.height / 2 - 25 + 150) - (150 * menuExpressions.sad),
    120,
    (150 * menuExpressions.sad),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    sadImage,
    (gameCanvas.width / 5) * 2 - sadImage.width / 2,
    gameCanvas.height / 2 - sadImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Sad"],
    (gameCanvas.width / 5) * 2 - ctx.measureText(labels["Sad"]).width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.sad >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 2 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 3 - 42,
    (gameCanvas.height / 2 - surprisedImage.height / 2 - 25 + 150) - (150 * menuExpressions.surprised),
    120,
    (150 * menuExpressions.surprised),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    surprisedImage,
    (gameCanvas.width / 5) * 3 - surprisedImage.width / 2,
    gameCanvas.height / 2 - surprisedImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(
    labels["Surprised"],
    (gameCanvas.width / 5) * 3 - ctx.measureText(labels["Surprised"]).width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.surprised >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 3 - 42,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 4 - 40,
    (gameCanvas.height / 2 - angryImage.height / 2 - 25 + 150) - (150 * menuExpressions.angry),
    120,
    (150 * menuExpressions.angry),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    angryImage,
    (gameCanvas.width / 5) * 4 - angryImage.width / 2,
    gameCanvas.height / 2 - angryImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    labels["Angry"],
    (gameCanvas.width / 5) * 4 - ctx.measureText(labels["Angry"]).width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.angry >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 4 - 40,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }
};

const drawLanguage = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    "Be happy or sad to choose",
    gameCanvas.width / 2 - ctx.measureText("Be happy or sad to choose").width / 2,
    100
  );

  ctx.fillText(
    labels["Choose your language"],
    gameCanvas.width / 2 -
      ctx.measureText(labels["Choose your language"]).width / 2,
    130
  );

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 2 - 45,
    (gameCanvas.height / 2 - happyImage.height / 2 - 25 + 150) - (150 * menuExpressions.happy),
    120,
    (150 * menuExpressions.happy),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    happyImage,
    (gameCanvas.width / 5) * 2 - happyImage.width / 2,
    gameCanvas.height / 2 - happyImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText(
    "Portuguese",
    (gameCanvas.width / 5) * 2 - ctx.measureText("Portuguese").width / 4 - 6,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.happy >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 2 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

  ctx.fillStyle = colors.green;
  ctx.fillRect(
    (gameCanvas.width / 5) * 3 - 42,
    (gameCanvas.height / 2 - sadImage.height / 2 - 25 + 150) - (150 * menuExpressions.sad),
    120,
    (150 * menuExpressions.sad),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    sadImage,
    (gameCanvas.width / 5) * 3 - sadImage.width / 2,
    gameCanvas.height / 2 - sadImage.height / 2,
    50,
    50
  );
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(
    "English",
    (gameCanvas.width / 5) * 3 - ctx.measureText("English").width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.sad >= 1) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 3 - 42,
      gameCanvas.height / 2 - sadImage.height / 2 - 25,
      120,
      150
    );
  }
};

const update = (expression) => {
  switch (state) {
    case states.GAME:
      draw();
      return takePlayerAction(expression);
    case states.MENU:
      drawMenu(expression);
      return takePlayerAction(expression);
    case states.MESSAGE:
      drawMessages();
      return takePlayerAction(expression);
    case states.OVER:
      drawOver();
      return takePlayerAction(expression);
    case states.LANGUAGE:
      drawLanguage();
      return takePlayerAction(expression);
  }
};
