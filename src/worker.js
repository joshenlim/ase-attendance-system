import * as faceapi from 'face-api.js';
import { loadNet, detectFace } from './utils/facialRecognition';

let cam;

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

loadNet()
  .then(() => {
    console.info('INFO: Loaded network models succesfully');
    return initCamera(400, 500);
  })
  .then(video => {
    console.info('INFO: Initialized camera successfully')
    console.info('INFO: Beginning Face Detection process')
    detectFace(video);
  });