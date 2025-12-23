// ** Mui Components Imports
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

// Define the radio types for the props
interface RadioButtonProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  isDisabled?: boolean
  checked?: boolean
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  onChange,
  className = '',
  isDisabled = false,
  checked = false
}) => {
  return (
    <div className={ `form-check ${className}` }>
      <RadioGroup name={ name } value={ value } onChange={ onChange }>
        <FormControlLabel
          disabled={ isDisabled }
          value={ value }
          label={ label }
          control={ <Radio disabled={ isDisabled } checked={ checked } /> }
        />
      </RadioGroup>
    </div>
  )
}

export default RadioButton
