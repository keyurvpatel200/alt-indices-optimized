// ** React Imports
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// ** Custom Component Import
import CommonLoader from '../../components/common/CommonLoader'

//**  Interface Component
import { IFundDetails } from '../../interface/fund'

// ** Redux Actions and Reducers Import
import { StoreType } from '@/service/store'
import { fetchFundsDetailsApi } from './state'

//**  Asset Component
import edit from '../../assets/images/gray-edit-icon.svg'
import performance from '../../assets/images/v-performance.svg'
import viewCashflow from '../../assets/images/view-cashflow.svg'

export default function FundDetails() {
  // **Hooks
  const { id } = useParams()
  const dispatch = useDispatch()

  // **States
  const navigate = useNavigate()
  const { fundDetails, loader, typeLoader } = useSelector((state: StoreType) => ({
    fundDetails: state?.funds?.fundDetails as IFundDetails,
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader
  }))

  const fundData: {
    id: number
    name: string
    type: number | string | boolean | null
  }[] = [
    { id: 1, name: 'Fund ID', type: fundDetails?.fund_id },
    { id: 2, name: 'Name', type: fundDetails?.name },
    { id: 3, name: 'Vintage Year', type: fundDetails?.vintage_year },
    { id: 4, name: 'Asset Class', type: fundDetails?.asset_class },
    { id: 5, name: 'Strategy', type: fundDetails?.strategy?.join(', ') },
    {
      id: 6,
      name: 'Primary Geographic Focus',
      type: fundDetails?.primary_geographic_focus
    },
    { id: 7, name: 'Countries', type: fundDetails?.country },
    { id: 8, name: 'Status', type: fundDetails?.status },
    { id: 9, name: 'Fund Size (USD)', type: fundDetails?.fund_size_usd },
    { id: 10, name: 'Fund Structure', type: fundDetails?.fund_structure },
    {
      id: 11,
      name: 'Fund Legal Structure',
      type: fundDetails?.fund_legal_structure
    },
    {
      id: 12,
      name: 'Fund Number (Overall)',
      type: fundDetails?.fund_number_overall
    },
    {
      id: 13,
      name: 'Fund Number (Series)',
      type: fundDetails?.fund_number_series
    },
    { id: 14, name: 'Single Deal Fund', type: fundDetails?.single_deal_fund },
    { id: 15, name: 'Lifespan (Years)', type: fundDetails?.lifespan_years },
    {
      id: 16,
      name: 'Lifespan Extension',
      type: fundDetails?.lifespan_extension
    },
    { id: 17, name: 'Fund Currency', type: fundDetails?.fund_currency },
    { id: 18, name: 'Target Size (USD MN)', type: fundDetails?.target_size },
    { id: 19, name: 'Core Industries', type: fundDetails?.core_industries },
    { id: 20, name: 'Industries', type: fundDetails?.industries },
    {
      id: 21,
      name: 'Offer Co-Investiment Opportunities to LPS?',
      type: fundDetails?.offer_co_investment_opportunities
    },
    {
      id: 22,
      name: 'Subscription Credit Facility ',
      type: fundDetails?.subscription_credit_facility
    }
  ]

  const getFundDetails = useCallback(async (id: string) => {
    dispatch({
      type: 'funds/setFundLoader',
      payload: { loader: true, typeLoader: 'fundDetails' }
    })
    await fetchFundsDetailsApi(id)
      .then((res) => {
        dispatch({ type: 'funds/setDetails', payload: res })
        dispatch({
          type: 'funds/setFundLoader',
          payload: { loader: false, typeLoader: 'fundDetails' }
        })
      })
      .catch(() => {
        dispatch({
          type: 'funds/setFundLoader',
          payload: { loader: false, typeLoader: 'fundDetails' }
        })
      })
  }, [])

  useEffect(() => {
    if (id) {
      getFundDetails(id)
    }
  }, [id])

  return loader && typeLoader === 'fundDetails' ? (
    <div className='common-loader'>
      <CommonLoader />
    </div>
  ) : (
    <div className='fund-list-wrapper'>
      <div className='fund-profile-header-row'>
        <div className='fund-heading-row'>
          <label>Fund Profile</label>
          <p>
            The fund focuses on high-growth companies within emerging markets, targeting sectors
            like technology, healthcare, and renewable energy to deliver long-term value.
          </p>
        </div>
        <div className='fund-right-sec'>
          <button className='request-btn' onClick={ () => navigate(`/layout/fund/edit/${id}`) }>
            <img src={ edit } alt='' />
            Request to edit
          </button>
          <button onClick={ () => navigate(`/layout/fund/cashflow/${id}`) } className='request-btn'>
            <img src={ viewCashflow } alt='' />
            View Cashflows
          </button>
          <button
            onClick={ () => navigate(`/layout/fund/performance/${id}`) }
            className='view-performance-btn'
          >
            <img src={ performance } alt='' />
            Direct Performance Submission
          </button>
        </div>
      </div>

      <div className='fund-detail-row'>
        {
          fundData.map((fund) => (
            <div
              className={ `fund-col-row ${fund.name === 'Status' ? 'status-class' : ''}` }
              key={ fund.id }
            >
              <label>{fund?.name}</label>
              <span>{fund?.type ? fund?.type : 'N/A'}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}
