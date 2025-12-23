export interface IBenchmark {
  id: number
  owner: number
  firm: number
  asset_classes: Record<string, unknown>
  fund_selected: string
  fund: number
  vintage_year: number
  strategies: number
  locations: Record<string, unknown>
  custom_size_min: number
  custom_size_max: number
  benchmark_id: string
  benchmark_type: string
  benchmark_name: string
  benchmark_privacy: boolean
  benchmark_frequency: number
  tags: string[] | []
  benchmark_fund_count: number
  date_created: string
  strategy?: string[] | []
}

export interface IBenchmarkDetails {
  id: number
  name: string
  type: string
  tags: string[]
  fundSelected: string
  fundCount: number
  dateCreated: string
}
