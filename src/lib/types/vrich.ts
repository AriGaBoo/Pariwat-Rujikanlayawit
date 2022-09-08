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
export type TVRichRowKey = keyof TVRichRow
export const vrichHeader: { headerText: string, columnName: TVRichRowKey }[] = [
    {
        headerText: "รหัสสต็อก",
        columnName: "stock_id"
    },
    {
        headerText: "รหัสขาย",
        columnName: "sell_id"
    },
    {
        headerText: "รายละเอียด",
        columnName: "desc"
    },
    {
        headerText: "หน่วย",
        columnName: "unit"
    },
    {
        headerText: "จำนวน",
        columnName: "quantity"
    },
    {
        headerText: "ราคา",
        columnName: "price"
    },
    {
        headerText: "ต้นทุน",
        columnName: "cost"
    },
    {
        headerText: "ค่าส่งเพิ่ม",
        columnName: "delivery_cost"
    },
    {
        headerText: "หมายเหตุ",
        columnName: "note"
    },
    {
        headerText: "ตำแหน่ง",
        columnName: "position"
    }
];