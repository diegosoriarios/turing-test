const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth / 2;
gameCanvas.height = (560 / 720) * gameCanvas.width;

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
let state = "MENU";

const states = {
  MENU: "MENU",
  GAME: "GAME",
  MESSAGE: "MESSAGE",
  OVER: "OVER",
};

async function generateEnemy() {
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
};

const menuExpressions = {
  happy: false,
  sad: false,
  surprised: false,
  angry: false,
};

const drawMenu = () => {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    "Complete the 4 expressions",
    gameCanvas.width / 2 -
      ctx.measureText("Complete the 4 expressions").width / 2,
    100
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
    "Happy",
    gameCanvas.width / 5 - ctx.measureText("Happy").width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.happy) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      gameCanvas.width / 5 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

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
    "Sad",
    (gameCanvas.width / 5) * 2 - ctx.measureText("Sad").width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.sad) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 2 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

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
    "Surprised",
    (gameCanvas.width / 5) * 3 - ctx.measureText("Surprised").width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.surprised) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 3 - 42,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

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
    "Angry",
    (gameCanvas.width / 5) * 4 - ctx.measureText("Angry").width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.angry) {
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
  ctx.fillStyle = "red";
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
    enemy.sentence,
    gameCanvas.width / 2 - ctx.measureText(enemy.sentence).width / 2,
    gameCanvas.height / 2 + 130
  );

  if (suspicious) {
    ctx.fillText(
      "Alert",
      gameCanvas.width / 2 - ctx.measureText("Alert").width / 2,
      25
    );
  }

  ctx.fillText(
    score,
    gameCanvas.width / 2 - ctx.measureText(score).width / 2,
    50
  );

  ctx.fillStyle = colors.white;
  ctx.font = "30px Arial";
  ctx.fillText("Happy", gameCanvas.width / 2 - 140, gameCanvas.height - 100);

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

  ctx.fillText("Sad", gameCanvas.width / 2 - 140, gameCanvas.height - 50);

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

  ctx.fillText("Angry", gameCanvas.width / 2 + 100, gameCanvas.height - 100);

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

  ctx.fillText("Surprised", gameCanvas.width / 2 + 100, gameCanvas.height - 50);

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
  if (state === states.GAME) {
    return playerActions[action];
  }

  menuExpressions[action] = true;
  if (
    menuExpressions.angry &&
    menuExpressions.happy &&
    menuExpressions.sad &&
    menuExpressions.surprised &&
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

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(
    "Thank you for participate on our Turing Test",
    gameCanvas.width / 2 -
      ctx.measureText("Thank you for participate on our Turing Test").width / 2,
    100
  );
  ctx.fillText(
    "You need to react acording to the sentences given",
    gameCanvas.width / 2 -
      ctx.measureText("You need to react acording to the sentences given")
        .width /
        2,
    130
  );
  ctx.fillText(
    "when the red bar finish",
    gameCanvas.width / 2 -
      ctx.measureText("when the red bar finish")
        .width /
        2,
    160
  );
  ctx.fillText(
    "You should be happy with supporting messages",
    gameCanvas.width / 2 -
      ctx.measureText("You should be happy with supporting messages").width / 2,
    190
  );
  ctx.fillText(
    "You should be sad with bad news",
    gameCanvas.width / 2 -
      ctx.measureText("You should be sad with bad news").width / 2,
    220
  );
  ctx.fillText(
    "You should be angry with insults (don't worry, they are light)",
    gameCanvas.width / 2 -
      ctx.measureText(
        "You should be angry with insults (don't worry, they are light)"
      ).width /
        2,
    250
  );
  ctx.fillText(
    "You should be surprise with any accusations",
    gameCanvas.width / 2 -
      ctx.measureText("You should be surprise with any accusations").width / 2,
    280
  );
  ctx.fillText(
    `The game will start in ${100 - timer}...`,
    gameCanvas.width / 2 -
      ctx.measureText(`The game will start in ${100 - timer}...`).width / 2,
    310
  );
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
    "Complete the 4 expressions to go to the game",
    gameCanvas.width / 2 -
      ctx.measureText("Complete the 4 expressions to go to the game").width / 2,
    130
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
    "Happy",
    gameCanvas.width / 5 - ctx.measureText("Happy").width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.happy) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      gameCanvas.width / 5 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

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
    "Sad",
    (gameCanvas.width / 5) * 2 - ctx.measureText("Sad").width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.sad) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 2 - 45,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

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
    "Surprised",
    (gameCanvas.width / 5) * 3 - ctx.measureText("Surprised").width / 3,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.surprised) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 3 - 42,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
      120,
      150
    );
  }

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
    "Angry",
    (gameCanvas.width / 5) * 4 - ctx.measureText("Angry").width / 4,
    gameCanvas.height / 2 + 100
  );
  if (menuExpressions.angry) {
    ctx.strokeStyle = colors.white;
    ctx.strokeRect(
      (gameCanvas.width / 5) * 4 - 40,
      gameCanvas.height / 2 - happyImage.height / 2 - 25,
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
      if (timer >= 100) state = states.GAME;
      break;
    case states.OVER:
      drawOver();
      return takePlayerAction(expression);
  }
};
