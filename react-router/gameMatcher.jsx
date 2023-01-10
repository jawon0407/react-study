import React from 'react';
import GuGuDan from '../구구단/gugudan';
import Rsp from '../가위바위보/rspHook';
import WordRelay from '../끝말잇기/wordrelay';
import NumberBaseball from '../숫자야구/numberbaseball';
import RenderTest from '../반응속도체크/rendertest';
import Lotto from '../로또/lottoClass';
import TicTacToe from '../틱택토/tictactoe';
import MineSearch from '../지뢰찾기/MineSearch';
import { useLocation , useNavigate , Route , Routes} from 'react-router';

const GameMatcher = () => {
        const location = useLocation();
        const navigate = useNavigate();
        console.log(location);
        console.log(navigate);
        return(
            <Routes>
                <Route path="gugudan" element={<GuGuDan />} />
                <Route path="wordrelay" element={<WordRelay />} />
                <Route path="rsp" element={<Rsp />} />
                <Route path="lotto" element={<Lotto />} />
                <Route path="responsiveCheck" element={<RenderTest />} />
                <Route path="numberbaseball" element={<NumberBaseball />} />
                <Route path="tictactoe" element={<TicTacToe />} />
                <Route path="minesearch" element={<MineSearch />} />
                <Route path="*" element={<div>일치하는 게임이 없습니다.</div>} /> 
            </Routes>
        )
}

export default GameMatcher;