import React, {Component} from 'react';

class RenderTest extends Component {
    state={
        counter : 0,
    }

    counterIncrease = (e) => {
        e.preventDefault();
        this.setState({})
    }
    
    render(){
        {console.log('렌더링', this.state.counter)}
        return(
           <>
              <button onClick={this.counterIncrease}>클릭</button>
           </> 
        )
    }
}

export default RenderTest;