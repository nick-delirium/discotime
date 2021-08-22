import React from 'react'
import { DatePicker } from 'components/DatePicker'
import { FormatTable } from 'components/FormatTable'

const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 30, width: 400, textAlign: 'center' }}>
        <b>made by Delirium#0001</b>
      </div>
      <DatePicker />
      <div style={{ margin: '20px 0 20px', textAlign: 'center', width: 400 }}>
        <b> available timestamp styles: </b>
      </div>
      <FormatTable />
    </div>
  )
}

export default App
