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

export const getCalendarData = (events) => {
  return events.filter((item) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth()+1) < 10 ? ('0'+ (date.getMonth()+1)) : (date.getMonth()+1);
    return item.DailyDate.indexOf(year + '/' + month) > -1
  })
}