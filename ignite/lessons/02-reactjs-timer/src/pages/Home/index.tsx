import { HandPalm, Play } from '@phosphor-icons/react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { Countdown } from './components/Countdown'

const formValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(60),
})

type TimerFormData = zod.infer<typeof formValidationSchema>

interface Timer {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stoppedDate?: Date
  finishDate?: Date
}

interface TimerContextType {
  activeTimer: Timer | undefined
  activeTimerId: string | null
  markCurrentTimerAsFinished: () => void
  resetActiveTimerId: () => void
}

export const TimerContext = createContext({} as TimerContextType)

export function Home() {
  const [timerList, setTimerList] = useState<Timer[]>([])
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<TimerFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeTimer = timerList.find((timer) => timer.id === activeTimerId)

  function handleFormSubmit(data: TimerFormData) {
    const id = String(new Date().getTime())

    const newTimer: Timer = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    // setTimerList((state) => [...state, newTimer])
    setTimerList([...timerList, newTimer])
    setActiveTimerId(id)
    // setAmountSecondsPassed(0)

    reset()
  }

  function handleStopTimer() {
    setTimerList((state) =>
      state.map((timer) => {
        if (timer.id === activeTimerId) {
          return { ...timer, stoppedDate: new Date() }
        } else {
          return timer
        }
      }),
    )

    setActiveTimerId(null)
  }

  function markCurrentTimerAsFinished() {
    setTimerList((state) =>
      state.map((timer) => {
        if (timer.id === activeTimerId) {
          return { ...timer, finishDate: new Date() }
        } else {
          return timer
        }
      }),
    )
  }

  function resetActiveTimerId() {
    setActiveTimerId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormContainer>
          <label htmlFor="task">Working on</label>
          <TaskInput
            placeholder="Give a name to your project"
            type="text"
            id="task"
            list="task-suggestions"
            disabled={!!activeTimer}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            disabled={!!activeTimer}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <TimerContext.Provider
          value={{
            activeTimer,
            activeTimerId,
            markCurrentTimerAsFinished,
            resetActiveTimerId,
          }}
        >
          <Countdown />
        </TimerContext.Provider>

        {activeTimer ? (
          <StopCountdownButton type="button" onClick={handleStopTimer}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
