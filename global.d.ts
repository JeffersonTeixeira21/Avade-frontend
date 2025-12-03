declare global {
  interface Window {
    VLibras: {
      Widget: new (url: string) => any;
    };
  }
}
export {};
