import { useState } from 'react'


function App() {
  const [good,setGood]=useState(0);
  const [neutral,setNeutral]=useState(0);
  const [bad,setBad]=useState(0);
      
  const handleGood=()=>{
    const newGood=good+1;

    setGood(newGood)
  }
  const handleNeutral=()=>{
    const newNeutral=neutral+1;
    setNeutral(newNeutral)
  }
  const handleBad=()=>{
    const newBad=bad+1;
    setBad(newBad)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      
      <h2>STATISTICS:</h2>
    <Statistics goodVal={good}  neutralVal={neutral} badVal={bad}/>
      
    </div>
  )
}
const Button=(props)=>{
  return(
    <div>
    <button onClick={props.handleClick}>{props.text}</button>
    
    </div>
  )
}

const Statistics=(props)=>{
  if(props.goodVal>0 || props.neutralVal>0 || props.badVal>0){
    return(
    <div>
      <table>
        <tbody>
            <StatisticsLine title='good' val={props.goodVal}/>
      <StatisticsLine title='neutral' val={props.neutralVal}/>
      <StatisticsLine title='bad' val={props.badVal}/>
      
      <StatisticsLine title='all' val={props.goodVal+props.neutralVal+props.badVal}/>
      <StatisticsLine title='average' val={(props.goodVal-props.badVal)/(props.goodVal+props.neutralVal+props.badVal)}/>
      <StatisticsLine title='positive' val={((props.goodVal)/(props.goodVal+props.neutralVal+props.badVal))*100}/>
      
        </tbody>
      </table>
      
    </div>
  )
  }
  return(
    <div>
      No feedback received!
    </div>
  )
  
}

const StatisticsLine=(props)=>{
  return(
    <tr>
      <td>{props.title}</td>
      <td>{props.val}</td>
    </tr>
  )
}

export default App
