import React from 'react';

const Form = ({value, onChangeInput , submit}) => {
    return(
        <form onSubmit = {submit}>
            <input value={value} maxLength={4} onChange={onChangeInput}/>
            <button>입력</button>
        </form>
    )    
}

export default Form;