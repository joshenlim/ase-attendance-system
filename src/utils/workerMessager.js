import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;

export const onDetect = (identity) => {
  notifyRenderer('face-detect', {
    identity: identity
  });
}

export const notifyRenderer = (command, payload) => {
  ipcRenderer.send('window-message-from-worker', {
    command: command, payload: payload
  });
}