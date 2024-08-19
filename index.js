import fs from 'fs'



const pos = (text) => {
    const str = text.replace(/([^가-힣a-zA-Z]*)/, " ")
    // console.log(str)
    const undefArr = str.split(' ')
    const arr = undefArr.splice(1, undefArr.length)
  // console.log(arr)
    let pos = ''
    let word = 'n'
    let idx = 1
    let res = []
	let regex = /nothing/
    
    const csvRead = (csv) => {
        let csvs = csv.toString().split('\n')
        return csvs
    }
    const ifN = () => {
        try {
            const data = fs.readFileSync('./dic/dic__.csv')
            let pd = csvRead(data)
            for (let j in arr) {
                for (let i in pd) {
                    
                    word = pd[i].split(',')[0]
                    regex = new RegExp(`^(${word})`);
               
                    if (regex.test(arr[j]) === true) {
                        res.push(word)
                        console.log("true")
                        if (word.length != arr[j].length)
                            res.push(arr[j].slice(word.length, arr[j].length))
                        pd = pd.splice(1, pd.length)
                                   
                    }

                } 
            }return res
        }
        catch (err) {
            console.error(err)
        }
    }
console.log(ifN())
   // console.log(regex)
}
pos('너는 털이 징그럽게 난 짐승이다')