import React, { useContext , memo } from 'react';
import Tr from './tr';
import { TableContext } from './MineSearch';

//상위 컴포넌트에 memo를 사용하면 자식 컴포넌트에도 memo를 사용해야 한다.
const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </table>
  )
});

export default Table;