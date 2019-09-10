import * as faceapi from 'face-api.js';
import electron from 'electron';
import { loadNet } from './utils/facialRecognition';

const ipcRenderer = electron.ipcRenderer;
const minConfidenceFace = 0.5;
const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidenceFace });

// Avoid Global Variables - KIV to refactor
// Make this worker into a js class
let cam;
let overlay;

let isRunning = true;
let isReady = false;

faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img')
});

let initCamera = async (width, height) => {
  cam = document.getElementById('cam');
  cam.width = width;
  cam.height = height;

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: width,
      height: height
    }
  });

  cam.srcObject = stream;

  return new Promise((resolve) => {
    cam.onloadedmetadata = () => {
      resolve(cam);
    };
  });
};

let detectFace = async() => {
  console.log('INFO: Beginning Face Detection...')
  // Prepare Face Matcher
  const refImg = await faceapi.fetchImage(require(`./assets/test_image.jpg`));
  const reference = await faceapi
    .detectSingleFace(refImg, faceapiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()

  const faceMatcher = new faceapi.FaceMatcher(reference)

  // Detect face from vid stream
  let result = await faceapi
    .detectSingleFace(cam, faceapiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()

  if(!isReady) {
    isReady = true;
    notifyRenderer('ready', {});
  }

  overlay = document.getElementById('overlay');

  // If face detected, draw bounding box and print similarity 
  // value of ref against detected face
  if (result) {
    const bestMatch = faceMatcher.findBestMatch(result.descriptor)
    console.log(bestMatch.toString())
    onDetect(bestMatch.toString())

    const context = overlay.getContext('2d');
    context.clearRect(0, 0, overlay.width, overlay.height);
    faceapi.draw.drawDetections(overlay, result.detection)
  }

  if(isRunning) {
    detectFace();
  }
}

let onDetect = (identity) => {
  notifyRenderer('face-detect', {
    identity: identity
  });
}

let notifyRenderer = (command, payload) => {
  ipcRenderer.send('window-message-from-worker', {
    command: command, payload: payload
  });
}

loadNet()
  .then(() => {
    console.info('INFO: Loaded network models succesfully');
    return initCamera(400, 500);
  })
  .then(() => {
    console.info('INFO: Initialized camera successfully')
    detectFace();
  });