import React from 'react'
import Movie from './Movie'
import jsonp from 'jsonp'
import PouchDb from 'pouchdb'

export default class Movies extends React.Component {
    constructor(props){
        super(props)
        this.db = new PouchDb('movies');
        this.state= {results:[],movies:[]}
        this.search= this.search.bind(this)
        this.clear=this.clear.bind(this);
        this.add=this.add.bind(this);
    }

    add(event){
        // const node = event.target.parentNode.parentNode;
        // const title = node.querySelector('.title').textContent
        // const year = node.querySelector('.year').textContent
        // const posterUrl = node.querySelector('.poster').getAttribute('src')
        // this.db.put({_id:new Date().toString(),title,year,posterUrl}, (err,result) => {
        //     console.log(err,result)
        // })
        const obj = JSON.parse(event.target.dataset.obj);
        obj._id = new Date().toString();
        this.db.put(obj, (err,result) => {
            console.log(err,result)
        })
    }

    componentDidMount(){
        this.db.allDocs({
            include_docs:true,
            attachments:true
        }).then(res =>{
            const movies = res.rows;
            this.setState({movies})
        })
    }

    search() {
        const val = this.searchText.value;
         
          jsonp(`http://www.omdbapi.com/?s=${val}`, null,  (err, data)=> {
            if (err) {
                console.error(err.message);
            } else {
                const results = data.Search ? data.Search : []
                this.setState({results});
                }
            });
    }

    clear(){
        this.setState({results:[]})
        this.searchText.value='';
    }

    render(){
        return (

     <div className="panel panel-info">
        <div className="panel-heading">
            <h3 className="panel-title">Movies</h3>
        </div>
        <div className="panel-body">
            <input type="text" ref={(d => this.searchText = d)} onChange={this.search}/>
            <input type="button" value="Clear" className="btn btn-danger btn-xs" onClick={this.clear}/>
           
        </div>

       <div>
       <table className="table table-striped">
         <thead>
          <tr>
            <th>Add</th>
            <th>Title</th>
            <th>Year</th>
            <th>Poster</th>
          </tr>
         </thead>
         <tbody>
            {
                this.state.results.map((r,i) =>{
                    return (
                        <tr key={i}>
                            <td><button data-obj={JSON.stringify(r)} onClick ={this.add} className="btn btn-success btn-xs"> Add</button></td>
                            <td className="title">{r.Title}</td>
                            <td className="year">{r.Year}</td>
                            <td ><img className="poster" src={r.Poster}  width="50px" height="50px"/></td>
                        </tr>
                    );
                })
            }
            </tbody>
       </table>




  <table className="table table-striped">
         <thead>
          <tr>
          
            <th>Title</th>
            <th>Year</th>
            <th>Poster</th>
          </tr>
         </thead>
         <tbody>
            {
                this.state.movies.map((r,i) =>{
                    return (
                        <tr key={i}>
                          
                            <td className="title">{r.doc.Title}</td>
                            <td className="year">{r.doc.Year}</td>
                            <td ><img className="poster" src={r.doc.Poster}  width="50px" height="50px"/></td>
                        </tr>
                    );
                })
            }
            </tbody>
       </table>

       </div>

    </div>
       
        );
    }
}