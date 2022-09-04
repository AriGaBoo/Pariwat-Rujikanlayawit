import type { TCustomExcel } from "$lib/types/customExcel";
import type { TStock } from "$lib/types/stock";
import type { TVRichRow } from "$lib/types/vrich";
import { derived, writable } from "svelte/store";

export const stocksStore = writable<TStock[]>([]);
export const customeExcelStore = writable<TCustomExcel[]>([]);
export const minimumAvailable = writable(0)
export const onlyNoLiveId = writable(false)
export const loading = writable(false)
export const vrichStore = derived([stocksStore, customeExcelStore, minimumAvailable, onlyNoLiveId], ([$stock, $customXl, $minimumAvailable, $onlyNoLiveId]) => {
    const rows = $stock.flatMap((data) => {
        if (data.available < $minimumAvailable) return []
        const vrichRow: TVRichRow = {
            stock_id: data.id,
            sell_id: "0",
            desc: data.code,
            unit: 0,
            price: data.price,
            cost: 0,
            delivery_cost: 0,
            note: "",
            position: "",
            quantity: data.available
        };
        if ($customXl.length > 0) {
            const find = $customXl.find((c) => {
                return data.id == c.id
            })
            if (!$onlyNoLiveId) {
                if (!find) return []
                vrichRow.sell_id = find.live_id
                vrichRow.cost = find.cost
            } else {
                if (find) return []
            }
        }
        return [vrichRow]
    })
    return rows
});

