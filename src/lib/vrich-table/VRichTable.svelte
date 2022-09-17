<script lang="ts">
	import { vrichFilterStore } from "$lib/stores/stocks.store";
	import { vrichHeader, type TVRichRow, type TVRichRowKey } from "$lib/types/vrich";
	import VRichRow from "./VRichRow.svelte";
	import { DataTable } from "@brainandbones/skeleton";

	const columns = vrichHeader.map((d) => d.headerText);

	let vrichTable: TVRichRow[] = [
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
	];
	let search: any = "";
	let sort: TVRichRowKey = "stock_id";

	$: {
		vrichTable = $vrichFilterStore;
	}
	// const headings: string[] = ["Positions", "Name", "Weight", "Symbol"];
	let source: any[] = [
		// {
		// 	position: 1,
		// 	name: '<strong class="text-red">Hydrogen</strong>',
		// 	weight: 1.0079,
		// 	symbol: "H"
		// },
		// { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
		// { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" }
	];

	// const currentSortBy: { col: TVRichRowKey; asc: boolean } = {
	// 	col: "stock_id",
	// 	asc: true
	// };
	// function sort (column: TVRichRowKey) {
	// 	if (currentSortBy.col === column) {
	// 		currentSortBy.asc = !currentSortBy.asc
	// 	}else{
	// 		currentSortBy.col = column
	// 		currentSortBy.asc = true
	// 	}

	// 	let sortModifier = (currentSortBy.asc) ? 1 : -1
	// 	const newArray = $vrichFilterStore.sort((a, b) => {
	// 		if (a[column] < b[column]) {
	// 			return -1 * sortModifier
	// 		}else if (a[column] > b[column]) {
	// 			return 1 * sortModifier
	// 		}else{
	// 			return 0
	// 		}
	// 	})

	// 	vrichTable = newArray
	// }
</script>

<div class="overflow-y-auto">
	<div class="shadow-sm my-8 w-full">
		<div class="w-full">Total: {vrichTable.length} items</div>	
		<DataTable headings={columns} bind:source={vrichTable} {search} {sort} interactive>
			<!-- <svelte:fragment slot="header"><input type="search" placeholder="Search..." bind:value={search} /></svelte:fragment> -->
			<!-- <svelte:fragment slot="footer">{vrichTable.length} Items</svelte:fragment> -->
		</DataTable>
		<!-- <table class="w-full">
			<thead>
				<tr class="bg-slate-200 flex-row align-middle">
					<th class="text-left border font-normal p-2 text-slate-600">ลำดับ</th>
					{#each columns as column (column)}
						<th
							class="text-left border cursor-pointer font-normal p-2 text-slate-600"
							on:click={() => sort(column.columnName)}
						>
							<span>{column.headerText}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each vrichTable as data, i (data.stock_id)}
					<VRichRow row={data} index={i + 1} />
				{/each}
			</tbody>
		</table> -->
	</div>
</div>
