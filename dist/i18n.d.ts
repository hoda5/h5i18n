export declare type I18NFunction = (...args: any[]) => string | string[];
export interface I18NMessages {
    [name: string]: I18NFunction | string;
}
declare const i18n: {
    debug: boolean;
    readonly currentLanguage: string;
    nextLanguage: string;
    proxy<T extends I18NMessages>(languages: {
        [name: string]: T;
    }): T;
};
export default i18n;
