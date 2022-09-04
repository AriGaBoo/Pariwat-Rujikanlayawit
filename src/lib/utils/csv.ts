type TEncode = "text/csv;charset=utf-8," | "text/csv;charset=windows-1252;"
interface ICSVOption {
    encode: TEncode
}

export function createCsvContent(dataArr: (string | number)[][]) {
    let csvContent = "" 
    dataArr.forEach(data => {
        const row = data.join(",")
        csvContent += row + "\r\n"
    })
    return csvContent
}
export function downloadCsv(dataArr: (string | number)[][], options: ICSVOption = {encode: "text/csv;charset=utf-8,"}) {
        const csvContent = createCsvContent(dataArr)
        const universalBOM = "\uFEFF";
        console.log("csv", csvContent)
        // const encodeUri = encodeURI(csvHeader+universalBOM+csvContent)
        const blob = new Blob([universalBOM + csvContent], {type: options.encode})
        const url = URL.createObjectURL(blob)
        download(url, "vrich.csv")
}
function download(url:string, filename: string) {
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}