import * as faceapi from 'face-api.js';

export const loadNet = async() => {
  const detectionNet = faceapi.nets.ssdMobilenetv1;
  await detectionNet.load('/data/weights');
  await faceapi.loadFaceExpressionModel('/data/weights');
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