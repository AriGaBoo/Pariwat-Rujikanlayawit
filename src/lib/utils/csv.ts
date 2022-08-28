
export function downloadCsv(dataArr: (string | number)[][]) {
    let csvContent = "data:text/csv;charset=utf-8,"
    dataArr.forEach(data => {
        const row = data.join(",")
        csvContent += row + "\r\n"
    })
    console.log("csv", csvContent)
    const encodeUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodeUri)
    link.setAttribute("download", "vrich.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}