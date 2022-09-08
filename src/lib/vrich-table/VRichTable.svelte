<script lang="ts">
	import { sortBy,  vrichStoreSorted } from "$lib/stores/stocks.store";
	import { vrichHeader, type TVRichRowKey } from "$lib/types/vrich";
	import VRichRow from "./VRichRow.svelte";
	const columns = vrichHeader;
	function sort(column: TVRichRowKey) {
		console.log("sort click", column)
		sortBy.set({col: column})
	}
</script>

<div class="overflow-y-auto">
	<div class="shadow-sm my-8 w-[2000px]">
		<table class="w-full">
			<thead>
				<tr class="bg-slate-200 flex-row align-middle">
					<th class="text-left border font-normal p-2 text-slate-600">ลำดับ</th>
					{#each columns as column (column)}
						<th class="text-left border cursor-pointer font-normal p-2 text-slate-600" on:click="{() => sort(column.columnName)}">
							<span>{column.headerText}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $vrichStoreSorted as data, i (data.stock_id)}
					<VRichRow row={data} index={i + 1} />
				{/each}
			</tbody>
		</table>
	</div>
</div>
