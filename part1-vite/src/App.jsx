import {useState} from "react";

const App = () => {
  const [leftNum, setLeft] = useState(0)
  const [rightNum, setRight] = useState(0)
  const [clickHis, setClickHis] = useState([])
  const [total, setTotal] = useState(0)

  const handleClick = (flag) => {
    if (flag === 'l') {
      setLeft(leftNum + 1)
      clickHis.push('L')
      setTotal(total+1)
    } else if (flag === 'r') {
      setRight(rightNum + 1)
      clickHis.push('R')
      setTotal(total+1)
    } else {
      setClickHis([])
      setRight(0)
      setLeft(0)
      setTotal(0)
    }
    console.log(clickHis)
  }


  return (<>
      <div>
        {leftNum}
        <button onClick={() => handleClick('l')}>L</button>
        <button onClick={() => handleClick('r')}>R</button>
        {rightNum}
      </div>
      <div>{clickHis.join(' ')}</div>
      <>
        Total:{total}<button onClick={() => handleClick('clear')}>clear</button>
      </>
    </>
  )
}

export default App