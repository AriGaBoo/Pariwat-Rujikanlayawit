import type { TCustomExcel } from "$lib/types/customExcel";
import type { TStock } from "$lib/types/stock";
import type { TVRichRow } from "$lib/types/vrich";
import { derived, writable } from "svelte/store";

export const stocksStore = writable<TStock[]>([]);
export const customeExcelStore = writable<TCustomExcel[]>([]);
export const vrichStore = derived([stocksStore, customeExcelStore], ([$stock, $customXl]) => {
	return $stock.flatMap((data) => {
        if (data.available <= 0) return []
        const vrichRow: TVRichRow = {
            stock_id: data.id,
            sell_id: "0",
            desc: data.product_code,
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
                return data.product_code == c.product_code && data.name == c.product_name
            })
            if (!find) return [] 
            vrichRow.sell_id = find.live_id
        }
        return [vrichRow]
	})
});
