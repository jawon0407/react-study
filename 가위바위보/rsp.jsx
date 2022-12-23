import React, { Component } from "react";
/*
  클래스의 경우 -> constructor -> render -> ref설정 -> componentDidMount
  -> setState/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate
  부모가 나(자식 컴포넌트)를 없앴을 때 -> componentWillUnmount -> 소멸
*/ 

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

class Rsp extends Component {
  state = {
    imgCoord : rspCoords.바위,
    score : 0,
    result : '',
  };

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 비동기 요청을 많이 함
    this.interval = setInterval(() => {
      const { imgCoord } = this.state;
      if(imgCoord === rspCoords.바위) {
        this.setState({
          imgCoord: rspCoords.가위,
        });
      }else if(imgCoord === rspCoords.가위) {
        this.setState({
          imgCoord: rspCoords.보,
        });
      }else if(imgCoord === rspCoords.보) {
        this.setState({
          imgCoord: rspCoords.바위,
        })};
    }, 1000);
  }

  componentDidUpdate() { // 리렌더링 후

  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
    clearInterval(this.interval);
  }

  onClickBtn = (value) => {}
        

  render() {
    const {result, score, imgCoord} = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button id="scissor" className="btn" onClick={this.onClickBtn("가위")}>
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default Rsp;
