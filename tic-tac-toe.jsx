

class Cell extends React.Component{
  render () {
    let text = ''
    if (this.props.mark == 0) {
      text = 'O'
    }else if(this.props.mark == 1){
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
      cell.push(<Cell key={i} index={i} mark={this.state.marks[i]} update={this.updateMark.bind(this)}/>)
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

      this.setState((preState) => {
        return {
          round: preState.round+=1,
          marks: newMarks,
          win: ''
        }
      })
    }
  }
}

window.addEventListener('load',() => {
  ReactDOM.render(<Game/>, document.body)
})