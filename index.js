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
        }
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
        }
        
    }


    search(input) {
    this.fail()
        let text = input
        let result = []
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
                result.push([i - output[0].length + 1, output])
      //       console.log([i - output[0].length + 1, output])
                  
                
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
        let res = []
            try {
                const data = fs.readFileSync('./dic/dic__.csv')
                let pd = csvRead(data)

            for (let i in pd) {
                        let word = pd[i].slice(0, -1).split(',')
                    //    let tag = pd[i].split(',')[1].slice(0, -2)
                
                ac.insert(word)
                }
                res = ac.search(text)
                
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
pos.tag('새빨간 액체에 잠겨 너를 사랑했다는 사실들도 모두 녹아 버렸던 걸까 붉은 수평선 너머로 웃어 봐')