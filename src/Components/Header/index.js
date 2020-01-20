import React from 'react';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            species: '',
            category: '',
        }
    }
    
    handleChangeSpecies = (e) => {
        const species = e.target.value; 
        this.setState({
            species: species,
        })
        this.props.setSpecies(species) 
    }

    handleChangeCategory = (e) => {
        const category = e.target.value; 
        this.setState({
            category: category,
        })
        this.props.setFilter(category) 
    }

    render(){
      return (
        <div className="App-header">
          <div className="title">Animal Database </div>
            <select className="search" onChange={this.handleChangeCategory} value={this.state.category}>
                    <option value="">All</option>
                    <option value="CR">Critical Endangered</option>
                    <option value="MAMMALIA">Mammal</option>
            </select>
        </div>
      );
  }
  }
  
  export default Header;
  
