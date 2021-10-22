import React from 'react'
import { DatePicker } from 'components/DatePicker'
import { FormatTable } from 'components/FormatTable'

const App: React.FC = () => {
  return (
    <div>
      <div className="madeby">
        <b>made by Delirium#0001</b>
      </div>
      <DatePicker />
      {window.innerWidth <= 768 ? null : <div className="textDescr">
        <b> available timestamp styles: </b>
      </div>}
      <FormatTable />
    </div>
  )
}

export default App
