import React from 'react'

export default class Movie extends React.Component  {
    constructor(props){
        super(props)
    }
    
    render()  {
        return <li>{this.props.item.Title}</li>
    }

}