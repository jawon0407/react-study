import React from 'react';
import { BrowserRouter , Link , Route , Routes } from 'react-router-dom';
import GameMatcher from './gameMatcher';

const Games = () => {
    return(
        <BrowserRouter>
            <div>
                <Link to="/game/gugudan">구구단</Link>
                &nbsp;
                <Link to="/game/wordrelay">끝말잇기</Link>
                &nbsp;
                <Link to="/game/rsp">가위바위보</Link>
                &nbsp;
                <Link to="/game/lotto">로또</Link>
                &nbsp;
                <Link to="/game/responsiveCheck">반응속도체크</Link>
                &nbsp;
                <Link to="/game/numberbaseball">숫자야구</Link>
                &nbsp;
                <Link to="/game/tictactoe">틱택토</Link>
                &nbsp;
                <Link to="/game/minesearch">지뢰찾기</Link>
                &nbsp;
                <Link to="/game/index">게임 매쳐</Link>
            </div>
            <div>
                <Routes>
                    <Route path="/"  element={<GameMatcher />} />
                    <Route path="/game/*" element={<GameMatcher />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Games;