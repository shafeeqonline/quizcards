import React from 'react';
import { Link } from 'react-router';
import Header from './Headers';

class Headers extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          data: []
      };
  }

  componentDidMount() {
      let rows = 0;
      data.forEach(category => {
          if (category.questions.length > rows) {
              rows = category.questions.length;
          }
      });
      this.setState({data: data, rows: rows, cols: data.length});
  }

    render() {

        return (
            <div>
                <Header data={this.state.data} headerWidth={this.state.windowWidth}/>
                <section className="login-details">
                  <input className="user-input" placeholder="username" type="text"></input>
                  <Link to={`/quiz`}><button className="flat">Submit</button></Link>
                </section>
            </div>
        );
    }

};

export default Headers;
