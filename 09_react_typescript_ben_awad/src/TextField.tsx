import React, { ChangeEventHandler, RefObject, useRef, useState } from 'react';
import { useReducer } from 'react';

interface Person {
  firstName: string;
  lastName: string;
}

interface Props {
  text: string;
  ok?: boolean;
  i?: number;
  fn?: (bob: string) => string;
  fn2?: (bob: string) => void;
  person: Person;
  obj?: {
    f1: string;
  };

  handleChange: ChangeEventHandler;
}

interface TextNode {
  text: string;
}

export const TextField: React.FC<Props> = ({ person, ok, handleChange }) => {
  // const [count, setCount] = useState<number | null | undefined | string>(5);
  // const [count, setCount] = useState<{ text: string }>({ text: 'hello' });
  const [count, setCount] = useState<TextNode>({ text: 'hello' });
  //setCount({ text: 'asd' });

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <input ref={inputRef} onChange={handleChange} />
    </div>
  );
};
