import React, { PureComponent } from "react";
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

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        //컴퓨터가 선택한 것의 모양을 찾아서 [key, value] 형태로 반환
        console.log(v[1])
        return v[1] === imgCoord;
        // v[1]은 value, imgCoord는 현재 컴퓨터가 선택한 모양
    })[0];
}

class Rsp extends PureComponent {
  state = {
    imgCoord : rspCoords.바위,
    score : 0,
    result : '',
    isClicked : false,
  };

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 비동기 요청을 많이 함
    this.interval = setInterval(this.changeHand, 500);
  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if(imgCoord === rspCoords.바위) {
        this.setState({
            imgCoord: rspCoords.가위
        });
        }else if(imgCoord === rspCoords.가위) {
        this.setState({
            imgCoord: rspCoords.보,
        });
        }else if(imgCoord === rspCoords.보) {
        this.setState({
            imgCoord: rspCoords.바위,
      })
        this.setState({
          isClicked: false,
      })
    }
  };


  onClickBtn = (choice) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0) {
      this.setState({
        result: '비겼습니다!',
        isClicked: true,
      });
    }else if([-1, 2].includes(diff)) {
        // 0 - 1 = -1, 1 - (-1) = 2
        this.setState((prevState) => {
            return {
                result: '이겼습니다!',
                score: prevState.score + 1,
                isClicked: true,
            }
        })
    }else {
        this.setState((prevState) => {
            return {
                result: '졌습니다!',
                score: prevState.score - 1,
                isClicked: true,
            }
        }
      )
    }
    setTimeout(() => {
        this.interval = setInterval(this.changeHand, 500);
    }, 1000);
  }
        

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
            {/* 
              onClickBtn()을 쓰면 렌더링 될 때 바로 실행되기 때문에 
              onClick={()=>this.onClickBtn("바위")}로 함수를 return받아서 써야함
              혹은 onClickBtn = () => () => {} 이런식으로 바꿔서 써야함
              보통 함수의 매개변수를 넣어줄 때는 이렇게 씀
            */}
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

