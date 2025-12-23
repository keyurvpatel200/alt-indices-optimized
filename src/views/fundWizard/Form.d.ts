import { Dispatch, SetStateAction } from 'react'

interface FormProps {
  step: number
  setStep: Dispatch<SetStateAction<number>>
  setModal: Dispatch<SetStateAction<boolean>>
  selectedFund?: any
}

declare const Form: React.FC<FormProps>
export default Form
