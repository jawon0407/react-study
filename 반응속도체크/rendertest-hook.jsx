import React, { useState,useRef } from "react";
const RenderTestHook = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const startTime = useRef();
  const endTime = useRef();


  const colorChange = () => {
    setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
    }, Math.floor(Math.random() * 3000) + 2000); // 2~5초 랜덤
  };

  // waiting -> ready -> now 의 경우를 나눠서 처리
  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setNessage("초록색이 되면 클릭하세요"),
      colorChange();
      startTime.current = new Date().getTime();
    } else if (state === "ready") {
      clearTimeout(colorChange);
        setState("waiting");
        setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
    } else if (state === "now") {
      endTime.current = new Date().getTime();
          setState("waiting");
          setMessage("클릭해서 시작하세요");
          setResult((prevResult)=>([...prevResult, endTime.current - startTime.current]));
      }
    }

  const onReset = () => {
      setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <div>
        평균시간 : {result.reduce((a, c) => a + c) / result.length} ms
        <button onClick={onReset}>리셋</button>
      </div>
    );
  };

    return (
      <>
        <div id="screen" className={state} onClick={onClickScreen}>
          {message}
        </div>
        {renderAverage()}
      </>
    );
}

export default RenderTestHook;
