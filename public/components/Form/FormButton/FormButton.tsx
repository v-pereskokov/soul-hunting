import * as React from 'react';
import {Button} from '../../Button/Button';
import {submit} from 'redux-form';
import {connect} from 'react-redux';

interface Props {
  text?: string;
  click?: () => void;
  submit?: (func: any) => void;
}

class FormButton extends React.Component<Props, void> {
  render() {
    return (
      <Button
        text={ this.props.text }
        isActive={ true }
        click={ () => {
          this.props.submit(() => submit('form'));
          this.props.click();
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    submit: (submit: any) => {
      dispatch(submit());
    }
  }
};

export default connect<{}, {}, Props>(null, mapDispatchToProps)(FormButton);
