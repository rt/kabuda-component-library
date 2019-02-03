import { getStateStore } from '../stores/state-store';

export function getOverlayId(defaultValue) {
    return new Promise((resolve, reject) => {
        const store = getStateStore();
        const appState = store.getAppState();
        appState.overlayId++;
        const id = `overlay${appState.overlayId}`;
        appState.overlays[id] = defaultValue || false;
        store.setAppState(appState);
        resolve(id);
    });
}

export function setOverlayId(id, val) {
    return new Promise((resolve, reject) => {
        const store = getStateStore();
        const appState = store.getAppState();
        appState.overlays[id] = val;
        store.setAppState(appState);
        resolve();
    });
}

export function closeOverlays() {
    return new Promise((resolve, reject) => {
        const store = getStateStore();
        const appState = store.getAppState();
        for (const key in appState.overlays) {
            appState.overlays[key] = false;
        }
        store.setAppState(appState);
        resolve();
    });
}

