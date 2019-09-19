import * as faceapi from 'face-api.js';
import { onDetect, notifyRenderer } from './workerMessager';

const minConfidenceFace = 0.5;
const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidenceFace });

export const loadNet = async() => {
  const detectionNet = faceapi.nets.ssdMobilenetv1;
  await detectionNet.load('/data/weights');
  await faceapi.loadFaceLandmarkModel('/data/weights');
  await faceapi.loadFaceRecognitionModel('/data/weights');
  return detectionNet;
}

export const loadFaceMatcher = async() => {
  /**
  const labeledDescriptors = [
    new faceapi.LabeledFaceDescriptors(
      'obama',
      [descriptorObama1, descriptorObama2]
    ),
    new faceapi.LabeledFaceDescriptors(
      'trump',
      [descriptorTrump]
    )
  ]
  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)
  */
}

/**
let loadTrain = async() => {
  const labels = ['test_image']
  trainDescriptors = await Promise.all(
    labels.map(async label => {
      const imgUrl = require(`./assets/${label}.jpg`)
      const img = await faceapi.fetchImage(imgUrl)

      const fullFaceDescription = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor()
      
      if (!fullFaceDescription) {
        throw new Error(`no faces detected for ${label}`)
      }
      
      const faceDescriptors = [fullFaceDescription.descriptor]
      return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
    })
  )
  console.log("Loaded training images")
}
*/

export const detectFace = async(frame, isReady=false) => {
  /**
   * Will have to do up loadFaceMatcher to return a trainDescriptors array
   * then pass that array into detectFace as an argument
   */
  // START Prep train data
  const refImg = await faceapi.fetchImage(require(`../assets/test_image.jpg`));
  const reference = await faceapi
    .detectSingleFace(refImg, faceapiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()

  const faceMatcher = new faceapi.FaceMatcher(reference)
  // END Prep train data

  const overlay = document.getElementById('overlay');

  const result = await faceapi
    .detectSingleFace(frame, faceapiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()
  
  const context = overlay.getContext('2d');
  context.clearRect(0, 0, overlay.width, overlay.height);

  if (result) {
    const bestMatch = faceMatcher.findBestMatch(result.descriptor)
    onDetect(bestMatch.toString())
    faceapi.draw.drawDetections(overlay, result.detection)
  }

  if (!isReady) notifyRenderer('status', { status: 'ready' })

  detectFace(frame, true);
}