import type { TCustomExcel } from "$lib/types/customExcel";
import type { TStock } from "$lib/types/stock";
import type { TVRichRowKey, TVRichRow } from "$lib/types/vrich";
import { derived, writable } from "svelte/store";



const currentSortBy: { col: TVRichRowKey, asc: boolean } = {
    col: "stock_id",
    asc: true
}

export const stocksStore = writable<TStock[]>([]);
export const customeExcelStore = writable<TCustomExcel[]>([]);
export const vrichStore = writable<TVRichRow[]>([
    {
		cost: 0,
		delivery_cost: 0,
		desc: "",
		note: "",
		position: "",
		price: 0,
		quantity: 0,
		sell_id: "",
		stock_id: 0,
		unit: 0
	}
])
export const minimumAvailable = writable(0)
export const onlyNoLiveId = writable(false)
export const loading = writable(false)
export const sortBy = writable<{col: TVRichRowKey}>({col: "stock_id"})

export const vrichFilterStore = derived([vrichStore, minimumAvailable], ([$vrich, $minimumAvailable]) => {
    const rows = $vrich.filter((v) => v.quantity >= $minimumAvailable)
    return rows
})

// export const vrichStore = derived([stocksStore, customeExcelStore, minimumAvailable, onlyNoLiveId], ([$stock, $customXl, $minimumAvailable, $onlyNoLiveId]) => {
//     const rows = $stock.flatMap((data) => {
//         if (data.available < $minimumAvailable) return []
//         const vrichRow: TVRichRow = {
//             stock_id: data.id,
//             sell_id: "0",
//             desc: data.code,
//             unit: 0,
//             price: data.price,
//             cost: 0,
//             delivery_cost: 0,
//             note: "",
//             position: "",
//             quantity: data.available
//         };
//         if ($customXl.length > 0) {
//             const find = $customXl.find((c) => {
//                 return data.id == c.id
//             })
//             console.log("find", find)
//             if (!$onlyNoLiveId) {
//                 if (!find) return []
//                 vrichRow.sell_id = find.live_id
//                 vrichRow.cost = find.cost
//             } else {
//                 if (find) return []
//             }
//         }
//         return [vrichRow]
//     })
//     return rows
// });

// export const vrichStoreSorted = derived([vrichStore, sortBy], ([$vrichStore, $sortBy]) => {
//     if (currentSortBy.col == $sortBy.col) {
//         currentSortBy.asc = !currentSortBy.asc
//     } else {
//         currentSortBy.col = $sortBy.col
//         currentSortBy.asc = true
//     }
//     const sortModifier = currentSortBy.asc ? 1 : -1
//     function sort(a: TVRichRow, b: TVRichRow): number {
//         if (a[currentSortBy.col] < b[currentSortBy.col]) {
//             return -1 * sortModifier
//         } else if (a[currentSortBy.col] > b[currentSortBy.col]) {
//             return 1 * sortModifier
//         } else {
//             return 0
//         }
//     }
//     const newArray = [...$vrichStore].sort(sort)
//     return newArray
// })

