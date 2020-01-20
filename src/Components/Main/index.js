import React from 'react';


const Main = (props) => {
  const resp = props.all
  const list = resp.map(el => <ListItem key={el.taxonid} category={el.category} class_name={el.class_name} scientific_name={el.scientific_name} />)
      return (
        <div >
          <div className="region">
            {props.region}
          </div>
          <div className="App-main">
            {list}
          </div>   
        </div>
      )
  }

  const ListItem = ({category, class_name, scientific_name}) => {
    return(
        <>
        <div className="card">
          <h4>{scientific_name}</h4>
          <ul>
            <li>Species: {class_name}</li>
            <li className='cat'>{category}</li>
          </ul>
        </div>
        </>
    )
  }
  
  export default Main;
  
