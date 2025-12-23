export interface IAddFund {
  fund_id: string
  name: string
  vintage_year: string
  asset_class: string
  strategy: string
  target_size: string
  primary_geographic_focus: string
  fund_size_usd: string
  status: string
  country: string
  fund_structure: string
  fund_legal_structure: string
  fund_number_overall: string
  fund_number_series: string
  single_deal_fund: string
  lifespan_years: string
  lifespan_extension: string
  fund_currency: string
  core_industries: string
  industries: string
  offer_co_investment_opportunities: string
  subscription_credit_facility: string
}

export interface IFundDetails {
  id: number
  fund_id: number
  firm_id: number
  name: string
  vintage_year: number
  asset_class: string
  strategy: string[] | []
  target_size: number
  primary_geographic_focus: string
  fund_size_usd: number
  show_on_profile: boolean
  pin_to_dashboard: boolean
  status: string
  country: string
  fund_structure: string
  fund_legal_structure: string
  fund_number_overall: number
  fund_number_series: number
  single_deal_fund: boolean
  lifespan_years: number
  lifespan_extension: number
  fund_currency: string
  core_industries: string
  industries: string
  offer_co_investment_opportunities: boolean | null
  subscription_credit_facility: boolean | null
}

export interface IFundManagerInformation {
  firm_name: string
  company_email: string
  country: string
  state: string
  zip_code: string
  address: string
  website: string
  city: string
}

export interface ISetLoaderFund {
  loader: boolean
  typeLoader: string
}

export interface IPinAndDashValue {
  key: string
  value: string | boolean
  fund_id: string
}

export interface IFundPerformanceInformation {
  as_at_date: string
  dpi: string
  rvpi: string
  net_irr: string
  net_multiple: string
  called: string
  source: string
  fund?: string
  id?: string
}

export interface CardData {
  label: string
  value: string
  description: string
}

export interface ICashFlowInitialValue {
  transaction_date: string
  transaction_type: string
  transaction_amount: string
}

export interface FundApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: IFundPerformanceInformation[]
}

interface CashflowValuation {
  years: string[]
  year_data: number[]
}

export interface IFinancialMetricsDetails {
  fund_id: string
  min_date: string
  max_date: string
  total_contributions: number
  total_distributions: number
  last_value_amount: number
  dpi: number
  tvpi: number
  rvpi: number
  irr: string
  net_cashflow: number
  cashflow_valuation: CashflowValuation
}

export interface ICashFlowTimeLine {
  transaction_date: string
  transaction_type: string
  amount: string
  fund?: string
  as_at_date?: string
}

export interface IFundCashFlowTimeLineApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: ICashFlowTimeLine[]
}

export interface IFundPeFieldChange {
  field_name: string
  old_value?: string | null
  new_value?: string | null
  reason_for_change?: string | null
  fund: number
  document: File | string | null
}

export interface IFundReviewList {
  field_name: string
  old_value?: string | null
  new_value?: string | null
  reason_for_change?: string | null
  fund?: string | null
  document?: string | File
}
