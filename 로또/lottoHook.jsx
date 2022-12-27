import React , {useState, useRef, useEffect} from 'react';

const getNumbers = () => {
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const [winNumbers, setWinNumbers] = useState(getNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    
    useEffect(()=>{
        console.log('useEffect');
        for(let i=0; i< winNumbers.length - 1; i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls(prevWinballs => [...prevWinballs, winNumbers[i]])
            },(i+1) * 1000);
            //timeouts 의 i번째를 설정 해주는 거기 때문에 timeouts의 배열을 변화를 주는 것이 아니라
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
          }, 7000);
        return() => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    },[timeouts.current])
    //[] 빈 배열을 넣으면 componentDidMount와 동일
    //배열에 요소를 넣으면 componentDidMount와 componentDidUpdate 둘 다 수행

    const onClickRedo = () => {
        setWinNumbers(getNumbers());
        setWinBalls([]);
        setBonus('');
        setRedo(true);
        timeouts.current = [];
    };


    return(
        <>
            <div>당첨 숫자</div>
            <div id="result">
                { winBalls.map((v) => <Ball key={v} number={v} />) }
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            <div>
                {redo ? <button onClick = {onClickRedo}>한 번 더!</button> : null}
            </div>
        </>
    )
}

export default Lotto;