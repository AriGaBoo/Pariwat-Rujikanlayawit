<script lang="ts">


	import type { TVRichRow } from "$lib/types/vrich";
	import VRichCol from "./VRichCol.svelte";

	export let index: number = 0;
	export let row: TVRichRow;
	let selected = true;


</script>

<tr
	class={!selected
		? "flex-row align-middle bg-blue-200"
		: "flex-row align-middle hover:bg-blue-200"}
	on:click={() => (selected = !selected)}
>
	<VRichCol text={index} />
	<VRichCol text={row.stock_id} />
	<VRichCol text={row.sell_id} />
	<VRichCol text={row.desc} />
	<VRichCol text={row.unit} />
	<VRichCol text={row.quantity} />
	<VRichCol text={row.price} />
	<VRichCol text={row.cost} />
	<VRichCol text={row.delivery_cost} />
	<VRichCol text={row.note} />
	<VRichCol text={row.position} />
</tr>
