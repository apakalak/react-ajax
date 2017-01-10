import React from 'react'
import jsonp from 'jsonp'

export default class CurrencyConverter extends React.Component  {
    constructor(props){
        super(props)
        this.state = { amountConverted:'' , currencies:[]}
        this.convert=this.convert.bind(this);
        this.getCurrency();
    }

    convert(){
        const from = this.from.value;
        const to = this.to.value;
        const amount = this.amount.value;
        jsonp(`http://api.fixer.io/latest?base=${from}`, null,  (err, data)=> {
            if (err) {
                console.error(err.message);
            } else {
                const multiplyVal = data.rates[to] ? data.rates[to] : 1
                const amountConverted = multiplyVal * amount;
                this.setState({amountConverted});
                }
            });
    }


    getCurrency()
    {
        jsonp(`http://api.fixer.io/latest`, null,  (err, data)=> {
            if (err) {
                console.error(err.message);
            } else {
                const currencies = Object.keys(data.rates)
                this.setState({currencies});
            }
            });

    }
        
    
    render()  {
        return (
           <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">Currency Converter</h3>
                </div>
                <div className="panel-body">
                    <div className="container">
                        <div className="row">
                        <div className="col-xs-2">
                            <label htmlFor='From'>From</label> 
                            <select name='From' ref={d => this.from = d}>
                                { 
                                    this.state.currencies.map((item,index) => 
                                    <option value={item} key={index}>{item}</option>
                                    )
                                }
                            </select>
                            </div>
                            <div className="col-xs-2">
                                <label htmlFor='To'>To</label>
                                <select name='To'  ref={d => this.to = d}>
                                { 
                                    this.state.currencies.map((item,index) => 
                                        <option value={item} key={index}>{item}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-xs-4">
                            <input type='number' name="amount" ref={d => this.amount = d} placeholder="Amount"/>
                        </div>

                        <div className="col-xs-4">
                        <button name='Convert' className="btn btn-info  btn-xs"
                            onClick={this.convert}>Convert</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-9 col-centered"> 
                                <font size='10' color='green'><label >{this.state.amountConverted} </label></font>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}