# RefreshTimer component

This component can be used in a React project to update a component at regular intervals.

## Usage

```
<RefreshTimer 
    component={<Dog imageSrc={dogImageSrc} />} 
    onRefresh={getDogImage} 
    refreshInterval={2000} 
    isActive={timer1Active}
/>
```

## Parameters

The following parameters are required:

### component

The component that is to be refreshed. This should be a single React JSX node.

### onRefresh

A function that will be called at regular intervals.
This can be used to update the state of the child component

### refreshInterval

Integer. The number of milliseconds between calls to the ***onRefresh*** function

### isActive

Boolean. Can be used to set the initial state of the timer. When this is set to false, the timer will not run.

## Example

***App.js***
```
function App() {
  
  const [ dogImageSrc, setDogImageSrc ] = useState('');
  const [ timerActive, setTimerActive ] = useState(true);

  const startTimer = () => { setTimerActive(true); }
  const stopTimer = () => { setTimerActive(false); }

  const getDogImage = async () => {

      await fetch('https://dog.ceo/api/breeds/image/random')
          .then(result => result.json())
          .then(data => {
              if(data.status !== 'success') {
                console.log(`Error retrieving dog image - ${data.message}`);
                return;
              }
              setDogImageSrc(data.message)
          })
    }

  return (
    <>
    <h1>RefreshTimer Example</h1>

    <div style={{display: "inline-block", border: "1px solid black", padding: "8px"}}>
      <RefreshTimer refreshInterval={2000} onRefresh={getDogImage} isActive={timerActive} component={<Dog imageSrc={dogImageSrc} />} />
        
      <div style={{display: "block", marginTop: "48px", textAlign: "center"}}>
        {
          timerActive &&
          <button onClick={stopTimer}>Stop timer</button>
        }
        {
          !timerActive &&
          <button onClick={startTimer}>Start timer</button>
        }
      </div>

    </div>    
    </>
  );
}
```