import React, { memo } from "react";

/*
     memo는 부모 컴포넌트가 리렌더링됐을때 자식컴포넌트가 리렌더링 되는걸 막아준다
 */
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <b>{tryInfo.try}</b> - {tryInfo.result}
    </li>
  );
});

// class Try extends Component {
//     render(){
//         const {tryInfo} = this.props;
//         return(
//             <li key={tryInfo.try}>
//                 <b>{tryInfo.try}</b> - {tryInfo.result}
//             </li>
//         );
//     }
// }
Try.displayName = "Try";
export default Try;
