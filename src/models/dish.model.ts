export interface ICategory {
  id: number
  title: string
}
export interface IDish {
  id: number
  title: string
  weight_gramm: number
  price_rub: number
  description?: string
  categories: ICategory[] | []
  imageSrc?: string
}

export interface IFormAddDish {
  id?: number
  title: string
  description?: string
  priceRub: number
  weightGramm: number
  categories: ICategory[] | []
  image?: string
}
