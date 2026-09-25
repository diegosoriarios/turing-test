# Turing Test

Face emotion recognition game using TensorFlowJS — you are an AI trying to pass as human,
reacting to NPCs with your own facial expressions, detected live through your webcam.

## Play

Requires **HTTPS or localhost** (camera access via `getUserMedia` is blocked on `file://`).

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

Allow camera access when prompted, pick a language, calibrate your four expressions
(happy, sad, angry, surprised) and start guessing.

### How it works

1. An NPC tells you something and feels a certain way about it
2. You react with your face — the game reads your expression in real time
3. React correctly to pass the Turing test; get it wrong twice and you're marked suspicious

## About Project
Real time face detection through a webcam using AI. By using the Face API JS library built on Tensor Flow to setup the face detection.

## Story
You are an AI and have to pass for a group of different people without being suspicious
You just can be happy, sad, surprised and angry

## Library
* [tensorflowjs](https://github.com/tensorflow/tfjs) - JavaScript library for training and deploying machine learning models
* [Face API](https://github.com/justadudewhohacks/face-api.js) - JavaScript API for face detection and face recognition in the browser and nodejs with tensorflow.js
* [Model](https://github.com/WebDevSimplified/Face-Detection-JavaScript/tree/master/models) - Pre trained model
* [Sprites](https://opengameart.org/content/bw-surreal-office-rpg-1-bit-sprites-and-tiles) - from Sdivi Lee Hall [@anactualpokemon](https://twitter.com/anactualpokemon)