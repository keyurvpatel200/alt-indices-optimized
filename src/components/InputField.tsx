// ** Third party libraries
import { UseFormRegisterReturn } from 'react-hook-form'

// ** Mui Components Imports
import { FormHelperText } from '@mui/material'

// ** Custom Components Imports
import Input from './Input'

// Define the input types for the props
interface InputFieldProps {
  name: string
  value?: string | number | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'checkbox' | 'radio' // Extend with more types if necessary
  className?: string
  errorMsg?: string | null | boolean | undefined
  label?: string
  placeholder?: string
  isDisable?: boolean
  register?: UseFormRegisterReturn
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  onChange,
  type = 'text',
  className = '',
  errorMsg,
  label,
  placeholder,
  isDisable = false,
  register,
}) => {
  return (
    <>
      <div className="form-group">
        { !!label && <label>{ label }</label> }
        <Input
          type={ type }
          value={ value }
          name={ name }
          disabled={ isDisable }
          { ...register }
          onChange={ onChange }
          placeholder={ placeholder }
          className={ 'custom-input ' + className }
        />
      </div>
      { !!errorMsg && <FormHelperText className="text-danger">{ errorMsg }</FormHelperText> }
    </>
  )
}

export default InputField
