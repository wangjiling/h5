var util = {
    /**
     * @param {string} key
     *
     */
    "getLocal": function (key) {
        if (!key) {
            return false;
        }
        if (window.localStorage) {
            var _s = window.localStorage.getItem(key);
            if (_s) {
                try {
                    return JSON.parse(_s);
                } catch (e) {
                    return _s;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    /**
     * @param {string} key
     * @param {obj | string | number} value
     */
    "setLocal": function (key, value) {
        if (!key || !value) return false;
        if (window.localStorage) {
            window.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } else {
            return false;
        }
    },
    "deleteLocal": function (key) {
        if (!key) {
            return false;
        }
        if (window.localStorage) {
            window.localStorage.removeItem(key);
        } else {
            return false;
        }
    },

    "getDeviceState": function () {
        var index = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);

        var states = {
            1: 'desktop',
            2: 'small-desktop',
            3: 'tablet',
            4: 'phone'
        };

        return states[index];
    },

    'isWX': /micromessenger/i.test(window.navigator.userAgent),
    'isQQ': /mobile mqqbrowser/i.test(window.navigator.userAgent),
    'isMobile': /(iphone|ipad|ipod|android|ios|symbianos|windows phone|windows ce|windows mobile|ucweb|midp|rv:1.2.3.4)/i.test(window.navigator.userAgent),
};