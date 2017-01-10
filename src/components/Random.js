import React from 'react'
import axios from 'axios'

export default class Random extends React.Component  {
    constructor(props){
        super(props)
        this.state = { data:[] }
        this.generate=this.generate.bind(this);
    }

    generate(){
        const num = this.number.value;
        axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${num}&type=uint16`)
        .then((response) => {
            const data=response.data.data;
            this.setState({data});

        })
        .catch( (error) => {
            console.log(error);
        });
    }
    
    render()  {
        return (<div>
                    <h3> <font color='cornflowerblue'>Random Numbers</font></h3>
                    <input type='number' ref ={node => this.number=node}/>
                    <input className="btn btn-primary  btn-xs" type="button"  onClick={this.generate} value="Generate!"/>
                    <ul>
                    {
                        this.state.data.map((item,index) => <li key={index}>{item}</li>)
                    }
                    </ul>
                </div>
        );
    }

}