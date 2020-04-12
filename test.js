var path = require("path");
var fs = require("fs");

let total = 0
let chineseCount = 0

let filePath = path.join(__dirname, ".");

function run() {
    let dirs = fs.readdirSync(filePath)
    for (var i= 0; i < dirs.length;i++){
        if (dirs[i].split(".")[1] === "md") {
            console.log(dirs[i])
            var data = fs.readFileSync(path.join(__dirname, ".", dirs[i]))
            chineseCount += countChinese(data.toString())
            total += data.toString().length
        }
    }
    console.log(dirs.length)
    console.log(chineseCount)
    console.log(total)
}

function countChinese(str){
    var m=str.match(/[\u4e00-\u9fff\uf900-\ufaff]/g);
    return (!m?0:m.length);
}

run()