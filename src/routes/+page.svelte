<script lang="ts">
	import VRichTable from "$lib/vrich-table/VRichTable.svelte";
	import readXlsmFile from "read-excel-file";
	import {
		minimumAvailable,
		stocksStore,
		customeExcelStore,
		onlyNoLiveId,
		loading,
		vrichStore
	} from "$lib/stores/stocks.store";
	import { stockSchema, type TStock } from "$lib/types/stock";
	import { vrichHeader } from "$lib/types/vrich";
	import { downloadExcel, mappingCustomExcel, mergeExcel, newSheet, newWorkbook } from "$lib/utils/excel";
	import { read, utils } from "xlsx";
	import Numbers from "$lib/button/Numbers.svelte";
	import type { TCustomExcel, TCustomExcelImported } from "$lib/types/customExcel";

	// let stockStores: TStock[] = []
	let isLoading = false;

	$: {
		(async () => {
			if ($customeExcelStore.length > 0 && $stocksStore.length > 0) {
				isLoading = true
				const data = await mergeExcel($stocksStore, $customeExcelStore);
				vrichStore.set(data);
				isLoading = false
			}
		})();
	}

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
			// stockStores = data.rows
		})();
	}
	let customeExcelFiles: FileList;
	$: {
		(async () => {
			if (!customeExcelFiles) return;
			if (customeExcelFiles.length <= 0) return;
			console.log("custom excel files", customeExcelFiles);
			const file = customeExcelFiles[0];
			const data = await file.arrayBuffer();
			const workbook = read(data);
			const excelData: TCustomExcel[] = [];
			for (const [name, sheet] of Object.entries(workbook.Sheets)) {
				console.log(name, sheet)
				const json = utils.sheet_to_json<TCustomExcelImported>(sheet, {
					// header: [
					// 	"empty",
					// 	"group",
					// 	"live_id",
					// 	"id",
					// 	"product_code",
					// 	"product_name",
					// 	"size",
					// 	"cost"
					// ],
					defval: "",

				});
				// json.splice(0, 1);
				console.log("length", json.length)
				const data = mappingCustomExcel(json)
				excelData.push(...data);
			}
			console.log("custom excel data", excelData);
			customeExcelStore.set(excelData)


			// const data = await readXlsmFile<TCustomExcel>(customeExcelFiles[0], {
			// 	schema: CustomExcelSchema,
			// 	// sheet: 3
			// });
			// console.log("data", data);
			// customeExcelStore.set(data.rows);
		})();
	}
	let minAvailable = 0;
	$: {
		minimumAvailable.set(minAvailable);
	}

	function getAoA(options: { includeHeader: boolean } = { includeHeader: false }) {
		const dataArr = $vrichStore.map((data) => {
			const temp = [
				data.stock_id,
				data.sell_id,
				data.desc,
				data.unit,
				data.quantity,
				data.price,
				data.cost,
				data.delivery_cost,
				data.note,
				data.position
			];
			return temp;
		});
		if (!options.includeHeader) {
			return dataArr;
		} else {
			const header = vrichHeader.map((h) => h.headerText);
			header.splice(0, 1);
			return [header, ...dataArr];
		}
	}
	function downloadExcelFile() {
		const aoa = getAoA({ includeHeader: true });
		const sheet = newSheet(aoa);
		const book = newWorkbook(sheet);
		downloadExcel(book);
	}

	function onChangeOnlyNoLiveId(event: Event) {
		const target = <HTMLInputElement>event.target;
		onlyNoLiveId.set(target.checked);
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
		<button
			class="p-4 bg-green-400 rounded-lg hover:bg-green-600 transition ease-in-out duration-300"
			on:click={downloadExcelFile}>Download VRich Excel</button
		>
	</div>
</section>
<hr class="my-8" />
<section class="flex flex-row justify-between">
	<div>
		<div class=" text-red-600 text-[1.5rem]">Minimum Available</div>
		<Numbers bind:num={minAvailable} />
	</div>
	<!-- <div class="flex flex-row items-center p-4">
		<input
			id="no_live_id"
			type="checkbox"
			class="w-5 h-5 ring-2 ring-red-500 text-red-500"
			on:input={onChangeOnlyNoLiveId}
		/>
		<label for="no_live_id" class="pl-4">only product doesn't has live id</label>
	</div> -->
</section>
<hr class="my-8" />
<section class="mt-8">
	<VRichTable />
</section>
