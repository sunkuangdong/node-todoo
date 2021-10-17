const fs = jest.genMockFromModule('fs')
// 原始的fs模块
const _fs = jest.requireActual('fs')
// 拷贝原始的fs模块
Object.assign(fs, _fs)

const readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
}
// 把原始的fs模块中readFile方法覆盖掉
fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in readMocks) {
        // mock的
        callback(...readMocks[path])
    } else {
        // 真正的 writeFile
        _fs.readFile(path, options, callback)
    }
}

const writeMocks = {}
fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}
// 覆盖掉 fs中原本的 writeFile 方法，进行测试
fs.writeFile = (path, data, options, callback) => {
    if (path in writeMocks) {
        // mock的
        writeMocks[path](path, data, options, callback)
    } else {
        // 真正的 writeFile
        _fs.writeFile(path, data, options, callback)
    }
}
module.exports = fs