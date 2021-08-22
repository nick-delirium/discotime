import React from 'react'
import {
  DatePicker as DatePickerUI,
  mergeStyles,
  defaultDatePickerStrings,
  initializeIcons,
  MaskedTextField,
  DefaultButton,
} from '@fluentui/react'
import { format, parse, getUnixTime } from 'date-fns'

initializeIcons()

const rootClass = mergeStyles({
  minWidth: 310,
  selectors: { '> *': { margin: '0 auto' } },
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: 15,
  borderRadius: 10,
  background: 'rgba(255, 255, 255, 0.1)',
})
const iconClass = mergeStyles({
  color: 'black',
  fontSize: 16,
  lineHeight: 18,
  position: 'absolute',
  right: 4,
  padding: '7px 5px 5px',
})
const iconProps = { iconName: 'TimePicker', className: iconClass }

const copyToClickBoard = (text: string) => {
  if (!navigator.clipboard) {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  } else {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log('ok'))
      .catch((err) => {
        console.error(err)
      })
  }
}

export const DatePicker: React.FunctionComponent = () => {
  const [time, setTime] = React.useState('')
  const [date, setDate] = React.useState<Date>()
  const [error, setError] = React.useState('')
  const [dateTime, setDateTime] = React.useState('')
  const [timeStamp, setTimeStamp] = React.useState('')

  React.useEffect(() => {
    console.log(time)
    if (time.length === 5) {
      const result = /^([0-9]|0[0-9]|1[0-9]|2[0-3])?(:([0-5]|[0-5][0-9])?)?$/.test(
        time,
      )

      result ? setError('') : setError('Wrong time format')
    } else {
      setError('')
    }
  }, [time])
  React.useEffect(() => {
    if (date && time.length && !/_/.test(time)) {
      const dateStr = format(date, 'dd.MM.yyyy')
      const dateTime = `${dateStr} ${time}`

      setDateTime(dateTime)
      setTimeStamp(`${getUnixTime(parse(dateTime, 'dd.MM.yyyy HH:mm', new Date()))}`)
    }
  }, [date, time])

  const rn = new Date()
  const currTime = format(rn, 'HH:mm')
  return (
    <div className={rootClass}>
      <b>How to make universal timestamp:</b>
      <br />
      <b>1. Pick a date</b>
      <DatePickerUI
        placeholder="Select a date..."
        ariaLabel="Select a date"
        strings={defaultDatePickerStrings}
        highlightCurrentMonth
        highlightSelectedMonth
        initialPickerDate={new Date()}
        onSelectDate={(date) => date && setDate(date)}
        showGoToToday
        value={date}
        formatDate={(date) => (date ? format(date, 'MMMM do, yyyy') : '')}
      />
      <br />
      <b>2. Write time in 24h format</b>
      <MaskedTextField
        placeholder={currTime}
        maskChar=""
        mask="99\:99"
        title="time"
        iconProps={iconProps}
        onChange={(e, value) => setTime(value ?? '')}
        errorMessage={error}
      />
      <br />
      {timeStamp && timeStamp !== 'NaN' && !error && (
        <>
          <div>
            <b>date:</b> {dateTime}
          </div>
          <br />
          <div>
            <b>discord timestamp:</b> {`<t:${timeStamp}:F>`}
          </div>
          <br />
          <DefaultButton
            text="Click to copy"
            onClick={() => copyToClickBoard(`<t:${timeStamp}:F>`)}
          />
        </>
      )}
    </div>
  )
}
