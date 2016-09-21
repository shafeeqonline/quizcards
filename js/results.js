import React from 'react';
import { Link } from 'react-router';
import Header from './Headers';
import Chart from 'chart.js';

class Headers extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      data: []
    };
  }

  componentWillMount() {
    let rows = 0;
    data.forEach(category => {
      if (category.questions.length > rows) {
        rows = category.questions.length;
      }
    });
    this.setState({data: data, rows: rows, cols: data.length});
  }


  render() {
    let userAnswers = window.answers, yourScore = 0, scoreArray = [];
    let actualQuestions = this.state.data[0].questions;
    actualQuestions.map((question, index) => {
      if(question.answer === userAnswers[index]){
        ++yourScore;
        scoreArray.push(yourScore);
      }
      else{
        scoreArray.push(0);
      }
    });
    setTimeout(() => {
      this.createChart(scoreArray);
    }, 0);

    return (
      <div >
      <Header data={this.state.data} headerWidth={this.state.windowWidth}/>
      <h3 className="your-score">Your score is {yourScore}</h3>
      <section className="score-graph">
        <canvas id="myChart" width="400" height="400"></canvas>
      </section>
      <section className="answers-section">
      <h2>Final Answers</h2>
      {
        actualQuestions.map((question, index) => {
          let questionHtml = { __html: question.question};
          return (
            <div key={index} className="each-question">
            <div dangerouslySetInnerHTML={questionHtml}></div>
            <div>The correct answer is "{question.answer}" and your answer is "{userAnswers[index]}"</div>
            </div>)
          })

        }
        </section>

        </div>
      );
    }

    createChart(scoreData) {
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["1", "2", "3", "4", "5"],
          datasets: [{
            label: '# of correct answers till the point',
            data:scoreData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    }
  };

  export default Headers;
