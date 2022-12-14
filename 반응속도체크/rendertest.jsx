import React, { PureComponent } from "react";
/* 
    PureCompoenet는 state, props가 변경될 때 인지하고 렌더링을 새로해준다
    하지만 PureComponent 는 class 기반 컴포넌트에서만 사용할 수 있다.
*/
class RenderTest extends PureComponent {
  state = {
    counter: 0,
  };

  /* 
    shouldComponentUpdate()
    렌더링이 되는 경우를 설정해줘야한다.
    => 최적화 관련 
    true 일 경우 render false일 경우 render X 
  
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {
            return true;
            }
            return false;
        }
*/

  counterIncrease = (e) => {
    e.preventDefault();
    this.setState({});
  };

  render() {
    {
      console.log("렌더링", this.state.counter);
    }
    return (
      <>
        <button onClick={this.counterIncrease}>클릭</button>
      </>
    );
  }
}

export default RenderTest;
