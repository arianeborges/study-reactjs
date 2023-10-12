import { Play } from '@phosphor-icons/react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Working on</label>
          <input type="text" id="task" />
          <label htmlFor="minutesAmount">for</label>
          <input type="text" id="minutesAmount" />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
