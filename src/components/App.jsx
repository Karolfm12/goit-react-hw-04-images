import { useState } from 'react';
import { INITIAL_VALUES } from './initial-values';

export const App = () => {
  const [data, setData] = useState(INITIAL_VALUES);

  const handleOnChange = e => {
    // setData({ q: e.target.value });
    setData(prev => ({
      ...prev,
      q: e.target.value,
    }));
  };
  const handleOnSubmit = () => {};
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type="text" onChange={handleOnChange}></input>
        <button type="submit">Search</button>
      </form>
      <p>{data.q}</p>
    </>
  );
};
