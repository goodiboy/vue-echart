export type dataType = {
  name: string
  value: number
}

export interface TrendOptionData {
  title: string
  base: number
  unit: '百' | '千' | '万'
  data: [
    {
      name: string
      data: number[]
    }
  ]
}

export interface TrendData {
  map: TrendOptionData
  seller: TrendOptionData
  commodity: TrendOptionData
  common: {
    month: string[]
  }
  type: [
    {
      key: 'map' | 'seller' | 'commodity'
      text: string
    }
  ]
}
