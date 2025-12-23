import _ from 'lodash'
import { createSlice } from '@reduxjs/toolkit'

interface Feature {
  name: string
  model?: any
  select?: any
  actions?: any
  reducer?: any
  utils?: any
}

class Registry {
  index: { [key: string]: Feature }
  reducers: any

  constructor () {
    this.index = {}
    this.reducers = {}
  }

  get (name: string) {
    return this.index[name.toLowerCase()]
  }

  set (...args: any) {
    const name = _.isString(args[0]) ? args[0] : args[0].model.NAME
    const p = _.isString(args[0]) ? args[1] : args[0]
    const lName = name.toLowerCase()
    const feature: Feature = { name }

    if (p.initialState && p.reducers) {
      const _reducers = p.reducers
      const slice = createSlice({
        name: lName,
        initialState: p.initialState,
        reducers: _reducers,
      })
      _.assign(feature, slice)
      _.each(feature.actions, (actionCreator, key) => {
        feature.actions[key] = (payload: any, meta: any) => {
          const action = actionCreator(payload)
          if (!_.isUndefined(meta)) action.meta = meta
          return action
        }
      })
      this.reducers[lName] = feature.reducer
    }
    this.index[lName] = feature

    feature.name = name
    feature.model = p.model
    feature.select = p.selectors
    feature.utils = p.utils

    return feature
  }
}

const registry = new Registry()
export default registry