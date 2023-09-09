export interface PaginationI {
  activePage: number
  nextPageAvaible: boolean
  prevPageAvaible: boolean
  pages: number
}

export interface PaginatioPageI {
  value: string
  isActive: boolean
  isDisabled: boolean
}
