import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Headers from './Headers';
import Landing from './landing';
import Results from './results';
import { Router, Route, Link, browserHistory } from 'react-router';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            data: [],
            answers: {}
        };
    }

    updateAnswer(answerObj){
      let stateAnswerObj={}, questionNumber = answerObj.number;
      stateAnswerObj[questionNumber] = answerObj.option;
      this.setState({
        answers: Object.assign(this.state.answers, stateAnswerObj)
      });
      window.answers = this.state.answers;
    }

    handleResize(event) {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }


    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
        let rows = 0;
        data.forEach(category => {
            if (category.questions.length > rows) {
                rows = category.questions.length;
            }
        });
        this.setState({data: data, rows: rows, cols: data.length});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        let headerHeight = this.state.windowWidth > 640 ? 60 : 32,
            cardWidth = this.state.windowWidth / this.state.cols,
            cardHeight = (this.state.windowHeight - headerHeight) / this.state.rows,
            cards = [];

        this.state.data.forEach((category, categoryIndex) => {
            let left = categoryIndex * cardWidth;
            category.questions.forEach((question, questionIndex) => {
                cards.push(<Card answer={this.updateAnswer.bind(this)} questionIndex={questionIndex} left={left} top={ headerHeight} height={window.innerHeight} width={cardWidth} question={question} key={categoryIndex + '-' + questionIndex}/>);
            })
        });
        return (
            <div>
                  <Link to={`/results`} className="submit-button btn"><button>View Results</button></Link>
                <Headers data={this.state.data} headerWidth={cardWidth}/>
                {cards}
            </div>
        );
    }

};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path="quiz" component={App}/>
    <Route path="results" component={Results}/>
  </Router>
  , document.getElementById('app'));
