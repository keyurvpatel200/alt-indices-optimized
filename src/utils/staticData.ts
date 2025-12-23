export const vintageYearOptions: { value: string; label: string }[] = [
  {
    value: '2001',
    label: '2001'
  },
  {
    value: '2002',
    label: '2002'
  },
  {
    value: '2003',
    label: '2003'
  }
]

export const assetClassOptions: { value: string; label: string }[] = [
  { value: 'realEstate', label: 'Real Estate' },
  { value: 'privateEquity', label: 'Private Equity' },
  { value: 'infrastructure', label: 'Infrastructure' }
]

export const strategyOptions: { value: string; label: string }[] = [
  { value: '1', label: 'High' },
  { value: '2', label: 'Venture (General)' },
  { value: '3', label: 'Early Stage' },
  { value: '4', label: 'Growth' }
]

export const primaryGeographicFocusOptions: { value: string; label: string }[] = [
  { value: '1', label: 'Kerala' },
  { value: '2', label: 'Americas' },
  { value: '3', label: 'Europe' },
  { value: '4', label: 'North America' },
  { value: '5', label: 'Asia' }
]

export const countriesOptions: { value: string; label: string }[] = [
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'germany', label: 'Germany' }
]

export const fundStructureOptions: { value: string; label: string }[] = [
  {
    value: '2001',
    label: '2001'
  },
  {
    value: '2002',
    label: '2002'
  },
  {
    value: '2003',
    label: '2003'
  }
]

export const fundLegalStructureOptions: { value: string; label: string }[] = [
  {
    value: '2001',
    label: '2001'
  },
  {
    value: '2002',
    label: '2002'
  },
  {
    value: '2003',
    label: '2003'
  }
]

export const singleDealFundOptions: { value: string; label: string }[] = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
]

export const fundCurrencyOptions: { value: string; label: string }[] = [
  {
    value: '2001',
    label: '2001'
  },
  {
    value: '2002',
    label: '2002'
  },
  {
    value: '2003',
    label: '2003'
  }
]

export const countryOptions: { value: string; label: string }[] = [
  {
    value: 'India',
    label: 'India'
  },
  {
    value: 'U.S',
    label: 'U.S'
  },
  {
    value: 'USA',
    label: 'USA'
  }
]

export const stateOptions: { value: string; label: string }[] = [
  {
    value: 'Gujarat',
    label: 'Gujarat'
  },
  {
    value: 'Canada',
    label: 'Canada'
  },
  {
    value: 'France',
    label: 'France'
  }
]

export const cityOptions: { value: string; label: string }[] = [
  {
    value: 'Ahmedabad',
    label: 'Ahmedabad'
  },
  {
    value: 'Surat',
    label: 'Surat'
  },
  {
    value: 'Rajkot',
    label: 'Rajkot'
  }
]

export const zipCodeOptions: { value: string; label: string }[] = [
  {
    value: '000111',
    label: '000111'
  },
  {
    value: '212121',
    label: '212121'
  },
  {
    value: '999999',
    label: '999999'
  }
]

export const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'liquidated', label: 'Liquidated' }
]

export const coInvestmentOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
]

export const transactionTypeOptions = [
  { value: 'capital_call', label: 'Capital Call' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'value', label: 'Value' }
]

export const getFundReviewTypeAndOptions = [
  {
    key: 'fund_id',
    title: 'Fund Id',
    type: 'number'
  },
  {
    key: 'name',
    title: 'Name',
    type: 'text'
  },
  {
    key: 'vintage_year',
    title: 'Vintage Year',
    type: 'number'
  },
  {
    key: 'asset_class',
    title: 'Asset Class',
    type: 'select',
    option : assetClassOptions
  },
  {
    key: 'strategy',
    title: 'Strategy',
    type: 'select',
    option : strategyOptions
  },
  {
    key: 'primary_geographic_focus',
    title: 'Primary Geographic Focus',
    type: 'select',
    option : primaryGeographicFocusOptions
  },
  {
    key: 'country',
    title: 'Countries',
    type: 'select',
    option : countriesOptions
  },
  {
    key: 'status',
    title: 'Status',
    type: 'select',
    option : statusOptions
  },
  {
    key: 'fund_size_usd',
    title: 'Fund Size (USD)',
    type: 'pointNumber'
  },
  {
    key: 'fund_structure',
    title: 'Fund Structure',
    type: 'text'
  },
  {
    key: 'fund_legal_structure',
    title: 'Fund Legal Structure',
    type: 'text'
  },
  {
    key: 'fund_number_overall',
    title: 'Fund Number (Overall)',
    type: 'pointNumber'
  },
  {
    key: 'fund_number_series',
    title: 'Fund Number (Series)',
    type: 'pointNumber'
  },
  {
    key: 'single_deal_fund',
    title: 'Single Deal Fund',
    type: 'select',
    option : singleDealFundOptions
  },
  {
    key: 'lifespan_years',
    title: 'Lifespan (Years)',
    type: 'pointNumber'
  },
  {
    key: 'lifespan_extension',
    title: 'Lifespan Extension',
    type: 'pointNumber'
  },
  {
    key: 'fund_currency',
    title: 'Fund Currency',
    type: 'text'
  },
  {
    key: 'target_size',
    title: 'Target Size (USD MN)',
    type: 'pointNumber'
  },
  {
    key: 'core_industries',
    title: 'Core Industries',
    type: 'text'
  },
  {
    key: 'industries',
    title: 'Industries',
    type: 'text'
  },
  {
    key: 'offer_co_investment_opportunities',
    title: 'Offer Co-Investment Opportunities to LPs?',
    type: 'select',
    option : coInvestmentOptions
  },
  {
    key: 'subscription_credit_facility',
    title: 'Subscription Credit Facility',
    type: 'text'
  },
]

export const createReportTabData = ['Benchmarks', 'Fund', 'Firm']
