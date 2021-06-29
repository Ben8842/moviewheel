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
      randoStop: 220,
      speed: [150, 75, 60, 50, 45, 75, 150, 200, 2500],
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
    var interval = setInterval(
      this.rotationTime.bind(this),
      this.speedCalculation()
    );
    if (this.state.randoStop == 220) {
      var rando = this.randomNumber(174, 190);
      this.setState({ interval: interval, randoStop: rando });
    } else {
      this.setState({ interval: interval });
    }
    console.log("rando value is  " + rando);
    console.log("randoStop value is  " + this.state.randoStop);

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
      return speed[x];
    } else if (tracker < 22) {
      x = 1;
      return speed[x];
    } else if (tracker < 42) {
      x = 2;
      return speed[x];
    } else if (tracker < 62) {
      x = 3;
      return speed[x];
    } else if (tracker < 92) {
      x = 4;
      return speed[x];
    } else if (tracker < 122) {
      x = 5;
      return speed[x];
    } else if (tracker < 142) {
      x = 6;
      return speed[x];
    } else if (tracker > 142) {
      x = 7;
      return speed[x];
    } else if (
      tracker > 152 &&
      this.state.randoStop - tracker < this.randomNumber(3, 15)
    ) {
      x = 8;
      return speed[x];
    } else if (tracker > 302) {
      clearInterval(this.state.interval);
      this.setState({
        spinningDone: true,
      });
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
      this.setState({
        spinningDone: true,
      });
      clearInterval(this.state.interval);
      console.log(this.state);
      return;
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
  /*
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
  */

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

    //  <button onClick={() => this.randomChoice()}>SPIN THE WHEEL</button>
    // <div>The movie of the week is: {randomChoice}</div>
    const spinButtons = (
      <div>
        <div>
          <button className="spinrain" onClick={() => this.startRotate()}>
            SPIN THE MOVIES
          </button>
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
                  spinFlag && spinningDone
                    ? "pickb" + i
                    : spinFlag && !spinningDone
                    ? "pick" + i
                    : !spinFlag
                    ? "reg"
                    : "reg"
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
              <div
                className={
                  spinFlag && spinningDone
                    ? "pickb" + i
                    : spinFlag && !spinningDone
                    ? "pick" + i
                    : !spinFlag
                    ? "reg"
                    : "reg"
                }
              >
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
        <div>
          <button className="topbuttons" onClick={() => this.addFlag()}>
            Add Movie
          </button>
          <button className="topbuttons" onClick={() => this.removeFlag()}>
            Remove Movie
          </button>
          <button className="topbuttons" onClick={() => this.spinMovie()}>
            Spin Movies
          </button>
        </div>
        <h3>Movie of the Week v2.2</h3>
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
