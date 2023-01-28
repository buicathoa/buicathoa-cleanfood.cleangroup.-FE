import { useState, useEffect } from 'react'

export default function useInterval(value) {
    const [seconds, setSeconds] = useState(value)
    const [breakPoint, setbreakPoint] = useState(false)

    useEffect(() => {
        if (seconds > 0) {
            if (breakPoint) setbreakPoint(false)
            const handler = setTimeout(() => setSeconds(seconds - value), value * 1000)
            return () => {
                clearTimeout(handler)
            }
        } else {
            setbreakPoint(true)
            setSeconds(value)
        }
    })

    return breakPoint
}
