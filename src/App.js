import React from 'react';
import './App.css';

import axios from 'axios';

import Main from './Components/Main';
import Header from './Components/Header';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      all: false,
      filter: false,
    }
    this.filter = '';
    /* this.all = false; */
  }


  componentDidMount = () => {
  axios.get('http://apiv3.iucnredlist.org/api/v3/region/list', {
      params: { token: '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee'}
    })
    .then((resp) => {
      const response = resp.data.results;
      const index = Math.floor(Math.random()*response.length)
      const country = response[index].identifier; 
        return axios.get(`http://apiv3.iucnredlist.org/api/v3/species/region/${country}/page/0`,{
          params: {token: '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee'}
        });
    })
      .then((resp) => {
        const arr = [];
        const response = resp.data.result;
        const region = resp.data.region_identifier;
        response.map(el => arr.push({
          taxonid: el.taxonid,
          category: el.category,
          class_name: el.class_name,
          scientific_name: el.scientific_name,
        }))
        
        this.setState({
          all: arr,
          region_identifier: region,
        })
      })
      .catch((err) => {
        alert(err)
      });
      }

  setFilter = (category) => {
    let arr = [];
      if (category=== ''){
        const all = this.state.all 
          this.setState({
            filter: all
          })
      } else if (category === 'MAMMALIA') {
          for(var i = 0; i < this.state.all.length; i++) {
            if(this.state.all[i]['class_name'] == category) {
              arr.push( this.state.all[i]);
            }
          }
            this.setState({
              filter: arr
            })
      } else {
          for(var i = 0; i < this.state.all.length; i++) {
              if(this.state.all[i]['category'] === category) {
                arr.push( this.state.all[i]);
              }
            }
            this.setState({
              filter: arr
            })
      }
  }

  render(){
    return (
      <div className="App">
        <Header setFilter={this.setFilter} />
        {this.state.filter ?  <Main all={this.state.filter} region={this.state.region_identifier} /> : this.state.all ?  <Main all={this.state.all} region={this.state.region_identifier} /> : null}
      </div>
    );
  } 
}

export default App;
