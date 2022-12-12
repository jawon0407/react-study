import React from 'react';

const Try = ({tryInfo}) => {
    return(
        <li>
            <b>{tryInfo.try}</b> - {tryInfo.result}
        </li>
    );
}

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

export default Try;