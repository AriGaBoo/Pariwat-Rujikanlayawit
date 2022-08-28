import type { Schema } from "read-excel-file/types"

	export type TStock = {
		available: number
		barcode:number
		code: string
		id: number
		inventory: number
		name: string
		price: number
		product_code: string
		product_id: number
		product_name: string
		reserved: number
	}		
	export const stockSchema: Schema = {
		id: {
			prop: "id",
			type: Number
		},
		product_id: {
			prop: "product_id",
			type: Number,
		},
		product_name: {
			prop: "product_name",
			type: String
		},
		product_code: {
			prop: "product_code",
			type: String
		},
		price: {
			prop: "price",
			type: Number
		},
		code: {
			prop: "code",
			type: String
		},
		name: {
			prop: "name",
			type: String
		},
		barcode: {
			prop: "barcode",
			type: Number
		},
		inventory: {
			prop: "inventory",
			type: Number,
		},
		reserved: {
			prop: "reserved",
			type: Number
		},
		available: {
			prop: "available",
			type: Number
		}
	}