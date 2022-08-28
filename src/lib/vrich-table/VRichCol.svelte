
<script lang="ts">
    export let text:string | number
</script>

{#if typeof text == "number" }
<td class="text-right border font-normal p-2 text-slate-600">
    {text}
</td>
{:else} 
<td class="text-left border font-normal p-2 text-slate-600">
    {text}
</td>
{/if}
