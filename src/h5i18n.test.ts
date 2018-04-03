import i18n from "./h5i18n";

describe("h5i18n", () => {
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
    const p = i18n.proxy({
      en, ptBR,
    });
    i18n.nextLanguage = "en";
    expect(p.hi).toEqual("Hi");
    expect(p.hiYou("Maria")).toEqual("Hi Maria");
    i18n.nextLanguage = "ptBR";
    expect(i18n.currentLanguage).toEqual("ptBR");
    expect(p.hi).toEqual("Oi");
    expect(p.hiYou("Maria")).toEqual("Oi Maria");
  });
  it("incomplete", () => {
    const en = {
      hi: "Hi",
    };
    const ptBR = {
    } as any as typeof en;
    const p = i18n.proxy({
      en, ptBR,
    });
    i18n.nextLanguage = "en";
    expect(p.hi).toEqual("Hi");
    i18n.nextLanguage = "ptBR";
    expect(() => p.hi).toThrow("Current language was not implemented");
  });
  it("missing", () => {
    const en = {
      hi: "Hi",
    };
    const p = i18n.proxy({
      en,
    });
    i18n.nextLanguage = "en";
    expect(p.hi).toEqual("Hi");
    i18n.nextLanguage = "ptBR";
    expect(() => p.hi).toThrow("Current language was not implemented");
  });
});
