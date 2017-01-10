import React from 'react'
import './box.css'

export default class Box extends React.Component  {
    constructor(props){
        super(props)
        this.state = {color:""}
        this.timer;
    }

    componentDidMount(){
    this.timer = setInterval(() => {
                const colors = Box.getColors()
                const str = `rgba(${colors.r}, ${colors.g}, ${colors.b},${colors.a})`
                this.setState({color:str})
            },1000)
    }
    
    componentWillUnmount(){
        clearInterval(this.timer)
    }

    static getColors(){
        return {
            r : Box.generateRandom(),
            g : Box.generateRandom(),
            b : Box.generateRandom(),
            a : Math.random()
        }
    }

    static generateRandom() {
        return Math.floor((Math.random()) * 255);
    }
    
    render()  {
        return <div style={{backgroundColor: this.state.color}} className="box">
                    <h1></h1>
                </div>
    }

}