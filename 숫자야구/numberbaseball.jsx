import React, {useState} from 'react';
import Try from './try';

const getNumbers = () => {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1){
        const chosen = candidate.splice(Math.floor(Math.random() * (candidate.length)), 1)[0]; // [0] : 배열에서 뽑아온 숫자 안 쓰면 배열로 뽑아옴
        console.log(chosen);
        array.push(chosen);
    }
    return array;
}
const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers); //lazy init
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
                setResult('홈런'),
                setTries((prevTries)=>([...prevTries, {try: value, result: '홈런'}])),
                // [...prevTries, {try: value, result: '홈런'}] : 기존 배열에 새로운 배열을 추가 array.push 는 기존 배열을 수정하기 때문에 배열 변화가 감지되지 않아 화면이 바뀌지 않는다
                alert(`정답입니다 게임을 새로 시작합니다!`);
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v)); // 문자열을 숫자로 바꿔줌
            let strike = 0;
            let ball = 0;
            if(tries.length >= 10) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]){
                        //strike 구하는 조건 -> 자릿수와 숫자가 같을 때
                        strike += 1;
                    } else if(answer.includes(answerArray[i])){
                        //ball 구하는 조건 -> 숫자는 같지만 자릿수가 다를 때 -> answer.includes(answerArray[i]) : answer에 answerArray[i]가 포함되어 있으면 true
                        ball += 1;
                    }
                }
                setTries((prevTries) => (
                    [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}]
                ));
                setValue('');
            }
        }
    }

    const onChangeInput = (e) => {
        console.log(answer)
        setValue(e.target.value);
    }
    
    return(
        <>
            <h1>{result}</h1>
            <form onSubmit = {onSubmitForm}>
                <input value={value} maxLength={4} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return(
                        <Try key={`${i+1}차 시도 : ${v.try}`} tryInfo={v}/>
                    );
                }
                )}
            </ul>
        </>
    );
}

export default NumberBaseball;

{/*
class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const {value, tries, answer} = this.state;
        if(value === answer.join('')){
            this.setState({
                result: '홈런',
                tries: [...tries, {try: value, result: '홈런'}],
                // [...tries, {try: value, result: '홈런'}] : 기존 배열에 새로운 배열을 추가 array.push 는 기존 배열을 수정하기 때문에 배열 변화가 감지되지 않아 화면이 바뀌지 않는다
                value: '',
                answer: getNumbers(),
            });
        } else {
            const answerArray = value.split('').map((v) => parseInt(v)); // 문자열을 숫자로 바꿔줌
            let strike = 0;
            let ball = 0;
            if(tries.length >= 10){
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.input.focus();
            } else {
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if(answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return{
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: '',
                    }
                });
            }
            this.input.focus();
        }
    }

    onChangeInput = (e) => {
        console.log(this.state.answer)
        this.setState({
            value: e.target.value,
        });
    }

    refFunc = (c) => {
        this.input = c;
    }

    render(){
        const {result, value, tries} = this.state;
        return(
            <>
                <h1>{result}</h1>
                <Form submit={this.onSubmitForm} changeInput={this.onChangeInput} value={value} refFunc={this.refFunc}/>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return(
                            <Try key={`${i+1}차 시도`} tryInfo={v}/>
                        );
                    }
                    )}
                </ul>
            </>
        )
    }
}
*/}