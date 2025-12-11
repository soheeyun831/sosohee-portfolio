export interface IPortfolio {
    id: number
    title: string
    startDate: string
    endDate: string
    category: string[]
    skills: string
    company: string
    memo?: string
    thumbnail: string
    images: string[]
    companyNo?: number
}