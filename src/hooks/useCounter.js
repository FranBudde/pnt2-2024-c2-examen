import { useState } from "react";

export default function useCounter(initialValue = 1) {
  const [counter, setCounter] = useState(initialValue); 
  
  const increment = (value = 1) => {
    setCounter(prev => prev + value); 
  }

  const decrement = (value = 1) => {
    setCounter(prev => Math.max(1, prev - value)); 
  }

  const reset = () => {
    setCounter(initialValue); 
  }
  
  return {
    counter, 
    increment,
    decrement,
    reset,
  }
}