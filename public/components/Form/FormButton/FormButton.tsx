import * as React from 'react';
import {Button} from "../../Button/Button";
import {submit} from 'redux-form';
import {connect} from 'react-redux';

interface Props {
  text: string;
  click?: () => void;
}

class FormButton extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {dispatch} = this.props;

    return (
      <Button
        text={ this.props.text }
        isActive={ true }
        click={ () => {
          dispatch(submit('form'));
          this.props.click();
        }
        }
      />
    );
  }
}

export default connect()(FormButton);
