declare class Pos {
    preprocess: (text: string) => string;
    tag: (text: string) => Map<number, string[]> | undefined;
}
export { Pos };
