import { useRef, useState } from "react";

function App() {
  const [value, setValue] = useState(5);
  const valueRef = useRef(value);

  const click = () => {
    setValue(value + 1)
  }

  return (
    <div>
      <button onClick={click}>increment by one</button>
      <h1>{value}</h1>
      <dl>
        <dt>Mood</dt>
        <dd>Sleepy</dd>
        <dd>Feeling good about myself</dd>
        
        <dt>Skill</dt>
        <dd>C# Backend: Professional</dd>
        <dd>React: Soon-To-Be-Professional</dd>
        <dd>HTML: Update in progress (what are these new dl tags are for?)</dd>
      </dl>
    </div>
  );
}

export default App;
