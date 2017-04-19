import * as React from 'react';

import {Button} from "../../components/Button/Button";
import {Table} from "../../components/Table/Table";
import {Background} from "../../components/Background/Background";

import './Scoreboard.scss';
import {Link} from "react-router-dom";

const header = [{
  title: 'Username'
}, {
  title: 'Score'
}];

const content = [{
  username: 'pupkin',
  score: 1042
}, {
  username: 'pupkin',
  score: 1042
}, {
  username: 'pupkin',
  score: 1042
}, {
  username: 'pupkin',
  score: 1042
}, {
  username: 'pupkin',
  score: 1042
}, {
  username: 'pupkin',
  score: 1042
}, {
  username: 'pupkin',
  score: 1042
}];

export class Scoreboard extends React.Component<void, void> {
  render() {
    return (
      <div className="wrapper__scoreboard">
        <Background />
        <Table header={ header } content={ content }/>
        <div className="more__button">
          <Link to="/">
            <Button text="More" isActive={ true }/>
          </Link>
        </div>
      </div>
    );
  }
}
