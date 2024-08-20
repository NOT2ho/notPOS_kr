import fs from 'fs'

const pos = (text) => {
    const str = text.replace(/([^가-힣a-zA-Z]*)/, " ")
    // console.log(str)
    const undefArr = str.split(' ')
    const arr = undefArr.splice(1, undefArr.length)
  // console.log(arr)
    let pos = ''
    let word = 'n'
    let tag = ''
    let res = []
	let regex = /nothing/
    
    const csvRead = (csv) => {
        let csvs = csv.toString().trim().split('\n')
        return csvs
    }
    const ifN = () => {
        try {
            const data = fs.readFileSync('./dic/dic__.csv')
            let pd = csvRead(data)
                .map(x => ({
                    word: x.split(',')[0],
                    tag: x.split(',')[1].slice(0, -2),
                }))
            for (let j in arr) {
                for (const { word, tag } of pd) {
                    if (arr[j].startsWith(word)=== true) {
                        res.push([word, tag])
                        console.log("true")
                        if (word.length != arr[j].length)
                            res.push([arr[j].slice(word.length, arr[j].length), 'J|X'])
                        pd = pd.splice(1, pd.length)
                        break
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
pos('냉동딸기 주스에 몸을 담근다 빨갛게 잠식된 나의 사랑 얘기 생딸기가 아니래도 좋아 F00으로 초기화된 변수 딸기 주스는 달콤하니까 눈을 뜬 그때는 사라지는 거야 덜컹거리는 전철 속에는 이미 떠나간 우리가 있었다')
