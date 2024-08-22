declare class Pos {
    preprocess: (text: string) => string;
    tag: (text: string) => string[][] | undefined;
}
export { Pos };
