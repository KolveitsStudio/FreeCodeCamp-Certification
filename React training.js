class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line



    // Change code above this line
  }
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
          <Fruits/>
          <Vegetables/>
        {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
ReactDOM.render(<TypesOfFood/>,document.getElementById("challenge-node"))

// Change code below this line
class MyComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h1>My First React Component!</h1>
      </div>
    )
    
  }
}
ReactDOM.render(<MyComponent/>,document.getElementById("challenge-node"))

const CurrentDate = (props) => {
  return (
    <div>
      { /* Change code below this line */ }
      <p>The current date is: {props.date}</p>
      { /* Change code above this line */ }
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        { /* Change code below this line */ }
        <CurrentDate date={Date()}/>
        { /* Change code above this line */ }
      </div>
    );
  }
};
