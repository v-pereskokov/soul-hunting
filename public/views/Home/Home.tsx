import * as React from 'react';
import {Button} from "../../components/Button/Button";
import {connect} from "react-redux";
import { Link } from 'react-router';

import { NEXT_BUTTON } from '../../constants/Buttons/Buttons';

import './Home.scss';

class Home extends React.Component<void, void> {
  mouse(event) {
    if (event.type === 'mouseover') {
      console.log(event.target);
    }
  }

  test(top, number) {
    top = number === 1 ? top : !top;
    this.props.onTest(top, !top);
  }

  render() {
    const buttons = [
      {
        number: 1,
        text: 'SIGN IN',
        url: '/signin',
        isActive: this.props.button1
      },
      {
        number: 2,
        text: 'REGISTER',
        url: '/signup',
        isActive: this.props.button2
      }
    ];

    const buttonsRender = buttons.map((item, index) => {
      return (
        <Link to={ item.url } key={ index }>
          <Button
            text={ item.text }
            isActive={ item.isActive }
            mouseOver={ this.test.bind(this, true, item.number) }
          />
        </Link>
      );
    });

    return (
      <div className="wrapper__form">
        <div className="wrapper__main__form">
          <div className='main__form'>
            { buttonsRender }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    button1: state.buttons[0].button,
    button2: state.buttons[1].button
  }),

  dispatch => ({
    onTest: (button1, button2) => {
      dispatch({
        type: NEXT_BUTTON,
        payload: [
          {
            button: button1
          },
          {
            button: button2
          }
        ]
      })
    }
  })
)(Home);
