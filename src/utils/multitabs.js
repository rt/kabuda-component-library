/**
 * This one checks to see if the CURRENT tab is a dublicate
 * See the link below if you want to implement a warning in the OTHER tabs that a new tab has opened
 * https://stackoverflow.com/questions/11008177/stop-people-having-my-website-loaded-on-multiple-tabs/45717724#45717724
 *
 * Compare our tab identifier associated with this session (particular tab)
 * with that of one that is in localStorage (the active one for this browser).
 * This browser tab is good if any of the following are true:
 * 1.  There is no localStorage Guid yet (first browser tab).
 * 2.  The localStorage Guid matches the session Guid.  Same tab, refreshed.
 * 3.  The localStorage timeout period has ended.
 *
 * If our current session is the correct active one, an interval will continue
 * to re-insert the localStorage value with an updated timestamp.
 *
 * Another thing, that should be done (so you can open a tab within 15 seconds of closing it) would be to do the following (or hook onto an existing onunload method):
 *      window.onunload = () => {
                localStorage.removeItem(localStorageTabKey);
      };
      */
export const testDuplicateTab = function (localStorage, sessionStorage) {
    const localStorageTimeout = 15 * 1000; // 15,000 milliseconds = 15 seconds.
    const localStorageResetInterval = 10 * 1000; // 10,000 milliseconds = 10 seconds.
    const localStorageTabKey = 'test-application-browser-tab';
    const sessionStorageGuidKey = 'browser-tab-guid';

    function createGUID() {
        const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            /*eslint-disable*/
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            /* eslint-enable */
            return v.toString(16);
        });

        return guid;
    }
    const sessionGuid = sessionStorage.getItem(sessionStorageGuidKey) || createGUID();
    const tabObj = JSON.parse(localStorage.getItem(localStorageTabKey)) || null;

    sessionStorage.setItem(sessionStorageGuidKey, sessionGuid);

    // If no or stale tab object, our session is the winner.  If the guid matches, ours is still the winner
    if (tabObj === null || (tabObj.timestamp < new Date().getTime() - localStorageTimeout) || tabObj.guid === sessionGuid) {
        function setTabObj() {
            const newTabObj = {
                guid: sessionGuid,
                timestamp: new Date().getTime(),
            };
            localStorage.setItem(localStorageTabKey, JSON.stringify(newTabObj));
        }
        setTabObj();
        setInterval(setTabObj, localStorageResetInterval);
        return false;
    }
    // An active tab is already open that does not match our session guid.
    return true;
};
