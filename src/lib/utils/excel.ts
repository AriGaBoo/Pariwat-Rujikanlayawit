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



