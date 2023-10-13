import { Play } from '@phosphor-icons/react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

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
}

export function Home() {
  const [timerList, setTimerList] = useState<Timer[]>([])
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeTimer = timerList.find((timer) => timer.id === activeTimerId)

  const { register, handleSubmit, watch, reset } = useForm<TimerFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  useEffect(() => {
    if (activeTimer) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeTimer.startDate),
        )
      }, 1000)
    }
  }, [activeTimer])

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

    reset()
  }

  const totalSeconds = activeTimer ? activeTimer.minutesAmount * 60 : 0
  const currentSeconds = activeTimer ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
