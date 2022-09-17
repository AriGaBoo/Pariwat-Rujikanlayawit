import type { Schema } from "read-excel-file"

export type TCustomExcel = {
    group: string
    live_id: string
    product_name_minor: string
    product_name: string
    size: string
    id: number
    cost: number
}

export type TCustomExcelImported = {
        "__EMPTY"?: string,
        "หมวดหมู่ ": string,
        "รหัสLive ": string,
        "id": number,
        "ชื่อสินค้า(หลัก)": string,
        "ชื่อสินค้า(ย่อย)": string,
        "ขนาด": string,
        "ต้นทุน": number 
}

export const CustomExcelSchema: Schema = {
    "หมวดหมู่": {
        prop: "group",
        type: String
    },
    "รหัสLive": {
        prop: "live_id",
        type: String
    },
    id: {
        prop: "id",
        type: Number,
    },
    "ชื่อสินค้า(หลัก)": {
        prop: "product_code",
        type: String
    },
    "ชื่อสินค้า(ย่อย)": {
        prop: "product_name",
        type: String
    },
    "ขนาด": {
        prop: "size",
        type: String
    },
    "ต้นทุน": {
        prop: "cost",
        type: Number
    }
    
}