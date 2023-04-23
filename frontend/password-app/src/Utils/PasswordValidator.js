const MIN_LENGTH = 6
const MAX_LENGTH = 20

/**
 * 
 * @param {Int} arr 
 * @returns maximum number in the array
 */

const max = (arr) => {
    let max = 0
    if(arr.length > 0) {
        max = arr[0]
        for(let i in arr) {
            if(arr[i] > max){
                max = arr[i]
            }
        }
    }
    return max
}

/**
 * 
 * @param {string} password 
 * @param {int} index 
 * @returns the character that is missing and can be added in the password to meet the strong password constraints
 */

const chooseBestCharacter = (password, index) => {
    let filler = 'Z'
    if(!hasLower(password)) filler = 'z'
    else if(!hasDigit(password)) filler = '9'
    if(password[index] === filler) {
        let asciiCode = filler.charCodeAt() - 1
        filler = String.fromCharCode(asciiCode)
    }
    return filler
}

/**
 * 
 * @param {string} password 
 * @param {int} index 
 * @returns replace the character at the index by choosing the best possible character which will make password strong
 */

const changeCharacter = (password, index) => {
    let filler = chooseBestCharacter(password, index)
    return password.substring(0, index) + filler + password.substring(index + 1);
}

/**
 * 
 * @param {string} password 
 * @param {int} index 
 * @returns add the character at the index by choosing the best possible character which will make password strong
 */

const addCharacter = (password, index) => {
    let filler = chooseBestCharacter(password, index)
    return password.slice(0, index) + filler + password.slice(index);
}


/**
 * 
 * @param {string} password 
 * @returns the index which is safer to make the modification in order to make password stronger
 */
const findSafeIndex = (password) => {
    for(let i = 0; i < password.length - 1; i++) {
         let char = password[i]
         let passwordwithoutchar = password.slice(0, i) + password.slice(i + 1)
         if(hasUpper(char) && hasUpper(passwordwithoutchar)) return i
         if(hasLower(char) && hasLower(passwordwithoutchar)) return i
         if(hasDigit(char) && hasDigit(passwordwithoutchar)) return i
    }
    return 0
}


/**
 * 
 * @param {string} password 
 * @returns the starting index of the first occurrence of repeating characters of length greater than or equals to 3
 */

const findRepeatIndex = (password, passwordLength) => {
    let partitions = []
    let previousSplit = 0
    for(let i = 1; i < passwordLength; i++){
        if(password[i - 1] !== password[i]){
            partitions.push(password.substring(previousSplit, i))
            previousSplit = i
        }
    }
    partitions.push(password.substring(previousSplit, passwordLength))
    let partitionsLen = partitions.map(e => e.length)
    let maxPartitionLength = max(partitionsLen)
    if(maxPartitionLength < 3) return -1
    let mod1Index = -1
    let mod2Index = -1
    let index = 0
    let curlength = 0
    for(let i in partitions) {
        curlength = partitions[i].length
        if(curlength < 3){
            index += curlength
            continue
        }
        if(curlength % 3 === 0) return index
        if(curlength % 3 === 1 && mod1Index === -1) mod1Index = index
        if(curlength % 3 === 2 && mod2Index === - 1) mod2Index = index
        index += curlength
    }
        if(mod1Index > -1)  return mod1Index
        if(mod2Index > - 1) return mod2Index
    return 0
}

/**
 * 
 * @param {string} str 
 * @returns whether string has upper case character or not
 */

const hasUpper = (str) => {
    if(str.match(/[A-Z]/))  return true
    return false
}

/**
 * 
 * @param {string} str 
 * @returns whether string has lower case character or not
 */

const hasLower = (str) => {
    if(str.match(/[a-z]/)) return true
    return false
}

/**
 * 
 * @param {string} str 
 * @returns whether string has digit or not
 */

const hasDigit = (str) => {
    if(str.match(/\d/)) return true
    return false
}

/**
 * 
 * @param {string} password 
 * @param {int} passwordLength 
 * @returns whether the password meet the strong password constraints or not
 */

const isStrongPassword = (password, passwordLength) => {
    if(passwordLength < MIN_LENGTH) return false
    if(passwordLength > MAX_LENGTH) return false
    if(findRepeatIndex(password, passwordLength) > -1) return false
    if(hasUpper(password) && hasLower(password) && hasDigit(password)) return true
    return false
}

/**
 * 
 * @param {string} password 
 * @returns the minimum steps required to make the password strong
 */


const getMinStepsForStrongPassword = (password) => {
    let steps = 0
    /**
     * Looping the check until the password is identified as strong
     * Adding the steps at each iterations
     * making modifications in password to make it stronger password
     */
    while(true) {
        let repeat_index = findRepeatIndex(password, password.length)
        if(password.length < MIN_LENGTH){
            let index = 0
            if(repeat_index > -1) {
                index = repeat_index + 2
            }
            password = addCharacter(password, index)
        }
        else if(password.length > MAX_LENGTH) {
            let index = findSafeIndex(password)
            if(repeat_index > - 1){
                index = repeat_index + 2
            }
            password = password.slice(0, index) + password.slice(index + 1)
        }else {
            if(isStrongPassword(password, password.length)) break
            let index = findSafeIndex(password)
            if(repeat_index > - 1){
                index = repeat_index + 2
            }
            password = changeCharacter(password, index)
        }
        steps += 1
        if(isStrongPassword(password, password.length)) break
    }
    return steps
}   

export default getMinStepsForStrongPassword