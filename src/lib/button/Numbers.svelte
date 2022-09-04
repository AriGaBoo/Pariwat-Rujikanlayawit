<script lang="ts">
    export let num:number
    export let min:number = 0
    $: if (num < 0) {
        num = 0
    }
</script>

<div class="flex flex-row align-middle gap-4">
    <button class="rounded-lg px-4 bg-red-300" on:click="{() => num -= 1}" >-</button>
    <input bind:value={num} min="{min}" type="number" class="rounded-lg border-0 ring-1 ring-red-300 focus:ring-2"/>
    <button class="rounded-lg px-4 bg-red-300" on:click="{() => num += 1}">+</button>
</div>