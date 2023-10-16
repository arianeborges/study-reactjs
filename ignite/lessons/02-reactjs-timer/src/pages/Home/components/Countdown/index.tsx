import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { TimerContext } from '../..'
import { differenceInSeconds } from 'date-fns'

export function Countdown() {
  const {
    activeTimer,
    activeTimerId,
    markCurrentTimerAsFinished,
    resetActiveTimerId,
  } = useContext(TimerContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = activeTimer ? activeTimer.minutesAmount * 60 : 0
  const currentSeconds = activeTimer ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeTimer) {
      interval = setInterval(() => {
        const resultOfDifferenceInSeconds = differenceInSeconds(
          new Date(),
          activeTimer.startDate,
        )

        if (resultOfDifferenceInSeconds >= totalSeconds) {
          markCurrentTimerAsFinished()
          setAmountSecondsPassed(totalSeconds)
          resetActiveTimerId()
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(resultOfDifferenceInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeTimer,
    activeTimerId,
    markCurrentTimerAsFinished,
    resetActiveTimerId,
    totalSeconds,
  ])

  useEffect(() => {
    if (activeTimer) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Timer'
    }
  }, [activeTimer, minutes, seconds])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
