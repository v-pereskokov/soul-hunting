import * as React from 'react';

export class FooterHelp extends React.Component<void, void> {
  render() {
    return (
      <div className='footer__wrapper__help'>
        <img className='footer__help-img' src='../../static/images/arrows.png'/>
        <p className='footer__help-selector'>Control</p>
        <img className='footer__help-img footer__help-img-enter' src='../../static/images/enter_button.png'/>
        <p className='footer__help-enter'>Select</p>
      </div>
    );
  }
}
