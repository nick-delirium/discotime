import React from 'react'
import { DatePicker } from 'components/DatePicker'
import { FormatTable } from 'components/FormatTable'

const App: React.FC = () => {
  return (
    <div>
      <div className="madeby">
        <b>made by .delirium</b>
      </div>
      <DatePicker />
      <FormatTable />
    </div>
  )
}

export default App
