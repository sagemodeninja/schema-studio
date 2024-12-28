import { Column } from '.'

export interface Table {
    name: string
    columns: Column[]
    remarks?: string
}