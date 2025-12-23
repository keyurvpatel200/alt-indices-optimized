// ** Third-party Imports
import ReactDatePicker from 'react-datepicker'
import { FormHelperText } from '@mui/material'

interface CommonDatePickerProps {
  label?: string
  required?: boolean
  onChange: (date: Date | [Date | null, Date | null] | null) => void
  value?: string | Date | null | [Date | null, Date | null]
  errorMessage?: string | undefined
  disabled?: boolean
  isClearable?: boolean
  showAge?: boolean
  showIcon?: boolean
  minDate?: Date
  maxDate?: Date
  showYearDropdown?: boolean
  showMonthDropdown?: boolean
  inline?: boolean
  name?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  readOnly?: boolean
  isShowWorkingDays?: boolean
  isRange?: boolean
  placeholderText?: string
  datePickerRef?: any
  rangeValue?:[Date | null | string, Date | null | string] | []
}

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  label,
  required = false,
  onChange,
  value,
  errorMessage,
  disabled = false,
  isClearable = false,
  minDate,
  maxDate,
  showYearDropdown = true,
  showMonthDropdown = true,
  inline,
  name,
  onBlur,
  readOnly,
  isShowWorkingDays = false,
  isRange = false,
  placeholderText,
  datePickerRef,
  rangeValue=[]
}) => {

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  return (
    <div className='form-group'>
      {label && (
        <div className='dateInner'>
          <label htmlFor='EffectiveDate' className='form-label'>
            {label} {required && <span className='text-danger'>*</span>}
          </label>
        </div>
      )}

      {isRange ? (
        <ReactDatePicker
          selected={ rangeValue && rangeValue?.[0] ? new Date(rangeValue[0] ?? '') : null }
          onChange={ onChange } 
          startDate={ rangeValue && rangeValue?.[0] ? new Date(rangeValue[0] ?? '') : null }
          endDate={ rangeValue && rangeValue?.[1] ? new Date(rangeValue[1] ?? '') : null }
          selectsRange
          autoComplete='off'
          ref={ datePickerRef }
          isClearable={ isClearable }
          name={ name }
          onBlur={ onBlur }
          disabled={ disabled }
          filterDate={ (date: Date) => (isShowWorkingDays ? isWeekday(date) : true) }
          inline={ inline }
          dateFormat='yyyy/MM/dd'
          placeholderText={ placeholderText }
          yearDropdownItemNumber={ 100 }
          scrollableYearDropdown
          readOnly={ readOnly }
          showMonthDropdown={ showMonthDropdown }
          showYearDropdown={ showYearDropdown }
          minDate={ minDate }
          maxDate={ maxDate }
          customInput={ <></> }
        />
      ) : (
        <ReactDatePicker
          selected={ value ? new Date(value as string | Date) : null }
          onChange={ (newDate: Date | null) => onChange(newDate) }
          autoComplete='off'
          ref={ datePickerRef }
          isClearable={ isClearable }
          name={ name }
          onBlur={ onBlur }
          disabled={ disabled }
          filterDate={ (date: Date) => (isShowWorkingDays ? isWeekday(date) : true) }
          inline={ inline }
          dateFormat='yyyy/MM/dd'
          placeholderText={ placeholderText }
          yearDropdownItemNumber={ 100 }
          scrollableYearDropdown
          readOnly={ readOnly }
          showMonthDropdown={ showMonthDropdown }
          showYearDropdown={ showYearDropdown }
          minDate={ minDate }
          maxDate={ maxDate }
        />
      )}

      {errorMessage && <FormHelperText className='text-danger'>{errorMessage}</FormHelperText>}
    </div>
  )
}

export default CommonDatePicker
