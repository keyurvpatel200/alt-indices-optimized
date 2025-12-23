// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ** Custom Component Import
import { IAddFund } from '../../../interface/fund'
import FundForm from './FundForm'

// ** Utils Import
import { fundValidationSchema } from '../validations'

// ** Redux Actions and Reducers Import
import { addFundsApi } from '../state'

// ** Asset Import
import Alt from '../../../assets/images/alt-logo.svg'

const initialValue: IAddFund = {
  fund_id: '',
  name: '',
  vintage_year: '',
  asset_class: '',
  strategy: '',
  target_size: '',
  primary_geographic_focus: '',
  fund_size_usd: '',
  status: '',
  country: '',
  fund_structure: '',
  fund_legal_structure: '',
  fund_number_overall: '',
  fund_number_series: '',
  single_deal_fund: '',
  lifespan_years: '',
  lifespan_extension: '',
  fund_currency: '',
  core_industries: '',
  industries: '',
  offer_co_investment_opportunities: '',
  subscription_credit_facility: ''
}

export default function NewFund() {
  // **Hooks
  const dispatch = useDispatch()

  // **States
  const [fundData] = useState<IAddFund>(initialValue)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    trigger
  } = useForm({
    defaultValues: fundData,
    resolver: zodResolver(fundValidationSchema()),
  })

  const onSubmit = async (data: IAddFund) => {
    dispatch({
      payload: { loader: true, typeLoader: 'addFund' },
      type: 'funds/setFundLoader'
    })
    await addFundsApi({ ...data, fund_size_usd: data?.fund_size_usd })
      .then(() => {
        dispatch({
          payload: { loader: false, typeLoader: 'addFund' },
          type: 'funds/setFundLoader'
        })
        navigate('/layout/fund')
      })
      .catch(() => {
        dispatch({
          payload: { loader: false, typeLoader: 'addFund' },
          type: 'funds/setFundLoader'
        })
      })
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="add-fund-header">
        <Link to="/layout/dashboard">
          <img src={ Alt } alt="" />
        </Link>
      </div>
      <FundForm
        setValue={ setValue }
        errors={ errors }
        trigger={ trigger }
        register={ register }
        getValues={ getValues }
      />
    </form>
  )
}
