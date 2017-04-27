import * as React from 'react';

import './Button.scss';

interface Props {
  text?: string;
  isActive?: boolean;
  onClick?: () => void;
  type?: string;
}

export class Button extends React.Component<Props, void> {
  constructor(props: Props =
                {
                  text: 'text',
                  isActive: true,
                  onClick: null,
                  type: 'button'
                }) {
    super(props);
  }

  alertt() {
    alert('hello');
  }

  render() {
    const { isActive, text, onClick, type } = this.props;

    return (
      <div
        className='main__form-button'
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
