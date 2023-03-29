<script lang="ts">
  export let checked: boolean;
</script>

<label class="flex w-fit items-center gap-1">
  <input type="checkbox" bind:checked class="accent-teal-600" />
  <slot />
</label>
