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
  maxWidth: 300,
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

function copyToClickBoard(text: string) {
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
      .then(() => {
        return true
      })
      .catch((err) => {
        return false
      })
  }
  return true
}

export const DatePicker: React.FunctionComponent = () => {
  const [time, setTime] = React.useState('')
  const [date, setDate] = React.useState<Date>()
  const [error, setError] = React.useState('')
  const [dateTime, setDateTime] = React.useState('')
  const [timeStamp, setTimeStamp] = React.useState('')

  React.useEffect(() => {
    if (time.length && !/_/.test(time)) {
      const result = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/.test(time)

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

  return (
    <div className={rootClass}>
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
      <MaskedTextField
        mask="99\:99"
        title="time"
        iconProps={iconProps}
        onChange={(e, value) => setTime(value ?? '')}
        errorMessage={error}
      />
      <br />
      <div>
        <b>timezone:</b> {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </div>
      <div>
        <b>date:</b> {dateTime}
      </div>
      <br />
      {timeStamp && timeStamp !== 'NaN' && !error && (
        <>
          <div>
            <b>reddit timestamp:</b> {`<t:${timeStamp}:F>`}
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
