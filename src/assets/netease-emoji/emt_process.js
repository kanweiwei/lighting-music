const fs = require('fs');
const config = require('./emt.json')
const keys=config.map(val=>val.split(' ')[1].split("=")[1].replace(/^\"|\"$/g,''))
const saveObj = {}
for(let i=0;i<keys.length;i++){
    saveObj[keys[i]] = config[i].replace(">",' align="absbottom">') //对齐方式
}
console.log(saveObj[18])
const dataStr = JSON.stringify(saveObj,null,4)
fs.writeFileSync('./emt_dict.json',dataStr)