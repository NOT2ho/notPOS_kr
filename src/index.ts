import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

class Node {
    child: object;
    output: any[]
    fail: null | Node
    end : boolean

    
constructor() {
    this.child = {};
    this.output = []
    this.fail = null
    this.end = false
}

}

class AhoCorasick {
    root: Node
    constructor() {
        this.root = new Node();
    }

    insert(words: any) {

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
        node.end = true
    }


    fail() {
        const que : Node[] = []
        for (const i in this.root.child) {
            this.root.child[i].fail = this.root;
              que.push(this.root.child[i]);
          
            while (que.length > 0) {
                 const currentNode = que.shift();
                
            
            
                for (const i in currentNode.child) {
                    const nextNode = currentNode.child[i]

                    if (nextNode == null)
                        continue
                
                    que.push(nextNode);

                    let failNode = currentNode.fail;

                    while (failNode !== null && !failNode.child[i]) {
                        failNode = failNode.fail;
                    }
                
                    if (currentNode != this.root)

                
                    nextNode.fail = failNode ? failNode.child[i] || this.root : this.root;
                    nextNode.output = nextNode.output.concat(nextNode.fail.output);
                
                }
        
        
            }}

        }
    search(input) {
        this.fail()
        let text = input
        let result = {}
        let currentNode = this.root;
        for (let i in text) {
            
            const char = text[i];
            while (currentNode !== null && !currentNode.child[char]) {
              
                currentNode = currentNode.fail;
            }
    
            currentNode = currentNode ? currentNode.child[char] || this.root : this.root;
       
        
            for (const output of currentNode.output) {
                
                    result[i - output[0].length + 1] =[]
             result[i - output[0].length + 1].push(output)
      
                  
                
            }
            
        }
                
            return result
        
        
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
        let res = {}
        try {
            const data = fs.readFileSync(__dirname + '/node_modules/notpos_kr/dic/dic.csv')
            const pd = data.toString().split('\n')

            for (let i in pd) {

                let word = pd[i].slice(0, -1).split(',')
                
                
                ac.insert(word)
            }
            res = ac.search(text)
            let result = {}
            
            for (let i of Object.keys(res)) {
                result[i] = []
                        result[i].push(res[i][res[i].length-1])
                    }
            

       
            let idx = 0
            let key = 0
            let ret = {}
            let keys = Object.keys(result)
          for (let i in text)
           {
               key = Number(keys[idx])
               if (!result[idx]) {
                     if (text[idx] != ' '){
                    ret[idx] =[text[idx], 'UNK']
                    idx++
                   }
                   else idx++
                    
                } else 
                  {
                    
                   ret[idx] = result[idx][0];
                     idx += result[idx][0][0].length
                }
                
                    }
                
            let out = []
            for (let i of Object.values(ret))
                if (i[0])
                out.push(i)
            return  out
            }
                    
    
        
        catch (err) {
            console.error(err)
        }
    }
 

}


export {Pos}