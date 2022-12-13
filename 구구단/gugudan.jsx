const React = require('react');

const GuGuDan = () => {
    const [first,setFirst] = React.useState(Math.ceil(Math.random()*100)); // first 의 초기값 세팅
    const [second,setSecond] = React.useState(Math.ceil(Math.random()*100)); // second 의 초기값 세팅
    const [value,setValue] = React.useState(''); // value 의 초기값 세팅
    const [result,setResult] = React.useState(''); // result 의 초기값 세팅
    const [answer,setAnswer] = React.useState('정답 보기'); // answer 의 초기값 세팅
    const [hint,setHint] = React.useState(''); // hint 의 초기값 세팅
    const [resultPrevNum, setResultPresultPrevNum] = React.useState(''); // resultPrevNum 의 초기값 세팅
    const refFunc = React.useRef(''); //react hooks 에서 ref 쓰는 방법
    const setNumber = () => {
        setFirst(Math.ceil(Math.random()*100)); //setFirst() 를 통해 first의 값을 바꿔준다
        setSecond(Math.ceil(Math.random()*100)); //setSecond() 를 통해 second의 값을 바꿔준다
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second){
            setResult('정답입니다!'); //setResult() 를 통해 result의 값을 바꿔준다
            setResultPresultPrevNum(`${first} * ${second} = ${first * second}`); //setResultPresultPrevNum() 를 통해 resultPrevNum의 값을 바꿔준다
            setNumber(); //setFirst(), setSecond() 를 한번에 처리하고 웹페이지가 render된다
            setValue(''); //setValue() 를 통해 value의 값을 바꿔준다
            setAnswer('정답 보기');
            setHint('');
            refFunc.current.focus();
            //setResult, setFirst, setSecond, setValue 를 한번에 처리하고 웹페이지가 render된다 -> setResult, setFirst, setSecond, setValue, class component의 setState() 는 비동기로 처리된다!
        }else{
            setValue('');
            setResult('오답입니다');
            refFunc.current.focus();
        }
    }

    const onSkipClick = (e) => {
        e.preventDefault();
        setResultPresultPrevNum(`${first} * ${second} = ${first * second}`);
        setNumber(); //setFirst(), setSecond() 를 한번에 처리하고 웹페이지가 render된다
        setValue(''); //setValue() 를 통해 value의 값을 바꿔준다
        setResult('');
        refFunc.current.focus();
    }

    const onReset = (e) => {
        e.preventDefault();
        setValue('');
        refFunc.current.focus();
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onClick = (e) =>{
        e.preventDefault();
        // if(answer === '정답 보기'){
        //     setHint(first * second);
        //     setAnswer('정답 숨기기');
        // }else{
        //     setHint('');
        //     setAnswer('정답 보기');
        // }
        answer === '정답 보기' ? setHint(first * second) : setHint('');
        answer === '정답 보기' ? setAnswer('정답 숨기기') : setAnswer('정답 보기');
    }
    
    return(
<<<<<<< Updated upstream
        <>
            <div className ="bg-white flex flex-col items-center justify-center p-20 shadow-md rounded-lg ">
                <div>{first} 곱하기 {second}</div>
                <form onSubmit={onSubmit} className="my-5">
                    <input ref={refFunc} onChange={onChange} type="number" value={value} className="border p-2 outline-1 outline-blue-400"/> 
                    <div className="flex items-center justify-around mt-4">
                        <button className="bg-blue-300 text-white p-2 rounded-lg">입력</button>
                        <button className="bg-red-400 text-white p-2 rounded-lg" onClick={onSkipClick}>Skip</button>
                        <button className="bg-gray-200 px-4 py-2 rounded-lg" onClick={onReset}>C</button>
                    </div>
                </form> 
                <div>{result}</div>
                <div className="my-3">{resulted}</div>
                <div>
                    <button onClick = {onClick} className="border-2 rounded-lg px-2 py-1">{answer}</button>
                    <div className="text-center">
                        <span>{hint}</span>
                    </div>
                </div>
                <div>
                    {first} x {second}
                </div>
            </div>
        </>  
=======
        <div className ="flex flex-col items-center justify-center p-20 shadow-md rounded-lg">
            <div>{first} 곱하기 {second}</div>
            <form onSubmit={onSubmit} className="my-5">
                <input ref={refFunc} onChange={onChange} type="number" value={value} className="border p-2 outline-1 outline-blue-400"/> 
                <div className="flex items-center justify-around mt-4">
                    <button className="bg-blue-300 text-white p-2 rounded-lg">입력</button>
                    <button className="bg-red-400 text-white p-2 rounded-lg" onClick={onSkipClick}>Skip</button>
                    <button className="bg-gray-200 px-4 py-2 rounded-lg" onClick={onReset}>C</button>
                </div>
            </form> 
            <div>{result}</div>
            <div>
                <button onClick = {onClick} className="border-2 rounded-lg px-2 py-1">{answer}</button>
                <div className="text-center">
                    <span>{hint}</span>
                </div>
            </div>
            <div className="mt-3 text-sm text-gray-400">
                {resultPrevNum}
            </div>
        </div>
>>>>>>> Stashed changes
    )
}

module.exports = GuGuDan;