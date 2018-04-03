
let currentLanguage: string;

export type I18NFunction = (...args: any[]) => string | string[];

export interface I18NMessages {
    [name: string]: I18NFunction | string;
}

const i18n = {
    debug: false,
    get currentLanguage() {
        return currentLanguage;
    },
    set nextLanguage(value: string) {
        currentLanguage = value;
    },
    proxy<T extends I18NMessages>(languages: {
        [name: string]: T,
    }) {
        const err = new Error("Current language was not implemented");
        return new Proxy<T>(i18n as any as T, {
            get(target, prop) {
                const dict: any = languages[currentLanguage];
                if (!dict) { throw err; }
                const r = dict[prop];
                if (!r) { throw err; }
                if (typeof r === "function") {
                    // tslint:disable-next-line
                    return function () {
                        const rr = r.apply(null, arguments);
                        if (Array.isArray(rr)) { return rr.join(""); }
                        return rr;
                    };
                }
                return r;
            },
        });
    },
};

export default i18n;
