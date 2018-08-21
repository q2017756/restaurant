export const getTimeList = () => {
  let list = []
  let i = 0
  while (i < 24) {
    if(i<10) i = `0${i}`
    list.push(`${i}：00`)
    list.push(`${i}：30`)
    i++
  }
  return list
}