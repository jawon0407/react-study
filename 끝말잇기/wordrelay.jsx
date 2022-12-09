const React = require('react');
// const { Component } = React;
const {useState, useRef} = React;

const WordRelay = () => {
    const [firstWord, setFirstWord] = useState('조재원');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [hint, setHint] = useState('이전 단어 보기');
    const [prevWords, setPrevWords] = useState('');
    const inputRef = useRef(null);
    
    const onShowPrevWords = (e) => {
        e.preventDefault();
        // if(hint === '이전 단어들 보기'){
        //     setHint('이전 단어들 숨기기');
        //     setPrevWords(firstWord);
        // }else{
        //     setHint('이전 단어들 보기');
        //     setPrevWords('');
        // }
        
        setHint(hint === '이전 단어 보기' ? '이전 단어 숨기기' : '이전 단어 보기');
        setPrevWords(prevWords => prevWords ? '' : firstWord); 
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(firstWord[firstWord.length -1] === value[0]){
            setHint('이전 단어 보기');
            setFirstWord(value);
            setPrevWords(() => {
                useState(prevWords => {
                    state.prevFirstWord
                })
            });
            setValue('');
            setResult('정답');
        }else{
            setValue('');
            setResult('땡');
        }
        inputRef.current.focus();
    }
    
    const onChangeInput = (e) => {
        setValue(e.target.value)
    }

    return(
        <>
            <div>{firstWord}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="text" onChange = {onChangeInput} value={value}/>
                <button>입력</button>
            </form>
            <div>
                {result}
            </div>
            <div>
                <button onClick = {onShowPrevWords}>{hint}</button>
                <div>{prevWords}</div>
            </div>
        </>
    )
}

// class WordRelay extends Component{
//     state ={
//         firstWord : '조재원',
//         value : '',
//         result : ''
//     }

//     onSubmitForm = (e) =>{
//         e.preventDefault();
//         if(this.state.firstWord[this.state.firstWord.length-1] === this.state.value[0]){
//             this.setState({
//                 result : '정답',
//                 firstWord : this.state.value,
//                 value : ''
//             })
//             this.input.focus();
//         }else{
//             this.setState({
//                 result : '땡',
//                 value : ''
//             })
//             this.input.focus();
//         }
//     }


//     onChangeInput = (e) =>{
//         this.setState({value : e.target.value});
//     }

//     input

//     refFunc = (c) => {
//         this.input = c;
//     }

//     render(){
//         return(
//         <>
//             <div>{this.state.firstWord}</div>
//             <form onSubmit={this.onSubmitForm}>
//                 <input ref={this.refFunc} type="text" onChange = {this.onChangeInput} value={this.state.value}/>
//                 <button>입력</button>
//             </form>
//             <div>
//                 {this.state.result}
//             </div>
//         </>
//     )}
// }

module.exports = WordRelay;