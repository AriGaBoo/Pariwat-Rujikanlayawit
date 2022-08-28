<script lang="ts">
	import { stocksStore, vrichStore } from "$lib/stores/stocks.store";
	import { vrichHeader, type TVRichRow } from "$lib/types/vrich";
	import VRichRow from "./VRichRow.svelte";
	const columns = vrichHeader;
</script>

<div class="overflow-y-auto">
	<div class="shadow-sm my-8 w-[2000px]">
		<table class="w-full">
			<thead>
				<tr class="bg-slate-200 flex-row align-middle">
					<th class="text-left border font-normal p-2 text-slate-600">ลำดับ</th>
					{#each columns as column (column)}
						<th class="text-left border font-normal p-2 text-slate-600">
							<span>{column}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $vrichStore as data, i (data.stock_id)}
					<VRichRow row={data} index={i + 1}/>
				{/each}
			</tbody>
		</table>
	</div>
</div>
