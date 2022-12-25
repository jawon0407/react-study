import { useRef, useEffect } from 'react';

// useInterval hook

/*
    const [isRunning, setIsRunning] = useState(true);
    useInterval(() => {
       console.log('hello world!) 
    }, isRunning ? 1000 : null);
*/

function useInterval(callback, delay) {
    const savedCallback = useRef();
    
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
    }, [delay]);
}

export default useInterval;