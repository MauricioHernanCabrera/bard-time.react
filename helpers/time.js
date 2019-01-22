const leftPad = n => `0${n}`.substr(-2)

const finishedTheTimer = time =>
  time.get('hours') === 0 && time.get('minutes') === 0 && time.get('seconds') === 0

const findTimerIndex = (timers, id) => 
  timers.findIndex((t) => t.get('id') === id)

const findTimer = (timers, id) => 
  timers.find((t) => t.get('id') === id)

const advancedTime = (time, timeDefault) =>
  time.get('hours') !== timeDefault.get('hours') ||
  time.get('minutes') !== timeDefault.get('minutes') ||
  time.get('seconds') !== timeDefault.get('seconds')

const timeToSeconds = (time) => 
  time.get('hours') * 3600 +
  time.get('minutes') * 60 +
  time.get('seconds')

const percentageOfTime = (time, timeDefault) => {
  const timeInSeconds = timeToSeconds(time)
  const timeDefaultInSeconds = timeToSeconds(timeDefault)
  return timeInSeconds * 100 / timeDefaultInSeconds
}
export {
  leftPad,
  finishedTheTimer,
  findTimerIndex,
  findTimer,
  advancedTime,
  percentageOfTime,
  timeToSeconds
}