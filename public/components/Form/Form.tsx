import * as React from 'react';
import {Link} from "react-router-dom";

import './Form.scss';
import {Button} from "../Button/Button";

interface Props {
  fields?: Array<any>;
}

export class Form extends React.Component<Props, void> {
  constructor() {
    super();
  }

  render() {
    const data = this.props.fields;

    const content = data.map((item, index) => {
      return (
        <li key={index}>
          <label>
            { item.author }
          </label>
          <input name={item.name} type={item.type} placeholder={item.placeholder}/>
          <span name="{input.name}">
            { item.text }
            </span>
        </li>
      )
    });

    return (
      <div className="form__wrapper-elements">
        <div className="wrapper__form-center">
          <div className="form__header">
            <span>Soul Hunting</span>
          </div>
          <form className="form" name="{data.title}">
            <span className="errorText__response">
            </span>
            <ul>
              {content}
            </ul>
            <Link to="/">
              <Button text="SIGN IN" isActive={true}/>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
