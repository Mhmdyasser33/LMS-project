import { useEffect, useState } from "react";

/**
 * Debounces a value by delaying its update until a specified delay has passed.
 *
 * @template T - The type of the value being debounced.
 * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds before updating the debounced value. Default is 500ms.
 * @returns The debounced value.
 */
export function useDebounce<T>(value : T , delay ?: number):T{

  const [debounceValue , setDebounceValue] = useState<T>(value) ; 
   useEffect(()=>{
     const timer = setTimeout(() => {
           setDebounceValue(value)
     }, delay || 500);


     return()=>{
         clearTimeout(timer) ;
     }
   },[value , delay])

   return debounceValue ; 
}