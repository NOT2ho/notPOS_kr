import fs from 'fs'


class Node {
constructor() {
    this.child = {};
    this.output = []
    this.fail = null
}

}

class AhoCorasick {
    constructor() {
        this.root = new Node();
    }

    insert(words) {
        let output = words
        let word = words[0]
        let node = this.root;
        for (let i in word) {
            const char = word[i];
            if (!node.child[char])
                node.child[char] = new Node();
            node = node.child[char];
        }
        node.output.push(output);
    }


    fail() {
        const que = []
        for (const i in this.root.child) {
            this.root.child[i].fail = this.root;
            que.push(this.root.child[i]);
        }
        while (que.length > 0) {
            const currentNode = que.shift();
            
            for (const i in currentNode.child) {
                que.push(currentNode.child[i]);

                let failNode = currentNode.fail;

                while (failNode !== null && !failNode.child[i]) {
                    failNode = failNode.fail;
                }
                
                if (currentNode == this.root) {

                }
                currentNode.child[i].fail = failNode ? failNode.child[i] || this.root : this.root;
                currentNode.child[i].output = currentNode.child[i].output.concat(currentNode.child[i].fail.output);
                //console.log(currentNode.output)
            }
            //      console.log(currentNode.output)
        }
        
    }


    search(input, cb) {
        let text = input
        let currentNode = this.root;
        for (let i in text) {
            
            const char = text[i];
    
            while (currentNode !== null && !currentNode.child[char])
                currentNode = currentNode.fail;
        
    
            currentNode = currentNode ? currentNode.child[char] || this.root : this.root;
                      
        
            for (const output of currentNode.output) {
                cb(i - output[0].length + 1, output);
             
             //   console.log(i,output)
                  
                
            }
            
        }
                
            
        
        
    }
        
    
}

class Pos {
    
    preprocess = (text) => {
        const str = text.replace(/([^가-힣a-zA-Z]*)/, " ")
        const undefArr = str.split(' ')
        const arr = undefArr.splice(1, undefArr.length)
        return arr
        
    }

    tag = (text) => {
       
        const ac = new AhoCorasick()
        let res = []
            try {
                const data = fs.readFileSync('./dic/dic__.csv')
                let pd = csvRead(data)

            for (let i in pd) {
                        let word = pd[i].slice(0, -1).split(',')
                    //    let tag = pd[i].split(',')[1].slice(0, -2)
                
                ac.insert(word)
                }


               /* const rec = (input) => {
                    if (idx > input.length) {
                        return 0
                    }
                    return rec(input.slice(
                        ac.search(input, (index, output) => {
                        res.push([index, output])
                            idx = idx + index
                       // console.log(idx, output)
                        })
                    ))
                    }*/
                
                //    rec(text)
                ac.search(text, (idx, output) => {
                    res.push([idx, output])
                })
                let result = []
                for (let i in res) {
                    if (res[i == 0 ? 1 :i-1][1]!= '')
                        //console.log(res[i][0])
                    if (res[i == 0 ? 1 : i - 1][0]!= res[i][0]) {
                       
                        result.push(res[i-1])
                    }
                }
                result.push(res[res.length-1])
               
               console.log(result)
               return result
            }
        
            catch (err) {
                console.error(err)
            }
        }
 }



const csvRead = (csv) => {
        let csvs = csv.toString().split('\n')
        return csvs
}
const pos = new Pos()
pos.tag('징그러운 짐승은 너무 징그럽고 징그럽기 때문에 징그럽다 그러므로 고양이이다 야옹')