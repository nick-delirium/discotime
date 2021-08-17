import React from 'react'
import { DatePicker } from './components/DatePicker'

const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 100, width: 310, textAlign: 'center' }}>
        made by Delirium#0001
      </div>
      <DatePicker />
    </div>
  )
}

export default App
