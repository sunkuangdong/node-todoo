// 能够获取本地homedir
const homedir = require('os').homedir();
// 能够获取到环境变量homedir
const home = process.env.HOME || homedir
// 路径文件
const p = require('path')
const fs = require('fs')
// 自动加上路径的/或\，因为mac和window的路径斜杠是反着的
const dbPath = p.join(home, '.todo')
// 优先使用环境变量

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            /*
                fs - 文件管理
                readFile - 读取文件
                dbPath - 处理好的路径，读取哪个文件
                {flag: 'a+'} - a+读取不到就会创建，a只是读取文件。
                    r是只读，如果用r打开一个文件就不能往里面添加/改写。
                    w是只写，如果用w打开一个文件就只能写了。
            */
            fs.readFile(path, {
                flag: 'a+'
            }, (error, data) => {
                if (error) {
                    return reject(error)
                }
                // 创建一个数组
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (err) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            // 文件里面只能存字符串
            const string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (error) => {
                error ? reject(error) : resolve()
            })
        })
    }
}
module.exports = db