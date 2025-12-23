// ** Service Import
import Effects from '@/boot/effects'
import axiosInstance from '@/service/axios'

// ** Interfaces Type Import
import { IBenchmark } from '@/interface/benchmark'
import { IFinancialMetricsDetails } from '@/interface/fund'

// Benchmark List
export const fetchBenchmarkListApi = async (query: string) => {
  return await axiosInstance
    .get(`/benchmark/?${query}`)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Fetch Benchmark Details
export const fetchBenchmarkDetailsApi = async (id: string) => {
  return await axiosInstance
    .get('/benchmark/' + id)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Single Recalculate Benchmark
export const singleRecalculateBenchmarkApi = async (id: number) => {
  return await axiosInstance
    .patch('/benchmark/' + id)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

// Single Recalculate Benchmark
export const allRecalculateBenchmarkApi = async (id: number[]) => {
  return await axiosInstance
    .post('/benchmark', { ids: id })
    .then(response => {
      return response?.data
    })
    .catch(err => {
      throw err
    })
}

export interface BenchmarkState {
  benchmarkData: {
    results: IBenchmark[]
    count: number
    next: string | null
    previous: string | null
  }
  loader: boolean
  typeLoader: string
  benchmarkDetails: IBenchmark | null
  financialMetricsDetails: IFinancialMetricsDetails | null
}

export default {
  benchmarkData: {
    results: [],
    count: 0,
    next: null,
    previous: null
  },
  loader: false,
  benchmarkDetails: null,
  typeLoader: ''
}

export function setList(
  state: BenchmarkState,
  {
    payload
  }: {
    payload: {
      results: IBenchmark[]
      count: number
      next: string | null
      previous: string | null
    }
  }
) {
  state.benchmarkData = payload
}

export function setBenchmarkLoader(
  state: BenchmarkState,
  { payload }: { payload: { loader: boolean; typeLoader: string } }
) {
  state.loader = payload.loader
  state.typeLoader = payload.typeLoader
}

export function setDetails(state: BenchmarkState, { payload }: { payload: IBenchmark }) {
  state.benchmarkDetails = payload
}

export function setFinancialMetricsDetails(
  state: BenchmarkState,
  { payload }: { payload: IFinancialMetricsDetails | null }
) {
  state.financialMetricsDetails = payload
}

Effects.set('benchmark/setBenchmarkLoader', async () => {})

Effects.set('benchmark/setList', async () => {})

Effects.set('benchmark/setDetails', async () => {})

Effects.set('benchmark/setFinancialMetricsDetails', async () => {})
