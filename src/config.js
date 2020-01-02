/* eslint-disable max-len */

const port = process.env.PORT || 3000;
const ip = process.env.IP || '0.0.0.0';

export default {
    ip: ip,
    port: port,
    projectId: 'betsy-229400',
    keyFilename: './key.json',
    analytics: {
        // https://analytics.google.com/
        googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X

    },
    auth: {
        jwt: { secret: process.env.JWT_SECRET || 'PebbleFields/Skeleton' },
    }
};



