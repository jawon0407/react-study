import React, { Component } from "react";
class RenderTest extends Component {
  state = {
    state: `waiting`,
    message: `클릭해서 시작하세요`,
    result: [],
  };

  colorChange = () => {
    setTimeout(() => {
      this.setState({
        state: "now",
        message: "지금 클릭",
      });
    }, Math.floor(Math.random() * 3000) + 2000); // 2~5초 랜덤
  };

  startTime;
  endTime;

  // waiting -> ready -> now 의 경우를 나눠서 처리
  onClickScreen = () => {
    const { state, result, message } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.colorChange();
      this.startTime = new Date().getTime();
    } else if (state === "ready") {
      clearTimeout(this.colorChange);
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
      });
    } else if (state === "now") {
      this.endTime = new Date().getTime();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <div>
        평균시간 : {result.reduce((a, c) => a + c) / result.length} ms
        <button onClick={this.onReset}>리셋</button>
      </div>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default RenderTest;
