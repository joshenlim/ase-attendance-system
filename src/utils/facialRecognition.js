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

export const detectFace = async(frame, isReady=false) => {
  const labels = ['U1722911C', 'U1722094J', 'U1720999H', 'U1721312J', 'U1721959H']
  const labeledFaceDescriptors = await Promise.all(
    labels.map(async label => {
      const img = await faceapi.fetchImage(require(`../assets/students/${label}.jpg`))
      const faceDescription = await faceapi
        .detectSingleFace(img, faceapiOptions)
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (!faceDescription) {
        console.log(`ERROR: No face detected for ${label}`)
      }

      const faceDescriptors = [faceDescription.descriptor]
      return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
    })
  )
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)

  const overlay = document.getElementById('overlay');

  const result = await faceapi
    .detectSingleFace(frame, faceapiOptions)
    .withFaceLandmarks()
    .withFaceDescriptor()
  
  const context = overlay.getContext('2d');
  context.clearRect(0, 0, overlay.width, overlay.height);

  if (result) {
    const bestMatch = faceMatcher.findBestMatch(result.descriptor)
    onDetect(bestMatch._label)
    faceapi.draw.drawDetections(overlay, result.detection)
  }

  if (!isReady) notifyRenderer('status', { status: 'ready' })

  detectFace(frame, true);
}