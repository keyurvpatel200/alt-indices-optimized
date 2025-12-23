// ** Service Import
import Effects from '@/boot/effects'
import axiosInstance from '@/service/axios'

// ** Interfaces Type Import
import {
  IAddFund,
  ICashFlowTimeLine,
  IFinancialMetricsDetails,
  IFundDetails,
  IFundManagerInformation,
  IFundPeFieldChange,
  IFundPerformanceInformation,
  IFundReviewList
} from '@/interface/fund'

// Fund List
export const fetchFundsListApi = async (page: number, search?: string) => {
  return await axiosInstance
    .get(`/funds/?page=${page}${search ? `&search=${search}` : ''}`)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Add Funds
export const addFundsApi = async (data: IAddFund) => {
  return await axiosInstance
    .post('/funds/', data)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Fund Manager Information
export const fundManagerInformationApi = async (data: IFundManagerInformation) => {
  return await axiosInstance
    .post('/fund-manager/', data)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Fetch Fund Details
export const fetchFundsDetailsApi = async (id: string) => {
  return await axiosInstance
    .get('/funds/' + id)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Update Fund
export const updateFundsData = async (id: string, data: { [key: string]: boolean | string }) => {
  return await axiosInstance
    .patch('/funds/' + id + '/', data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Update Fund Details
export const updateFundsDetails = async (id: string, data: IAddFund) => {
  return await axiosInstance
    .put('/funds/' + id + '/', data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Get Fund Performance Timeline
export const getFundPerformanceTimeline = async (query: string) => {
  return await axiosInstance
    .get(`/fund-performance/timeline?${query}`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Get Fund Performance Information
export const getFundPerformanceInfo = async (id: string) => {
  return await axiosInstance
    .get(`/fund-performance/${id}/`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Create Fund Performance Information
export const createFundPerformanceInfo = async (data: IFundPerformanceInformation) => {
  return await axiosInstance
    .post('/fund-performance/', data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Put Fund Performance Information
export const putFundPerformanceInfo = async (id: number, data: IFundPerformanceInformation) => {
  return await axiosInstance
    .put(`/fund-performance/${id}/`, data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Delete Fund Performance Information
export const deleteFundPerformanceInfo = async (id: string | undefined) => {
  return await axiosInstance
    .delete(`/fund-performance/${id}/`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Create Fund Cashflow
export const createFundCashflow = async (data: ICashFlowTimeLine) => {
  return await axiosInstance
    .post('/cashflow-transaction/', data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Get Fund Cashflow
export const getFundCashflow = async (id: string) => {
  return await axiosInstance
    .get(`/cashflow-transaction/${id}/`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Update Fund Cashflow
export const updateFundCashflow = async (id: string | number, data: ICashFlowTimeLine) => {
  return await axiosInstance
    .put(`/cashflow-transaction/${id}/`, data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Delete Fund Cashflow
export const deleteFundCashflow = async (id: string) => {
  return await axiosInstance
    .delete(`/cashflow-transaction/${id}/`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// CashFlow Financial Metrics
export const getFundCashFlowFinancialMetrics = async (query: string) => {
  return await axiosInstance
    .get(`/cashflow-financial-metrics/?${query}`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Get CashFlow Timeline
export const getCashFlowTimeline = async (query: string) => {
  return await axiosInstance
    .get(`/cashflow-transaction/timeline/?${query}`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Get All Fund Review
export const getAllFundReview = async (query: string) => {
  return await axiosInstance
    .get(`/fund-field-change/?${query}`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Create Fund Review
export const createFundReview = async (data: IFundPeFieldChange[] | []) => {
  return await axiosInstance
    .post('/fund-field-change/', data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Get Fund Review
export const getFundReview = async (id: string) => {
  return await axiosInstance
    .get(`/fund-field-change/${id}/`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Update Fund Review
export const updateFundReview = async (id: string | number, data: IFundPeFieldChange) => {
  return await axiosInstance
    .put(`/fund-field-change/${id}/`, data)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

// Delete Fund Review
export const deleteFundReview = async (id: string | number) => {
  return await axiosInstance
    .delete(`/fund-field-change/${id}/`)
    .then(response => {
      return response?.data
    })
    .catch(error => {
      throw error
    })
}

export interface FundState {
  fundData: {
    results: IFundDetails[]
    count: number
    next: string | null
    previous: string | null
  }
  loader: boolean
  typeLoader: string
  fundDetails: IFundDetails
  financialMetricsDetails: IFinancialMetricsDetails | null
  reviewChange: IFundReviewList[] | []
}

export default {
  fundData: {
    results: [],
    count: 0,
    next: null,
    previous: null
  },
  loader: false,
  typeLoader: '',
  fundDetails: {},
  financialMetricsDetails: {
    total_contributions: 0,
    total_distributions: 0,
    dpi: 0,
    tvpi: 0,
    rvpi: 0,
    irr: 0
  },
  reviewChange: []
}

export function setList(
  state: FundState,
  {
    payload
  }: {
    payload: {
      results: IFundDetails[]
      count: number
      next: string | null
      previous: string | null
    }
  }
) {
  state.fundData = payload
}

export function setFundLoader(
  state: FundState,
  { payload }: { payload: { loader: boolean; typeLoader: string } }
) {
  state.loader = payload.loader
  state.typeLoader = payload.typeLoader
}

export function setDetails(state: FundState, { payload }: { payload: IFundDetails }) {
  state.fundDetails = payload
}

export function setFinancialMetricsDetails(
  state: FundState,
  { payload }: { payload: IFinancialMetricsDetails | null }
) {
  state.financialMetricsDetails = payload
}

export function setReviewList(
  state: FundState,
  {
    payload
  }: {
    payload: IFundReviewList[] | []
  }
) {
  state.reviewChange = payload
}

Effects.set('funds/setFundLoader', async () => {})

Effects.set('funds/setList', async () => {})

Effects.set('funds/setDetails', async () => {})

Effects.set('funds/setFinancialMetricsDetails', async () => {})

Effects.set('funds/setReviewList', async () => {})
