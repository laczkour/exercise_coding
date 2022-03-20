import React from 'react';
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
    </div>
  );
}

export default App;
