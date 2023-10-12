import { HistoryContainer, HistoryList } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h2>My History</h2>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <td>Study Javascript</td>
            <td>20 minutes</td>
            <td>2 months ago</td>
            <td>In progress</td>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
