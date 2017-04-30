import * as React from 'react';

import './Button.scss';

interface Props {
  text?: string;
  isActive?: boolean;
  click?: () => void;
  mouseOver?: () => void;
}

export class Button extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { isActive, text, click, mouseOver } = this.props;

    return (
      <div
        className='main__form-button'
        onClick={ click }
        onMouseOver={ mouseOver }
      >
        <div
          className={`main__form-button__background
          ${isActive ? 'start__background' : ''}`}>
          <p
            className={`main__form-button__text
            ${isActive ? 'start__button' : ''}`}>
            { text }
          </p>
        </div>
      </div>
    );
  }
}
