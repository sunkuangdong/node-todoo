const db = require('../db.js')
// 引入fs之后，会被下面假的fs替代
const fs = require('fs')
// jest 单元测试不应该与外界有任何联系
// 比如我们在创建文件，测试是否能够从硬盘中读取文件
// 如果硬盘中已经存在你创建的文件那就可能出错
// 这时候jest提供了一个mock，提供给你假的环境
jest.mock('fs')
describe('db', () => {
    it('can read', async () => {
        const data = [{
            title: 'hi',
            done: true
        }]
        // 用Mock中的方法
        fs.setReadFileMock('/xxx', null, JSON.stringify(data))
        // 里面用的 readFile 被我覆盖掉了，仅用来测试
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })

    it('can write', async () => {
        let fakeFile
        fs.setWriteFileMock('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{
            title: '给宝儿买个ip',
            done: true
        }]
        // 里面的writeFile被我覆盖掉了
        await db.write(list, '/yyy')
        expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    })
})