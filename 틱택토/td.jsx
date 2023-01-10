import React, { useCallback , memo } from 'react'
import { CLICK_CELL } from './tictactoe';

const Td = memo(({rowIndex , cellIndex , cellData , dispatch}) => {
    console.log('td render')
    const onClickTd = useCallback(() =>{
        if(cellData){
            return;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        //CLICK_CELL reducer의 action이라는 객체를 만들어서 해당 action에 맞는 역할을 수행한후 dispatch에 넣어준다.
    }, [cellData])

    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
})

export default Td