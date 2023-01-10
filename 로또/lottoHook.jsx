import React , {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

const getWinNumbers = () => {
    console.log('getWinNumbers');
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
    const lottoNumbers = useMemo(() => getWinNumbers(),[]);
    //useMemo는 복잡한 함수 결과'값'을 기억한다,[]안에 있는 값이 바뀔때만 함수를 다시 실행해서 결과값을 다시 기억한다.
    // hooks 는 전체 함수가 다시 실행되기 때문에 최적화를 위해서 함수가 반복될 땐 useMemo를 사용한다.
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    //state 로 안한 이유는 state는 화면을 다시 그리기 때문에 state로 하면 화면이 계속 다시 그려진다.

    useEffect(()=>{
        console.log('useEffect');
        for(let i=0; i< winNumbers.length - 1; i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[i]])
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

    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    },[winNumbers]);
    // class 컴포넌트에선 componentDidUpdate 구문에서 따로 조건절을 이용하여 특정 props가 바뀔 때만 실행하도록 설정할 수 있었다.
    // useEffect에서는 두번째 인자로 변화를 감지할 props를 넣어주면 된다.

    useEffect (() => {
        console.log(winBalls);
    },[winBalls])

    const onClickRedo = useCallback(() => {
        console.log('useCallback');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus('');
        setRedo(true);
        timeouts.current = [];
    });
    //useCallback은 함수 자체를 기억한다, []안에 있는 값이 바뀔때만 함수를 다시 실행해서 함수를 다시 기억한다.
    //useCallback은 자식 컴포넌트에 함수를 넘겨줄 때 사용한다.
    //자식 컴포넌트가 새로운 함수를 받아서 계속 렌더링 되는 것을 방지하기 위해서

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