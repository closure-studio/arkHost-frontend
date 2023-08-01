const fs = require("fs")
fs.readFile("./StageTable.json", "utf8", (err, dataStr) => {
    const data = JSON.parse(dataStr)
    const stageTable = {}
    for (let k in data['stages']) {
        if (!k.includes('camp') && !k.includes('#f#') && !k.includes('bossrush') && !k.includes('act1lock_a') && !k.includes('act17d7_01') && !k.includes('lt_') && !k.includes('tr_')) {
            if (data['stages'][k]['apCost'] > 0) {
                let items = []
                for (let item of data['stages'][k]['stageDropInfo']['displayRewards']) {
                    if (item['dropType'] === 2 || item['dropType'] === 3) {
                        items.push(item['id'])
                    }
                }
                if (items.length > 0 || k.includes('act24side')) {
                    stageTable[k] = {
                        name: data['stages'][k]['name'],
                        code: data['stages'][k]['code'],
                        ap: data['stages'][k]['apCost'],
                        items: items
                    }
                }
            }
        }
    }
    console.log('analysis done')
    fs.writeFile("./public/data/Stage.json", JSON.stringify(stageTable), (err) => {
        if (err) {
            console.log(err)
        }
    })
})

fs.readFile("./item_table.json", "utf8", (err, dataStr) => {
    const data = JSON.parse(dataStr)
    const items = {}
    for (let k in data['items']) {
        items[k] = {
            name: data['items'][k]['name'],
            icon: data['items'][k]['iconId']
        }
    }
    console.log('analysis done')
    fs.writeFile("./public/data/Items.json", JSON.stringify(items), (err) => {
        if (err) {
            console.log(err)
        }
    })
})