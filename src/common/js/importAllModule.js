/**
 * @description 批量导入API
 * @param {Object} context 上下文对象
 * @param {RegExp} reg 匹配规则
 * @returns {Object} 对象
 */
function importAllModule(context, reg) {
    const map = {}
    let tmp = {}
    for (let key of context.keys()) {
        const keyArr = key.split('/')
        keyArr.shift()
        map[keyArr.join('.').replace(reg, '')] = context(key).default
    }
    for (let key in map) {
        tmp = {
            ...tmp,
            ...map[key]
        }
    }
    return tmp
}

export default importAllModule