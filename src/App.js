import "./App.css";
import React, { Component } from "react";

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      value: "",
      choice: "",
   
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const storageTasks = JSON.parse(localStorage.getItem("toDoData"));

    if (storageTasks !== null) {
      this.setState((state) => {
        return {
          content: storageTasks,
        
        };
      });
    }
  }

  shuffle(arry) {
    arry.sort(() => Math.random() - 0.5);
  }

  randomChoice(arrayOfContent) {
    var { content,  } = this.state;
    this.shuffle(content);
    this.setState({
      choice: content[0],
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: "",
    });
  }

  addTask(newInput) {
    var { content } = this.state;
    content.push(newInput);
    this.setState((state) => {
      return {
        content: content,
       
      };
    });
    localStorage.setItem("toDoData", JSON.stringify(content));
  }

  removeTask(id) {
    var { content } = this.state;

    var placeholder = this.state.content.filter(function (element) {
      return element !== content[id];
    });
    this.setState({
      content: placeholder,
    });

    localStorage.setItem("toDoData", JSON.stringify(placeholder));
  }

  render() {
    var { content, choice } = this.state;

    const inputBoxAndButton = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="type a new task"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
          <input
            onClick={() => this.addTask(this.state.value)}
            type="submit"
            value="Submit"
          />
          <button onClick={() => this.randomChoice(content)}>
            choose random movie
          </button>
        </form>
        <div>The movie of the week is: {choice}</div>
      </div>
    );
    const list = (
      <div>
        {content.map((item, index) => {
          return (
            <div key={index}>
              <button onClick={() => this.removeTask(index)}>X</button>
              &nbsp;&nbsp;{index + 1} &nbsp; &nbsp; &nbsp; &nbsp; {item}
            </div>
          );
        })}
       
      </div>
    );
    return (
      <div>
        <h1>Move of the Week</h1>
        <div>
          <div>{inputBoxAndButton}</div>
          <div> &nbsp; &nbsp; &nbsp;</div>
          <div>{list}</div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;
