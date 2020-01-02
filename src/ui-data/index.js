import home_en from './apps/home/en';
import home_ja from './apps/home/ja';
import deepmerge from 'deepmerge';

export default {
    apps: {
        home: {
            en: home_en,
            ja: deepmerge(home_en, home_ja)
        },
    }
};

