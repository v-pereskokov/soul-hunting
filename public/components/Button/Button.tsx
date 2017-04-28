import * as React from 'react';

import './Button.scss';

interface Props {
  text?: string;
  isActive?: boolean;
  onClick?: () => void;
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

  render() {
    const { isActive, text, onClick } = this.props;

    return (
      <div
        className='main__form-button'
        onClick={ onClick }
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

//onClick={ onClick() }
