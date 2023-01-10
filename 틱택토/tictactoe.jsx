import React , {useEffect , useCallback, useReducer} from 'react'
import Table from './table'

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell: [-1, -1],
    //아무것도 클릭하지 않았을 때는 -1, -1
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
      case SET_WINNER:
        // state.winner = action.winner; 이렇게 하면 안됨.
        return {
          ...state,
          winner: action.winner,
        };
      case CLICK_CELL: {
        const tableData = [...state.tableData];
        tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
        tableData[action.row][action.cell] = state.turn;
        return {
          ...state,
          tableData,
          recentCell: [action.row, action.cell],
        };
      }
      case CHANGE_TURN: {
        return {
          ...state,
          turn: state.turn === 'O' ? 'X' : 'O',
        };
      }
      case RESET_GAME: {
        return {
          ...state,
          turn: 'O',
          tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          recentCell: [-1, -1],
        };
      }
      default:
        return state;
    }
  };

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //initialState를 넣어주면 초기값을 넣어줄 수 있다.
    //state = {winner: '', turn: 'O', tableData: [['','',''],['','',''],['','','']]}
    //dispatch = action 즉  reducer 함수가 dispatch에 넣어준 액션에 따라서 새로운 state를 반환해준다.
    //reducer = state와 action을 받아서 새로운 state를 반환하는 함수
    //useReducer -> reducer , 초기 state 값 설정 -> reducer 함수 내에서 어떤 액션이 발생했을 때 어떻게 state를 바꿀지 정의
    //자식 컴포넌트에게 dispatch를 넘겨줘서 자식 컴포넌트에서도 dispatch를 사용할 수 있게 해준다.
    const {winner, turn, tableData, recentCell} = state;
    const onClickTable = useCallback(() => {
        dispatch({type: SET_WINNER, winner: turn})
    },[])

    useEffect(() => {
        const [row , cell] = recentCell;
        if(row < 0){
            return;
        }
        let win = false;
        //가로 빙고
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }
        //세로 빙고
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        //대각선 빙고
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }
        console.log(win, row, cell, turn, tableData);
        if(win){
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: RESET_GAME});
        }else{
            //무승부 검사   
            let all = true; // all이 true면 무승부라는 뜻
            tableData.forEach((row) => {
                row.forEach((cell)=>{
                    if(!cell){
                        all = false;
                    }
                });
            });
            if(all){
                dispatch({type: SET_WINNER, winner: '무승부'});
                dispatch({type: RESET_GAME});
            }else{
                dispatch({type: CHANGE_TURN});
            }
        }
    },[recentCell])

    return(
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;