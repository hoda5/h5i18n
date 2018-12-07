export declare type I18NFunction = (...args: any[]) => string | string[];
export interface I18NMessages {
    [name: string]: I18NFunction | string;
}
export declare const i18nManager: {
    debug: boolean;
    readonly currentLanguage: string;
    nextLanguage: string;
    proxy<T extends I18NMessages>(languages: {
        [name: string]: T;
    }): T;
};
