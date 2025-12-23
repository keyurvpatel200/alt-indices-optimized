// ** MUI Components Imports
import { FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

// Define types for the option structure
export interface Option {
  value: string | number
  label: string
}

// Define the select types for the props
interface SelectBoxProps {
  name: string
  label?: string
  value?: string | number | boolean
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void // Accept full event
  errorMsg?: string | number
  options: Option[]
  className?: string
  isDisabled?: boolean
  placeholder?: string
  renderValue?: (value: string) => React.ReactNode
}

// Styled Select component
export const StyledSelect = styled(Select)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiSelect-select': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F9FAFB',
    border: '1px solid #D0D5DD',
    borderColor: ' #D0D5DD',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha('#1D2939', 0.25)} 0 0 0 0.2rem`,
      borderColor: '#D0D5DD',
      backgroundColor: '#FFFFFF'
    }
  }
}))

const SelectBox = ({
  name,
  label,
  value,
  onChange,
  errorMsg,
  options = [],
  className = '',
  isDisabled = false,
  placeholder = 'Select an option',
  renderValue
}: SelectBoxProps) => {
  return (
    <>
      <div className={ `form-group ${className}` }>
        { label && <InputLabel>{ label }</InputLabel> }
        <StyledSelect
          name={ name }
          value={ value || '' }
          onChange={ (event, child) => onChange(event, child) }
          disabled={ isDisabled }
          className="custom-input"
          renderValue={ renderValue ? (selected) => renderValue(selected as string) : undefined }
        >
          <MenuItem value="">{ placeholder }</MenuItem>
          { options.map((option: Option) => (
            <MenuItem value={ option.value } key={ option.value }>
              { option.label }
            </MenuItem>
          )) }
        </StyledSelect>
      </div>
      { !!errorMsg && <FormHelperText className="text-danger">{ errorMsg }</FormHelperText> }
    </>
  )
}

export default SelectBox
