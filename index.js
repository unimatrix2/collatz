/**
 * @type {Array<number>} array para receber os números fatorados
 */
const factoredArray = [];

/**
 * @type {Array<number>} array de referência para a condição de parada
 */
const stopReference = [4, 2, 1];

/**
 * @type {number} variável para rastrear o comprimento do array factoredArray
 */
let factoredArrayLength = 0;

/**
 * 
 * @param {number} int O número a ser fatorado no problema
 * @returns {threeX | string} Retorna uma chamada da função threeX ou a string com o array factoredArray
 */
export default function threeX(int) {
  if(!Number.isSafeInteger(int)) throw new Error('Integer out of range');
  if (factoredArrayLength >= 3 && 
    factoredArray[factoredArrayLength - 3] === stopReference[0] &&
    factoredArray[factoredArrayLength - 2] === stopReference[1] &&
    factoredArray[factoredArrayLength - 1] === stopReference[2]) {
  return console.log(JSON.stringify(factoredArray));
}
  if (int % 2 === 0) {
    factoredArray.push(int);
    factoredArrayLength++;
    return threeX(int / 2)
  }
  factoredArray.push(int);
  factoredArrayLength++;
  return threeX((int * 3) +1);
}

threeX(parseInt(process.argv[2]));