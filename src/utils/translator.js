

/**
 * @param {string} str
 * @param {object} params
 * @return {string}
 */
export function translate(str, params) {
    // parameters
    if (!params) {
        return str;
    }

    for (const key in params) {
        str = str.replace(new RegExp(`#${key}#`, 'g'), params[key]);
    }
    return str;
}

/**
 * @param {number} num
 * @param {object} strObj
 * @param {object} params
 * @return {string | null}
 */
export function pluralize(num, strObj, params) {
    if (num === NaN || num === undefined || num === null) {
        throw new Error('pluralize: requires number parameter');
    }

    const mergedParams = Object.assign({ number: num }, params);

    // pluralize
    if (num === 0) {
        return translate(strObj.zero, mergedParams);
    } else if (num === 1) {
        return translate(strObj.one, mergedParams);
    } else if (num >= 2) {
        return translate(strObj.twoOrMore, mergedParams);
    }
    return null;
}

