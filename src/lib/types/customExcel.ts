import type { Schema } from "read-excel-file"

export type TCustomExcel = {
    group: string
    live_id: string
    product_code: string
    product_name: string
    size: string
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
    }
    
}