const video = document.getElementById('video')

const width = window.innerWidth / 2;
const height = (560 / 720) * width;
let response = {};
let lang = navigator.languages[0].split("-")[0] === "pt" ? "pt" : "en";
let labels = {};

const getResponse = async () => {
  response = await fetch("./choses.json")
    .then((response) => response.json())
    .then((data) => data);
}

const getLabels = async () => {
  labels = await fetch("./labels.json")
    .then((response) => response.json())
    .then((data) => data[lang])
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
    
    if (state === states.GAME || state === states.MENU) {
      if (timer >= 100 && action === enemy.feeling) {
        score++;
        generateEnemy();
        timer = 0;
        suspicious = false;
      }
      else if (timer >= 100 && action != "" && action != enemy.feeling) {
        if (suspicious) {
          state = states.OVER;
          menuExpressions.angry = false;
          menuExpressions.happy = false;
          menuExpressions.sad = false;
          menuExpressions.surprised = false;
        }
        suspicious = true;
        generateEnemy();
        timer = 0;
      }
    } else if (state === states.OVER) {
      if (
        menuExpressions.angry &&
        menuExpressions.happy &&
        menuExpressions.sad &&
        menuExpressions.surprised
      ) {
        menuExpressions.angry = false;
        menuExpressions.happy = false;
        menuExpressions.sad = false;
        menuExpressions.surprised = false;
        timer = 0;
        state = "GAME"
      }
    }

    canvas.getContext('2d').fillStyle = "white";
    canvas.getContext('2d').font = "15px Arial";
    timer++;
  }, LOOP_TIME)
})