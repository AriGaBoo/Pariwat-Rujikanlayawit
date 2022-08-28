<script lang="ts">
	import VRichTable from "$lib/vrich-table/VRichTable.svelte";
	import readXlsmFile from "read-excel-file";
	import { stocksStore, customeExcelStore, vrichStore } from "$lib/stores/stocks.store";
	import { stockSchema, type TStock } from "$lib/types/stock";
	import { CustomExcelSchema, type TCustomExcel } from "$lib/types/customExcel";
import { vrichHeader } from "$lib/types/vrich";
import { downloadCsv } from "$lib/utils/csv";

	let files: FileList;
	$: {
		(async () => {
			if (!files) return;
			if (files.length <= 0) return;
			console.log("files", files);
			const data = await readXlsmFile<TStock>(files[0], {
				schema: stockSchema
			});
			stocksStore.set(data.rows);
		})();
	}
	let customeExcelFiles: FileList;
	$: {
		(async () => {
			if (!customeExcelFiles) return;
			if (customeExcelFiles.length <= 0) return;
			console.log("custom excel files", customeExcelFiles);
			const data = await readXlsmFile<TCustomExcel>(customeExcelFiles[0], {
				schema: CustomExcelSchema,
				sheet: 3
			});
			console.log("data", data);
			customeExcelStore.set(data.rows);
		})();
	}

	function downloadVRich() {
		const dataArr = $vrichStore.map((data) => {
			const temp = [data.stock_id, data.sell_id, data.desc, data.unit,data.quantity, data.price, data.cost, data.delivery_cost, data.note, data.position]
			return temp
		})
		const header = [...vrichHeader]
		header.splice(0,1)
		const csvContent = [header, ...dataArr]
		console.log("data arr", csvContent)
		downloadCsv(csvContent)
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Excel Manipulations" />
</svelte:head>

<section class="flex justify-between">
	<div class="flex flex-row align-middle gap-4">
		<label
			for="1-excel"
			class="p-4 bg-pink-200 rounded-lg hover:bg-pink-400 transition ease-in-out duration-300"
		>
			<input type="file" name="excel" id="1-excel" bind:files class="hidden" />
			Upload Stock excel
		</label>
		<label
			for="2-excel"
			class="p-4 bg-blue-200 rounded-lg hover:bg-blue-400 transition ease-in-out duration-300"
		>
			<input type="file" name="excel" id="2-excel" bind:files={customeExcelFiles} class="hidden" />
			Upload Custom excel
		</label>
	</div>
	<div>
		<button class="p-4 bg-green-400 rounded-lg hover:bg-green-600 transition ease-in-out duration-300" on:click="{downloadVRich}">Download VRich Excel</button>
	</div>
</section>
<section class="mt-8">
	<VRichTable />
</section>
