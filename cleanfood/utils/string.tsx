export function removeAccents(str) {
    var AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ',
        'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ'
    ]
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
        var char = AccentsMap[i][0]
        str = str.replace(re, char)
    }
    return str
}

export function removeAccentsToLower(str) {
    return removeAccents(str).toLowerCase()
}

export function removeAccentsToUpper(str) {
    return removeAccents(str).toUpperCase()
}

export function removeAccentsToSnack(str) {
    return removeAccents(str)
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9- ]/g, '')
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/ /g, '_')
}

export function removeSpaceInString(str) {
    return str.trim().replace(/\s+/g, '').replace(/ /g, '')
}

export function randomNumber() {
    const crypto = window.crypto || window.msCrypto
    let array = new Uint32Array(1)
    crypto.getRandomValues(array) // Compliant for security-sensitive use cases
    return array[0]
}
