"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  Pos: () => Pos
});
module.exports = __toCommonJS(src_exports);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
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
        const data = import_fs.default.readFileSync(import_path.default.join(process.cwd(), "/node_modules/notpos_kr/dic/dic.csv"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pos
});
//# sourceMappingURL=index.cjs.map
