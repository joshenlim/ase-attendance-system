# ase-attendance-system

A facial identification-based attendance system that's built for academic instituitions, specifically for undergraduate laboratory sessions. The system is created with Vue and Electron to be a Desktop application and all facial recognition functionalities are implemented with [face-api.js](https://github.com/justadudewhohacks/face-api.js).

## Project setup

For development, you will need the [backend API server](https://github.com/joshenlim/ase-attendance-server) as well.

Install required modules: `npm install`

Run Electron app in dev environment: `npm run electron:serve`

Build Electron package (Mac/Windows): `npm run electron:build`

Built package can be found in the `dist_electron` folder
