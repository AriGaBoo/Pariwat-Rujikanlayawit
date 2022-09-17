import type { TCustomExcel, TCustomExcelImported } from "$lib/types/customExcel"
import type { TStock } from "$lib/types/stock"
import type { TVRichRow } from "$lib/types/vrich"
import {utils, writeFile, type WorkBook, type WorkSheet} from "xlsx"

export function newWorkbook(sheet: WorkSheet, name = "sheet1") {
    const book = utils.book_new() 
    utils.book_append_sheet(book, sheet, name)
    return book
}

export function newSheet(aoa: (string | number)[][] = []) {
    return utils.aoa_to_sheet(aoa)
}

export function downloadExcel(book: WorkBook, name = "vrich") {
    const extension = ".xlsx"
    const nameAndExt = `${name}${extension}`
    writeFile(book, nameAndExt )
}

export function mappingCustomExcel(imported: TCustomExcelImported[]): TCustomExcel[] {
    const data = imported.map( i => {
        const d: TCustomExcel = {
            cost: i["ต้นทุน"],
            group: i["หมวดหมู่ "],
            id: i["id"],
            live_id: i["รหัสLive "],
            product_name_minor: i["ชื่อสินค้า(ย่อย)"],
            product_name: i["ชื่อสินค้า(หลัก)"],
            size: i["ขนาด"]
        }
        return d
    })
    return data
}

export async function mergeExcel(stocks: TStock[], customExcel: TCustomExcel[]): Promise<TVRichRow[]> {
    const promise = new Promise<TVRichRow[]>((res, rej) => {
       const data = stocks.map((stock) => {
        // console.log("stock", stock)
        const row: TVRichRow = {
            stock_id: stock.id,
            sell_id: "",
            desc: stock.code,
            unit: 0,
            quantity: stock.available,
            price: stock.price,
            cost: 0,
            delivery_cost: 0,
            note: "",
            position: "",
        }

        const find = customExcel.find((c) => c.id === stock.id)
        if (find) {
            row.sell_id = find.live_id
            row.cost = find.cost
        }
        return row
       }) 
       res(data)
    })
    return promise
}

