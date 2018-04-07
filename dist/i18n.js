"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currentLanguage = "en";
var i18n = {
    debug: false,
    get currentLanguage() {
        return currentLanguage;
    },
    set nextLanguage(value) {
        currentLanguage = value;
    },
    proxy: function (languages) {
        var err = new Error("Current language was not implemented");
        return new Proxy(i18n, {
            get: function (target, prop) {
                var dict = languages[currentLanguage];
                if (!dict) {
                    throw err;
                }
                var r = dict[prop];
                if (!r) {
                    throw err;
                }
                if (typeof r === "function") {
                    // tslint:disable-next-line
                    return function () {
                        var rr = r.apply(null, arguments);
                        if (Array.isArray(rr)) {
                            return rr.join("");
                        }
                        return rr;
                    };
                }
                return r;
            },
        });
    },
};
exports.default = i18n;
//# sourceMappingURL=i18n.js.map