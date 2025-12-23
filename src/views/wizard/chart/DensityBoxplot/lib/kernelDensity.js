import * as d3 from 'd3'

/**
 * Kernel density estimator
 * @param {Function} kernel - Kernel function
 * @param {number[]} X - Array of x values to calculate density at
 * @returns {Function} Function that calculates density for an array of values
 */
export function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map((x) => ({
      x,
      y: d3.mean(V, (v) => kernel(x - v)) || 0
    }))
  }
}

/**
 * Epanechnikov kernel function
 * @param {number} bandwidth - Bandwidth parameter for the kernel
 * @returns {Function} Kernel function
 */
export function kernelEpanechnikov(bandwidth) {
  return function (v) {
    const x = v / bandwidth
    return Math.abs(x) <= 1 ? (0.75 * (1 - x * x)) / bandwidth : 0
  }
}

/**
 * Calculate the percentage of data within a certain range
 * @param {number[]} data - Array of values
 * @param {number} start - Start of range
 * @param {number} end - End of range
 * @returns {number} Percentage of data within the range
 */
export function calculatePercentageInRange(data, start, end) {
  const count = data.filter((d) => d >= start && d <= end).length
  return (count / data.length) * 100
}

/**
 * Calculate statistics for boxplot
 * @param {number[]} data - Array of values
 * @returns {Object} Object with min, q1, median, q3, max, iqr, and n (sample size)
 */
export function calculateStats(data) {
  const sortedData = [...data].sort(d3.ascending)
  const q1 = d3.quantile(sortedData, 0.25) || 0
  const median = d3.quantile(sortedData, 0.5) || 0
  const q3 = d3.quantile(sortedData, 0.75) || 0
  const iqr = q3 - q1
  const min = Math.max(d3.min(sortedData) || 0, q1 - 1.5 * iqr)
  const max = Math.min(d3.max(sortedData) || 0, q3 + 1.5 * iqr)

  return {
    min,
    q1,
    median,
    q3,
    max,
    iqr,
    n: data.length
  }
}
