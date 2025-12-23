import { format } from 'd3'

export const tickFormat = {
  top: format(',.3~r'),
  bottom: format(',.3~r')
}

export const valueFormat = {
  irr: d => format(',.3~r')(d) + '%',
  tvpi: format(',.3~r'),
  dpi: format(',.3~r')
}
