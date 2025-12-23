import { ValidatorComponent } from 'react-form-validator-core'

import Input from './Input'

export default class TextValidator extends ValidatorComponent {
  renderValidatorComponent () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { errorMessages, validatorListener, ...rest } = this.props
    return (
      <Input { ...rest }></Input>
    )
  }

  errorText () {
    const { isValid } = this.state

    if (isValid) {
      return null
    }

    return (
      <div style={ { color: 'red' } }>
        { this.getErrorMessage() }
      </div>
    )
  }
}