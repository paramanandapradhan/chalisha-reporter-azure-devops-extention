<script lang="ts">
    import { browsersColors } from "../services/utils.service";

    let { name }: { name: string } = $props();
</script>

{#if name}
    {@const color = browsersColors[name]}
    <div>
        <span
            class="border rounded-full text-sm px-2"
            style="background-color:{color}22;border-color:{color};color:{color};"
        >
            {name || ""}
        </span>
    </div>
{/if}
