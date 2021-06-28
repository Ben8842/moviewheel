import "./App.css";
import React, { Component } from "react";

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      choice: "",
      placeholder: "",
      listholder: "",
      randomChoice: "???",
      rotator: 0,
      tracker: 0,
      addMovieFlag: false,
      deleteMovieFlag: false,
      spinFlag: false,
      randoStop: 240,
      speed: [300, 100, 50, 40, 35, 40, 300, 900, 1200],
      spinningDone: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //example of how to run it a certain amount of times
  //hyou can do random number of times with a random function
  /*
  var timesRun = 0;
var interval = setInterval(function(){
    timesRun += 1;
    if(timesRun === 60){
        clearInterval(interval);
    }
    //do whatever here..
}, 2000); 
*/

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  startRotate() {
    var timesRun = 0;
    var rando = this.randomNumber(120, 220);
    console.log("rando value is  " + rando);
    var interval = setInterval(
      this.rotationTime.bind(this),
      this.speedCalculation()
    );
    this.setState({ interval: interval, randoStop: rando });
    console.log(rando + "startROTATE");

    /*
    var interval = setInterval(function () {
      this.rotationTime();
      timesRun += 1;
      if (timesRun === rando) {
        clearInterval(interval);
      }
    }, 300);
    */

    /* var interval = setInterval(this.rotationTime.bind(this), 300);
    this.setState({ interval: interval });
    if (this.state.tracker === 25) {
      clearInterval(this.state.interval);
    }*/
  }

  componentDidMount() {
    // const storageTasks = JSON.parse(localStorage.getItem("toDoData"));
    this.getList();

    /* if (storageTasks !== null) {
      this.setState((state) => {
        return {
          content: storageTasks,
        };
      }); 
    }*/
  }

  speedCalculation() {
    var { speed, tracker } = this.state;
    var x;
    if (tracker < 10) {
      x = 0;
    } else if (tracker < 20) {
      x = 1;
    } else if (tracker < 40) {
      x = 2;
    } else if (tracker < 60) {
      x = 3;
    } else if (tracker < 90) {
      x = 4;
    } else if (tracker < 120) {
      x = 5;
    } else if (tracker < 140) {
      x = 6;
    } else if (tracker < 150) {
      x = 7;
    } else if (tracker < 155) {
      x = 8;
    }
    return speed[x];
  }

  addFlag() {
    if (this.state.addMovieFlag === false) {
      this.setState({ addMovieFlag: true });
    } else this.setState({ addMovieFlag: false });
  }

  removeFlag() {
    if (this.state.removeMovieFlag === false) {
      this.setState({ removeMovieFlag: true });
    } else this.setState({ removeMovieFlag: false });
  }

  spinMovie() {
    if (this.state.spinFlag === false) {
      this.setState({ spinFlag: true });
    } else this.setState({ spinFlag: false });
  }

  rotationTime() {
    if (this.state.rotator < this.state.listholder.length - 1) {
      this.setState({
        rotator: this.state.rotator + 1,
        tracker: this.state.tracker + 1,
      });
    } else this.setState({ rotator: 0 });
    console.log(this.state.tracker);
    if (this.state.tracker === this.state.randoStop) {
      console.log(
        this.state.tracker + "tracker stopper" + this.state.randoStop
      );
      clearInterval(this.state.interval);
      this.setState({
        spinningDone: true,
      });
    }
    if (this.state.tracker % 10 === 0) {
      clearInterval(this.state.interval);
      this.startRotate();
      console.log("TENBLOCKS");
    }
    this.getList();
  }

  shuffle(arry) {
    arry.sort(() => Math.random() - 0.5);
  }

  randomChoice() {
    var { listholder, randomChoice } = this.state;
    console.log(listholder.length);
    var tempList = [];
    for (var x = 0; x < listholder.length; x++) {
      tempList.push(listholder[x].actualmovietitle);
      console.log("pushing" + listholder[x].actualmovietitle);
    }
    console.log(tempList);
    this.shuffle(tempList);
    console.log(tempList[4] + "next" + tempList);
    this.setState({ randomChoice: tempList[4] });
    console.log(randomChoice);
    console.log("is this working?");
    clearInterval(this.state.interval);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: "",
    });
    this.getList();
  }
  /*
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
  */

  getList() {
    var { listholder } = this.state;
    fetch("/superlistcontent", {
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

        this.setState({
          listholder: data,
          addMovieFlag: false,
          removeMovieFlag: false,
        });

        //  console.log("getData data data");
      });
  }

  addTask(newInput) {
    console.log("adding content  " + newInput);

    var { value, placeholder } = this.state;
    // content.push(newInput);
    /* this.setState((state) => {
      return {
        content: content,
      };
    });*/

    console.log({ value });

    fetch("/superlistcontent", {
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
    fetch("/superlistcontent/" + e.target.id, {
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
    var {
      listholder,
      randomChoice,
      rotator,
      addMovieFlag,
      removeMovieFlag,
      spinFlag,
      spinningDone,
    } = this.state;

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
        </form>
      </div>
    );

    const spinButtons = (
      <div>
        <div>
          <button onClick={() => this.randomChoice()}>SPIN THE WHEEL</button>
        </div>
        <div>The movie of the week is: {randomChoice}</div>
        <div>
          <button onClick={() => this.startRotate()}>TEST ROTATION</button>
        </div>
      </div>
    );

    const listR = (
      <div>
        {Object.keys(listholder).map((keyName, i) => {
          return (
            <div className="leftside" key={i}>
              <div
                className={
                  spinFlag && !spinningDone
                    ? "pick" + i
                    : spinFlag && spinningDone
                    ? "pickB" + i
                    : null
                }
              >
                <button
                  onClick={(e) => this.removeTask(e)}
                  type="button"
                  id={
                    listholder[
                      (parseInt(keyName, 10) + rotator) % listholder.length
                    ]._id
                  }
                >
                  X
                </button>
                &nbsp;&nbsp;
                {((parseInt(i, 10) + rotator) % listholder.length) + 1} &nbsp;
                &nbsp; &nbsp; &nbsp;{" "}
                {
                  listholder[
                    (parseInt(keyName, 10) + rotator) % listholder.length
                  ].actualmovietitle
                }
              </div>
            </div>
          );
        })}
      </div>
    );

    const list = (
      <div>
        {Object.keys(listholder).map((keyName, i) => {
          return (
            <div className="leftside" key={i}>
              <div className={"pick" + i}>
                &nbsp;&nbsp;
                {((parseInt(i, 10) + rotator) % listholder.length) + 1} &nbsp;
                &nbsp; &nbsp; &nbsp;{" "}
                {
                  listholder[
                    (parseInt(keyName, 10) + rotator) % listholder.length
                  ].actualmovietitle
                }
              </div>{" "}
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
        <button onClick={() => this.addFlag()}>Add Movie</button>
        <button onClick={() => this.removeFlag()}>Remove Movie</button>
        <button onClick={() => this.spinMovie()}>Spin Movies</button>
        <h3>Movie of the Week v1.2</h3>
        <div>
          <div>{addMovieFlag ? inputBoxAndButton : null}</div>
          <div>{spinFlag ? spinButtons : null}</div>
          <div> &nbsp; &nbsp; &nbsp;</div>

          <div>{removeMovieFlag ? listR : list}</div>
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
