import "./App.css";
import React, { Component } from "react";

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [
        "Farewell",
        "Tristan's wheel ticket",
        "Dr. Strangelove",
        "Ben's wheel ticket",
        "She does porn tomorrow",
        "Outlaw Josie Whales",
        "Leave No TrackEvent",
        "Last King of Scotland",
      ],
      value: "",
      choice: "",
      placeholder: "",
      listholder: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const storageTasks = JSON.parse(localStorage.getItem("toDoData"));
    this.getList();
    /* if (storageTasks !== null) {
      this.setState((state) => {
        return {
          content: storageTasks,
        };
      }); 
    }*/
  }

  shuffle(arry) {
    arry.sort(() => Math.random() - 0.5);
  }

  randomChoice(arrayOfContent) {
    var { content } = this.state;
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
    /* this.setState({
      value: "",
      
    });*/
  }

  submitSignUp() {
    console.log("helloSubmit");
    const { email, username, password } = this.state;
    console.log(JSON.stringify({ email, username, password }));
    fetch("http://localhost:5000/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email, username, password }),
      // body data type must match "Content-Type" header
    })
      .then((res) => {
        console.log("trigger");
        if (res.status === 400) {
          return res.text();
        }
        //if (res.status === 201) {
        else {
          return;
        }
      })

      .then((data) => {
        if (typeof data === "string") {
          console.log("duplicate user detected");
          // this.props.createModalError(data);
        }
        //if (typeof data === "object") {
        else {
          console.log("new user saved!");
          this.setState({ successfulSave: true });
          //  this.closeModal();
        }
      });
  }

  getList() {
    var { listholder } = this.state;
    fetch("http://localhost:5000/superlistcontent", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        //    console.log(JSON.stringify(res) + ".thenres");
        return res.json();
      })
      .then((data) => {
        //  console.log("wild");
        /* data.map((item) => {
          item.vote = item.positiveVote.length - item.negativeVote.length;
          return item;
        });*/
        console.log(data);
        this.setState({
          listholder: data,
        });

        console.log(data);
        //  console.log("getData data data");
      });
  }

  addTask(newInput) {
    console.log("adding content  " + newInput);

    var { content, value, placeholder } = this.state;
    content.push(newInput);
    /* this.setState((state) => {
      return {
        content: content,
      };
    });*/

    console.log({ value });

    fetch("http://localhost:5000/superlistcontent", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ actualmovietitle: value }),
      // body data type must match "Content-Type" header
    }).then((res) => {
      console.log("trigger save to database...");
    });
    this.getList();
    // localStorage.setItem("toDoData", JSON.stringify(content));
  }

  removeTask(e) {
    /* var { content } = this.state;

    var placeholder = this.state.content.filter(function (element) {
      return element !== content[id];
    });
    this.setState({
      content: placeholder,
    });

    localStorage.setItem("toDoData", JSON.stringify(placeholder)); */
    console.log("we are removing something now with id=" + e);
    fetch("http://localhost:5000/superlistcontent/" + e.target.id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      //   body: JSON.stringify({ showButtonIndex }),
    }).then((res) => {
      //    console.log("something happening here" + res);
    });
    this.getList();
  }

  render() {
    var { content, choice, listholder } = this.state;

    const inputBoxAndButton = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="type a movie title"
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
        {Object.keys(listholder).map((keyName, i) => {
          return (
            <div className="leftside" key={i}>
              <button
                onClick={(e) => this.removeTask(e)}
                type="button"
                id={listholder[keyName]._id}
              >
                X
              </button>
              &nbsp;&nbsp;{i + 1} &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {listholder[keyName].actualmovietitle}
            </div>
          );
        })}
      </div>
    );
    return (
      <div>
        <h1>Movie of the Week</h1>
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
