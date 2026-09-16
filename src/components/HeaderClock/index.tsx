'use client'

import React, { useEffect, useState } from 'react'

// en-GB rather than the browser's locale: it is the one that puts the day before
// the month. en-US would render "Sep 16" from the same options.
// hourCycle rather than hour12: with hour12: false some locales render midnight
// as 24:00 instead of 00:00. h23 is the one that always means 00–23.
const format = (date: Date) =>
  `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} · ${date.toLocaleTimeString(
    'en-GB',
    { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
  )}`

export const HeaderClock: React.FC = () => {
  // Empty until mounted: the server renders its own clock, and any time it
  // printed would differ from the client's by the time it hydrated.
  const [label, setLabel] = useState('')

  useEffect(() => {
    const tick = () => setLabel(format(new Date()))

    tick()
    // Once a second so the display flips promptly on the minute. Only the date,
    // hour and minute are rendered, so the state lands on the same string 59
    // times out of 60 and React skips the re-render.
    const id = setInterval(tick, 1000)

    return () => clearInterval(id)
  }, [])

  if (!label) {
    return null
  }

  return <span className="header-clock">{label}</span>
}
