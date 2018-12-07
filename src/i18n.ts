
let currentLanguage: string = "en";

export type I18NFunction = (...args: any[]) => string | string[];

export interface I18NMessages {
    [name: string]: I18NFunction | string;
}

export type I18NMessagesProxy<T> = {
    [name in keyof T]: I18NMessageProxy<T[name]>;
};

export type I18NMessageProxy<T> =
    T extends string ? T :
    T extends (...args: any[]) => infer P ? (
        P extends string ? T :
        P extends string[] ? (...args: any[]) => string : never
    ) : never;

export const i18nManager = {
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
        type TProxy = I18NMessagesProxy<T>;
        return new Proxy<TProxy>(i18nManager as any as TProxy, {
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
