import { i18nManager } from "./i18n";

describe("i18n", () => {
  it("hi", () => {
    const en = {
      hi: "Hi",
      hiYou(name: string) {
        return ["Hi ", name];
      },
    };
    const ptBR = {
      hi: "Oi",
      hiYou(name: string) {
        return ["Oi ", name].join("");
      },
    };
    const p = i18nManager.proxy({
      en, ptBR,
    });
    expect(p.hi).toEqual("Hi");
    expect(p.hiYou("Maria")).toEqual("Hi Maria");
    i18nManager.nextLanguage = "ptBR";
    expect(i18nManager.currentLanguage).toEqual("ptBR");
    expect(p.hi).toEqual("Oi");
    expect(p.hiYou("Maria")).toEqual("Oi Maria");
  });
  it("incomplete", () => {
    const en = {
      hi: "Hi",
    };
    const ptBR = {
    } as any as typeof en;
    const p = i18nManager.proxy({
      en, ptBR,
    });
    i18nManager.nextLanguage = "en";
    expect(p.hi).toEqual("Hi");
    i18nManager.nextLanguage = "ptBR";
    expect(() => p.hi).toThrow("Current language was not implemented");
  });
  it("missing", () => {
    const en = {
      hi: "Hi",
    };
    const p = i18nManager.proxy({
      en,
    });
    i18nManager.nextLanguage = "en";
    expect(p.hi).toEqual("Hi");
    i18nManager.nextLanguage = "ptBR";
    expect(() => p.hi).toThrow("Current language was not implemented");
  });
});
