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
            let idx = 0
            for (let i of Object.keys(res)) 
                        result[i].push(res[i][res[i].length-1])
                    
            

           console.log(result)
            result.push(res[res.length - 1])
            let ret = []
            const set = new Set()
            ret.push(result[0][1])
            for (let i = 0; i < result.length - 2; i++) {
                //    console.log(result[i + 1][1][0], result[i + 2][1][0])
                if (result[i][1][0][result[i][1][0].length - 1] != result[i + 1][1][0][0]) {
                    //   console.log(result[i+1][1][0] + ' ' + result[i][1][0][result[i][1][0].length-1] + (result[i][1][0][result[i][1][0].length-1] != result[i + 1][1][0][0])+ result[i + 1][1][0][0])
                     
                    if (result[i][1][0][result[i][1][0].length - 1] != result[i + 1][1][0][0]) {
                        ret.push(result[i + 1][1])
                    }        
                         
                } else if (result[i+1][1][0].includes(result[i+1][1][0]) & (result[i+1][1][0].length-1)) {
                             //  console.log(result[i][1][0], result[i + 1][1][0])
                    ret.push(result[i+2][1])
                     //  console.log(result[i + 1][1][0],result[i + 2][1][0])    
                           }
                
                

            }
          //                 console.log(ret)
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
pos.tag('넌 모르는 거야그날의 너의 뒷모습을 웃으며 다시 보자는 그 마지막 말에 섞여 있던 크고 빨간 상처자국을 아무 의미 없는 거야 남은 건 작은 기억 하나 언젠가 우주선 수리가 끝나던 날에 손을 흔들며 웃어 보인 너의 모습')