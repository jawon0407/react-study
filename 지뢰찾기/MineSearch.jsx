import React , { useEffect , useReducer , createContext , useMemo }from 'react';
import Table from './table';
import Form from './form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
    halted : true
});

const initialState = {
    tableData : [],
    data : {
        row : 0,
        cell : 0,
        mine : 0,
    },
    timer : 0,
    result : '',
    halted : true,
    openedCount : 0,
}

const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i) => {
      return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
      const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
      shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(CODE.NORMAL);
      }
    }
  
    for (let k = 0; k < shuffle.length; k++) {
      const ver = Math.floor(shuffle[k] / cell);
      const hor = shuffle[k] % cell;
      data[ver][hor] = CODE.MINE;
    }

    return data;
  };

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME : 
            return{
                ...state,
                data : {
                    row : action.row, 
                    cell : action.cell, 
                    mine : action.mine
                },
                openedCount : 0,
                tableData : plantMine(action.row, action.cell, action.mine),
                halted : false,
                timer: 0,
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData.forEach((row , i) => {
                tableData[i] = [...row];
            })
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, cell) => {
                console.log(row,cell) // 어디 칸을 클릭했는지 확인
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    //칸이 아닌 곳들 필터링
                    return;
                }    
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    //칸이 열려있거나 깃발이 꽂혀있거나 물음표가 있는 칸은 검사하지 않음
                    return;
                }
                if(checked.includes(row + '/' + cell)){
                    //검사한 칸은 검사하지 않음
                    return;
                }else{
                    //검사하지 않은 칸은 검사
                    checked.push(row + '/' + cell);
                }
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                if(tableData[row - 1]){
                    around  = [ ...around,
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1],
                    ]
                }
                around = [
                    ...around,
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                ]
                if(tableData[row + 1]){
                    around = [
                        ...around,
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell], 
                        tableData[row + 1][cell + 1],
                    ]
                }
                //검사할 칸 설정
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                console.log(around, count);
                //클릭한 주변 칸에 지뢰가 얼마나 있는지 변수로 설정
                if(count === 0){
                    if(row > -1){
                        const near = [];
                        if(row -1 > -1){
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if(row + 1 < tableData.length){
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        //클릭한 주변 칸에 지뢰가 없으면 주변 칸도 열어줌
                        near.forEach((n) => {
                            if(tableData[n[0]][n[1]] !== CODE.OPENED){
                                checkAround(n[0], n[1]);
                            }
                        });
                    }
                    // near -> tableData[action.row +- 1][action.cell +- 1]  
                    //n -> [row, cell], n[0] -> row, n[1] -> cell 
                }
                if(tableData[row][cell] === CODE.NORMAL){
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
                //승리 조건
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다!`;
            }
            return{
                ...state,
                tableData,
                openedCount : state.openedCount + openedCount,
                halted,
                result,
            }    
        }
        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted : true,
            }
        }
        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData
            }
        }
        case QUESTION_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData
            }
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer : state.timer + 1,
            }
        }
        default :
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, timer, result, halted } = state;

    const value = useMemo(() => ({ tableData, halted ,dispatch }), [tableData, halted]);
    //미리 useMemo로 캐싱을 해놔야 렌더링이 덜 일어남

    useEffect(() => {
        let timer;
        if(halted === false){
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER })
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);
    //halted 값이 false 일때만 타이머가 돌아가게 함 dispatch 를 setInterval로 1초마다 실행

    return (
        <TableContext.Provider value={value}>
          <Form />
          <div>{timer}</div>
          <Table />
          <div>{result}</div>
        </TableContext.Provider>
      );
};

export default MineSearch;