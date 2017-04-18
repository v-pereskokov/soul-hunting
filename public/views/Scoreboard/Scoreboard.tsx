import * as React from 'react';
import {Link} from "react-router-dom";

import {Button} from "../../components/Button/Button";
import {Table} from "../../components/Table/Table";

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
      <Table header={ header } content={ content }/>
    );
  }
}
