import { models } from 'kabuda-liquid';

export default class AppState extends models.Model {
    constructor(o) {
        super(o);

        this.overlays = o.overlays || {};
        this.overlayId = o.overlayId || 0; // uniqueId for overlays
    }
}
