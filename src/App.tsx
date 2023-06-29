import classNames from 'classnames'
import { useRef, useState } from 'react'

const MAX_FLOOR = 11

const App = () => {
  const elevatorRef = useRef<HTMLDivElement>(null)
  const floors = Array.from(Array(MAX_FLOOR).keys()).reverse()

  const [floor, setFloor] = useState(0)

  const select = (number: number) => {
    const delay = Math.abs(floor - number) * 0.5
    elevatorRef.current!.style.transition = `bottom ${delay}s linear`
    setFloor(number)
    const button = document.querySelector(`.floor:nth-child(${floors.length - number}) .button`) as HTMLDivElement
    setTimeout(() => {
      if (button) button.classList.add('arrived')
    }, delay * 1000)
  }

  return (
    <div className='app'>
      {floors.map(number => (
        <div className='floor' key={number}>
          <div className={classNames('button', { selected: floor === number })} onClick={() => select(number)}>
            {number}
          </div>
          <div className='space' />
        </div>
      ))}
      <div ref={elevatorRef} className='elevator' style={{ bottom: `${50 * floor}px` }}>
        <div className='door' />
      </div>
    </div>
  )
}

export default App
