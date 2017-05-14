import * as React from 'react';

import {Linked} from '../Linked/Linked';

import './Button.scss';

interface Props {
  text?: string;
  isActive?: boolean;
  click?: () => void;
  mouseOver?: () => void;
  size?: string;
  pathTo?: string;
}

export class Button extends React.Component<Props, any> {
  render() {
    const {isActive, text, click, mouseOver, size, pathTo}: any = this.props;

    const sizeStyle: any = this._getSize(size);

    return (
      <div
        className={ 'main__form-button ' + sizeStyle}
        onClick={ click }
        onMouseOver={ mouseOver }>
        <Linked pathTo={pathTo}>
          <div
            className={`main__form-button__background
          ${isActive ? 'start__background' : ''}`}>
            <p
              className={`main__form-button__text
            ${isActive ? 'start__button' : ''}`}>
              { text }
            </p>
          </div>
        </Linked>
      </div>
    );
  }

  _getSize(size: any): string {
    switch (size) {
      case 's':
        return 'main__form-button__size-s';
      case 'm':
        return 'main__form-button__size-m';
      default:
        return '';
    }
  }
}
