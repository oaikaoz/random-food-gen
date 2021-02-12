/**
 * transfer fee  
 */
const doge_trans_fee = 50
const bitkub_BS_fee = 0.9975
const satang_BS_fee = 0.998

/**
 * function call 
 * @param {number} dogeSat 
 * @param {number} dogeBit 
 */
const calCoin = (dogeSat, dogeBit) => {
  let coin, diff, result = 0;

  if (dogeBit >= (dogeSat * 1.01)) {
    diff = dogeBit - dogeSat
    coin = (50 + (doge_trans_fee * bitkub_BS_fee)) / (diff * satang_BS_fee * bitkub_BS_fee)
    result = ((((coin- doge_trans_fee) * dogeBit * bitkub_BS_fee)) - coin * bitkub_BS_fee * satang_BS_fee * dogeBit)
    return (`
    Need more than ${coin} 
    on Bitkub
    Profit ${result}
    `)
  }

  if (dogeSat >= (dogeBit * 1.01)) {
    diff = dogeSat - dogeBit
    coin = (50 + (doge_trans_fee * satang_BS_fee)) / (diff * satang_BS_fee * bitkub_BS_fee)
    result = ((((coin- doge_trans_fee) * dogeBit * satang_BS_fee)) - coin * bitkub_BS_fee * satang_BS_fee * dogeBit)
    return (`
    Need more than ${coin} 
    on Bitkub
    Profit ${result} Bath
    `)
  }
  return  `diff price < 1% `
}
export default calCoin
