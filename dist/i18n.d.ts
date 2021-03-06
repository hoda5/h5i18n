export declare type I18NFunction = (...args: any[]) => string | string[];
export interface I18NMessages {
    [name: string]: I18NFunction | string;
}
export declare type I18NMessagesProxy<T> = {
    [name in keyof T]: I18NMessageProxy<T[name]>;
};
export declare type I18NMessageProxy<T> = T extends string ? T : T extends (...args: infer P) => infer R ? (R extends string ? T : R extends string[] ? (...args: P) => string : never) : never;
export declare const i18nManager: {
    debug: boolean;
    readonly currentLanguage: string;
    nextLanguage: string;
    proxy<T extends I18NMessages>(languages: {
        [name: string]: T;
    }): I18NMessagesProxy<T>;
};
