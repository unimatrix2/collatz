/**
 * @type {Array<number>} array para receber os números fatorados e prover uma condição de parada
 */
const stopArray = [];

/**
 * @type {Array<number>} array de referência para a condição de parada
 */
const stopReference = [4, 2, 1];

/**
 * 
 * @param {number} int O número a ser fatorado no problema
 */
export default function threeX(int) {
  if(!Number.isSafeInteger(int)) throw new Error('Integer out of range');
  if (stopArray.slice(-3).join('') === '421') return console.log(stopArray);
  if (int % 2 === 0) {
    stopArray.push(int);
    return threeX(int / 2)
  }
  stopArray.push(int);
  return threeX((int * 3) +1);
}

threeX(parseInt(process.argv[2]));