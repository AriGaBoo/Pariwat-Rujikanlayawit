export type TVRichRow = {
    stock_id: number
    sell_id: string
    desc: string
    unit: number
    quantity: number
    price: number
    cost: number
    delivery_cost: number
    note: string
    position: string
}

export const vrichHeader = [
    "รหัสสต็อก",
    "รหัสขาย",
    "รายละเอียด",
    "หน่วย",
    "จำนวน",
    "ราคา",
    "ต้นทุน",
    "ค่าส่งเพิ่ม",
    "หมายเหตุ",
    "ตำแหน่ง"
];