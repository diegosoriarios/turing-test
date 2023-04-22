const video = document.getElementById('video')

const width = window.innerWidth / 2;
const height = (560 / 720) * width;
let response = {};
let lang = navigator.languages[0].split("-")[0] === "pt" ? "pt" : "en";
let labelsJson = {};
let labels = {};

const getResponse = async () => {
  response = await fetch("./choses.json")
    .then((response) => response.json())
    .then((data) => data);
}

const getLabels = async () => {
  labelsJson = await fetch("./labels.json")
    .then((response) => response.json())
    .then((data) => data);
  labels = labelsJson[lang]; 
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  getResponse(),
  getLabels(),
  initialize(),
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

const LOOP_TIME = 100;
let timer = 0;
let score = 0;

video.addEventListener('play', () => {
  generateEnemy(),
  video.width = window.innerWidth / 2;
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: width, height: height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const expressions = detections[0]?.expressions;

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    
    const action = update(expressions);
    
    if (state === states.GAME) {
      const isAngry = menuExpressions.angry === 4;
      const isHappy = menuExpressions.happy === 4;
      const isSad = menuExpressions.sad === 4;
      const isSurprised = menuExpressions.surprised === 4;
      const comparasionArray = [isAngry, isHappy, isSad, isSurprised];
      comparasionArray.sort();
      const isRepeated = comparasionArray[3] == comparasionArray [2];
      if (isAngry || isHappy || isSad || isSurprised) {
        if (menuExpressions[enemy.feeling] === 4) {
          handleRight();
        } else {
          handleWrong();
        }
      }
      else if (timer >= 100) {// && action != "" && action != enemy.feeling) {
        handleWrong()
      }
    } else if (state === states.OVER) {
      if (
        menuExpressions.angry >= 1 &&
        menuExpressions.happy >= 1 &&
        menuExpressions.sad >= 1 &&
        menuExpressions.surprised >= 1
      ) {
        resetMenuExpressions();
        timer = 0;
        state = states.GAME
      }
    } else if (state === states.LANGUAGE) {
      if (menuExpressions.happy >= 1) {
        labels = labelsJson["pt"];
        resetMenuExpressions();
        state = states.MENU;
      }
      if (menuExpressions.sad >= 1) {
        labels = labelsJson["en"];
        resetMenuExpressions();
        state = states.MENU;
      }
    } else if (state === states.MESSAGE) {
      if (menuExpressions.happy >= 1 && menuExpressions.sad >= 1) {
        timer = 0;
        state = states.GAME;
      }
    }

    canvas.getContext('2d').fillStyle = "white";
    canvas.getContext('2d').font = "15px Arial";
    timer++;
  }, LOOP_TIME)
})