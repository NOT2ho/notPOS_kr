import fs from "fs";
import path from "path";
class Node {
  constructor() {
    this.child = /* @__PURE__ */ new Map();
    this.output = [];
    this.fail = null;
    this.end = false;
  }
}
class AhoCorasick {
  constructor() {
    this.root = new Node();
  }
  insert(words) {
    let output = words;
    let word = words[0];
    let node = this.root;
    for (const char of word) {
      if (!node.child.get(char))
        node.child.set(char, new Node());
      node = node.child.get(char) || this.root;
    }
    node.output.push(output);
    node.end = true;
  }
  fail() {
    const que = [];
    for (const [i, c] of this.root.child.entries()) {
      c.fail = this.root;
      que.push(c);
      while (que.length > 0) {
        const currentNode = que.shift();
        if (typeof currentNode === void 0)
          break;
        for (const i2 in currentNode?.child) {
          const nextNode = currentNode?.child.get(i2);
          if (nextNode == null)
            continue;
          que.push(nextNode);
          let failNode = currentNode.fail;
          while (failNode !== null && !failNode.child.get(i2)) {
            failNode = failNode.fail;
          }
          if (currentNode != this.root)
            nextNode.fail = failNode ? failNode.child.get(i2) || this.root : this.root;
          if (nextNode.fail !== null)
            nextNode.output = nextNode.output.concat(nextNode.fail.output);
        }
      }
    }
  }
  search(input) {
    this.fail();
    let text = input;
    let result = /* @__PURE__ */ new Map();
    let currentNode = this.root;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      while (currentNode !== null && !currentNode.child.get(char)) {
        currentNode = currentNode.fail;
      }
      currentNode = currentNode ? currentNode.child.get(char) || this.root : this.root;
      for (const output of currentNode.output) {
        let resultArray = result.get(i - output[0].length + 1) || [];
        resultArray.push(output);
        result.set(i - output[0].length + 1, resultArray);
      }
    }
    return result;
  }
}
class Pos {
  constructor() {
    this.preprocess = (text) => {
      const str = text.replace(/([^가-힣a-zA-Z]*)/, " ");
      const undefArr = str.split(" ");
      const arr = undefArr.splice(1, undefArr.length);
      return arr.toString();
    };
    this.tag = (text) => {
      const ac = new AhoCorasick();
      let res = /* @__PURE__ */ new Map();
      try {
        const data = fs.readFileSync(path.join(process.cwd(), "/node_modules/notpos_kr/dic/dic.csv"));
        const pd = data.toString().split("\n");
        for (let i of pd) {
          let word = i.slice(0, -1).split(",");
          ac.insert(word);
        }
        res = ac.search(text);
        const result = /* @__PURE__ */ new Map();
        for (let [i, x] of res.entries()) {
          const resultArray = x[x.length - 1] || [];
          result.set(i, resultArray);
        }
        let idx = 0;
        let key = 0;
        let ret = /* @__PURE__ */ new Map();
        let keys = Array.from(result.keys());
        for (let s of text) {
          if (idx >= text.length) break;
          key = keys[idx];
          const resv = result.get(idx) || [];
          if (resv.length == 0) {
            if (text[idx] != " ") {
              ret.set(idx, [text[idx], "UNK"]);
            }
            idx++;
          } else {
            ret.set(idx, resv);
            idx += resv[0].length;
          }
        }
        return ret;
      } catch (err) {
        console.error(err);
      }
    };
  }
}
export {
  Pos
};
//# sourceMappingURL=index.js.map
