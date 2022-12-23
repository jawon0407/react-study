import React, { Component } from "react";

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const answerArray = [];
  for (i = 0; i < 4; i++) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    answerArray.push(chosen);
  }
  return answerArray;
};

class NumberBaseballPractice extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  inputEl = createRef();

  onSubmitForm = (e) => {
    e.preventDefault();
    const { value, tries, answer } = this.state;
    if (value === answer.join("")) {
      this.setState((prevState) => ({
        result: "홈런",
        value: "",
        tries: [...prevState.tries, { tryInfo: value, result: "홈런" }],
      }));
    } else {
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join("")}였습니다!`,
          value: "",
        });
        confirm("게임을 다시 시작하시겠습니까?");
        this.setState({
          result: "",
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        const valueArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        for (i = 0; i < 4; i++) {
          if (answer[i] === valueArray[i]) {
            strike++;
          } else if (answer.includes(valueArray[i])) {
            ball++;
          }
          this.setState((prevState) => ({
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            value: "",
            tries: [
              ...prevState.tries,
              {
                tryInfo: value,
                result: `${strike} 스트라이크, ${ball} 볼입니다.`,
              },
            ],
          }));
        }
      }
      this.inputEl.current.focus();
    }
  };

  onChangeFunc = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <div>{result}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputEl}
            value={value}
            onChange={this.onChangeFunc}
          />
          <button>입력</button>
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return (
              <li key={`${i + 1}차 시도 : ${v.tryInfo}`}>
                <b>{v.tryInfo}</b> - {v.result}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseballPractice;
