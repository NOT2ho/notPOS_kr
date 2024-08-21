import fs from 'fs'


class Node {
constructor() {
    this.child = {};
    this.output = []
    this.fail = null
    this.end = false
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
        node.end = true
    }


    fail() {
        const que = []
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
              //   console.log(currentNode , currentNode.child[char])
                currentNode = currentNode.fail;
            }
    
            currentNode = currentNode ? currentNode.child[char] || this.root : this.root;
       //    
        
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
            const data = fs.readFileSync('./dic/dic__.csv')
            let pd = csvRead(data)

            for (let i in pd) {
                let word = pd[i].slice(0, -1).split(',')
                //    let tag = pd[i].split(',')[1].slice(0, -2)
                
                ac.insert(word)
            }
            res = ac.search(text)
            let result = {}
            
            for (let i of Object.keys(res)) {
                result[i] = []
                        result[i].push(res[i][res[i].length-1])
                    }
            

       //   console.log(result)
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
                    //key += result[key][0]
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

const csvRead = (csv) => {
        let csvs = csv.toString().split('\n')
        return csvs
}
const pos = new Pos()
let poses = pos.tag('복잡계에 태어난 우리는 사랑이 무엇인지 알아 가고 / 스며들어 온 추억들에게 우리를 잊게 해 달라고 말해 본다 / 고립계에 태어난 너와 나에겐 서로가 서로의 전부였을까 / 생성되는 난수들은 의미 없이 죽어가')
console.log(poses)