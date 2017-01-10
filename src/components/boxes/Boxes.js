import React from 'react'
import Box from './Box'
import './box.css'

export default class Boxes extends React.Component {
    constructor(props){
        super(props)
        this.drawBox = this.drawBox.bind(this)
        this.state = {num : 0}
    }
  
    drawBox(){
        //clearInterval(timer)
        this.setState({num: +this.num.value})
    }

    render(){
        return (
        <div className="boxes">
        <input type="number" ref={(d => this.num = d)} onChange={this.drawBox}/>
        <div>
        {
            Array(this.state.num).fill(null).map(( _ , index) => {
            return  <Box  key={index}/>
         })
        }
        </div>
        </div> 
        );
    }
}