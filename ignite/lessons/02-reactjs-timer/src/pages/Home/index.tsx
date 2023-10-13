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
import { useState } from 'react'

const formValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(60),
})

type TimerFormData = zod.infer<typeof formValidationSchema>

interface Timer {
  id: string
  task: string
  minutesAmount: number
}

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

  function handleFormSubmit(data: TimerFormData) {
    const id = String(new Date().getTime())

    const newTimer: Timer = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    // setTimerList((state) => [...state, newTimer])
    setTimerList([...timerList, newTimer])
    setActiveTimerId(id)

    reset()
  }

  const activeTimer = timerList.find((timer) => timer.id === activeTimerId)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="">
        <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
