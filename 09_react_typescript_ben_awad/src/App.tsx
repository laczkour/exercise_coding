import React from 'react';
import { Counter } from './Counter';
import { TextField } from './TextField';

function App() {
  return (
    <div>
      <TextField
        text="hello"
        person={{ firstName: '', lastName: '' }}
        handleChange={(event) => {
          console.log(event.isDefaultPrevented());
        }}
      />
      <Counter>
        {(count, setCount) => (
          <div>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        )}
      </Counter>
    </div>
  );
}

export default App;
