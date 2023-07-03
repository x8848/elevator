import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { getFloors } from './utils'

const MAX_FLOOR = 11
const TIME_PER_FLOOR = 500
const floors = Array.from(Array(MAX_FLOOR).keys()).reverse()

const App = () => {
  const [current, setCurrent] = useState(0)
  const [calls, setCalls] = useState<number[]>([])
  const [nextFloors, setNextFloors] = useState<number[]>([])

  useEffect(() => {
    if (calls.length === 0) return
    const next = calls[0]
    if (nextFloors.includes(next)) return
    setNextFloors(getFloors(current, next))
  }, [calls])

  useEffect(() => {
    if (nextFloors.length === 0) return
    const next = nextFloors[0]
    const timer = setTimeout(() => {
      setCurrent(next)
      const other = nextFloors.filter(floor => floor !== next)
      setNextFloors(other)
      if (calls.includes(next) || other.length === 0) setCalls(calls.filter(floor => floor !== next))
    }, TIME_PER_FLOOR)
    return () => clearTimeout(timer)
  }, [nextFloors])

  return (
    <div className='app'>
      {floors.map(floor => (
        <div className='floor' key={floor}>
          <div
            className={classNames('button', { selected: calls.includes(floor) })}
            onClick={() => setCalls([...calls, floor])}
          >
            {floor}
          </div>
          <div className='space' />
        </div>
      ))}
      <div className='elevator' style={{ bottom: `${50 * current}px` }}>
        <div className='door' />
      </div>
    </div>
  )
}

export default App
