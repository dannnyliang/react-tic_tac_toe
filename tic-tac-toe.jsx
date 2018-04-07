class Svg extends React.Component{
  render () {
    let x1 = this.props.start%3 *100 + 50 
    let x2 = this.props.end%3 *100 + 50
    let y1 = Math.floor(this.props.start/3)*100 + 50
    let y2 = Math.floor(this.props.end/3)*100 + 50
    return (
      <svg width="300" height="300">
        <line x1={x1} x2={x2} y1={y1} y2={y2} />
      </svg>
    )
  }
}

class Cell extends React.Component{
  render () {
    let text = ''
    if (this.props.marks[this.props.index] == 0) {
      text = 'O'
    }else if(this.props.marks[this.props.index] == 1){
      text = 'X'
    }
    return (
      <div className="cell" onClick={this.handleClick.bind(this)} >{text}</div>
    )
  }
  handleClick(e) {
    this.props.update(this.props.index)
  }
}

class Game extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      round: 0,
      marks: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      win: ''
    }
  }
  render () {
    let cell= []
    for (let i = 0; i <= this.state.marks.length-1; i++) {
      cell.push(<Cell key={i} index={i} 
        marks={this.state.marks}
        update={this.updateMark.bind(this)} 
        />)
    }
    if (this.state.win) {
      cell.push(<Svg start={this.state.win.startIndex} end={this.state.win.endIndex} />)
      record.push(this.state)
      localStorage.setItem('record', JSON.stringify(record))
      ReactDOM.render(<Score />, document.querySelector('.scoreArea'))
    }
    return (
      <div className="game">{cell}</div>
    )
  }
  updateMark(index){
    if (this.state.marks[index] == -1) {
      let newMarks = this.state.marks
      if (this.state.round % 2 == 0) {
        newMarks[index] = 0
      }else{
        newMarks[index] = 1
      }

      let winner = this.checkWin(this.state.marks)
      this.setState((preState) => {
        return {
          round: preState.round+=1,
          marks: newMarks,
          win: winner
        }
      })
    }
  }
  checkWin(marks) {
    /*
      0  1  2
      3  4  5
      6  7  8
    */

    // check水平
    for (let y = 0; y < 3; y++) {
      if (marks[y*3] !== -1 && marks[y*3] === marks[y*3 + 1] && marks[y*3 + 1] === marks[y*3 + 2]) {
        return {
          winner: marks[y*3],
          startIndex: y*3,
          endIndex: y*3 + 2
        }
      }
    }
    // check垂直
    for (let x = 0; x < 3; x++) {
      if (marks[x] !== -1 && marks[x] === marks[x + 3] && marks[x + 3] === marks[x + 6]) {
        return {
          winner: marks[x],
          startIndex: x,
          endIndex: x + 6
        }
      }
    }
    // check斜線
    if (marks[0] !== -1 && marks[0] === marks[4] && marks[4] === marks[8]) {
      return {
        winner: marks[0],
        startIndex: 0,
        endIndex: 8
      }
    }
    if (marks[2] !== -1 && marks[2] === marks[4] && marks[4] === marks[6]) {
      return {
        winner: marks[2],
        startIndex: 2,
        endIndex: 6
      }
    }
    return null
  }
}

class Score extends React.Component {
  render() {
    let scoreList = []
    // if (record.length < 1) {
    //   scoreList = <li>
    //     Winner : null
    //     <br />
    //     Rounds : null
    //   </li>
    // }
    scoreList = record.map(item => <li>
      Winner : {item.win.winner == 0 ? 'Player1' : 'Player2'}
      <br/>
      Rounds : {item.round}</li>)
    scoreList.push(<button onClick={this.handleClick.bind(this)}>再來一局</button>)
    return (
      <ul>{scoreList}</ul>
    )
  }
  handleClick(){
    ReactDOM.render(<Game />, document.querySelector('.gameArea'))
  }
}

// let record
let record = JSON.parse(localStorage.getItem('record')) || []
window.addEventListener('load',() => {
  ReactDOM.render(<Game />, document.querySelector('.gameArea'))
  ReactDOM.render(<Score/>, document.querySelector('.scoreArea'))
})