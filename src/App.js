import { useState } from 'react'
import './App.css';
import Dog from './components/Dog'
import RefreshTimer from './components/RefreshTimer/index'

function App() {
  
  const [ dogImage1Src, setDogImage1Src ] = useState('');
  const [ dogImage2Src, setDogImage2Src ] = useState('');

  const [ timer1Active, setTimer1Active ] = useState(true);
  const [ timer2Active, setTimer2Active ] = useState(true);

  const startTimer1 = () => {
    setTimer1Active(true);
  }

  const startTimer2 = () => {
    setTimer2Active(true);
  }

  const stopTimer1 = () => {
    setTimer1Active(false);
  }

  const stopTimer2 = () => {
    setTimer2Active(false);
  }

  const getDogImage1 = async () => {

      await fetch('https://dog.ceo/api/breeds/image/random')
          .then(result => result.json())
          .then(data => {
              if(data.status !== 'success') {
                console.log(`Error retrieving dog image - ${data.message}`);
                return;
              }
              setDogImage1Src(data.message)
          })

  }
  
  const getDogImage2 = async () => {

    await fetch('https://dog.ceo/api/breeds/image/random')
        .then(result => result.json())
        .then(data => {
            if(data.status !== 'success') {
              console.log(`Error retrieving dog image - ${data.message}`);
              return;
            }
            setDogImage2Src(data.message)
        })

}


  return (
    <>
    <h1>Hello world</h1>

    <div style={{display: "inline-block", border: "1px solid black", padding: "8px", marginRight: "100px"}}>
      <RefreshTimer refreshInterval={2000} onRefresh={getDogImage1} isActive={timer1Active} component={<Dog imageSrc={dogImage1Src} />} />

        
      <div style={{display: "block", marginTop: "48px", textAlign: "center"}}>
        {
          timer1Active &&
          <button onClick={stopTimer1}>Stop timer</button>
        }
        {
          !timer1Active &&
          <button onClick={startTimer1}>Start timer</button>
        }
      </div>

    </div>
    
    <div style={{display: "inline-block", border: "1px solid red", padding: "8px"}}>
      <RefreshTimer refreshInterval={5000} onRefresh={getDogImage2} isActive={timer2Active} component={<Dog imageSrc={dogImage2Src} />} />
      
      <div style={{display: "block", marginTop: "48px", textAlign: "center"}}>
        {
          timer2Active &&
          <button onClick={stopTimer2}>Stop timer</button>
        }
        {
          !timer2Active &&
          <button onClick={startTimer2}>Start timer</button>
        }
      </div>

    </div>

    </>
  );
}

export default App;
