import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
//import { Input } from "react-materialize";

class TextValidator extends ValidatorForm {
  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      validatorListener,
      ...rest
    } = this.props;

    return (
      <div>
        <input
          {...rest}
          ref={r => {
            this.input = r;
          }}
        />
        {this.errorText()}
      </div>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return <div style={{ color: "red" }}>{this.getErrorMessage()}</div>;
  }
}

export default TextValidator;
