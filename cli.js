const program = require("commander");
const api = require('./index.js')
const pkg = require('./package.json')

// commander 
// node index -h 是默认提供的

program
    .version(pkg.version)


// 如果想执行 add
// node index add 先拿钱 再拿书
// 先拿钱 再拿书 会作为action回调函数的参数，然后执行action的回调函数
let words = null
program
    .command('add') // 如果是有多个参数，要删除掉<taskName>
    .description('add a task')
    .action((...args) => {
        words = args.slice(0, -1).join(',')
        api.add(words).then(() => {
            console.log('添加成功')
        }, () => {
            console.log('添加失败')
        })
    })
// command 表示执行命令 node index clear
// description 提示文案
// action 具体执行的动作
program
    .command('clear')
    .description('clear all')
    .action(() => {
        api.clear(words).then(() => {
            console.log('清除成功')
        }, () => {
            console.log('清除失败')
        })
    })
program.parse(process.argv);

// process.argv 能够让你看到用户都传了哪些参数
if (process.argv.length === 2) {
    // 用户直接进行展示
    void api.showAll()
}

// 这就是 node 命令行