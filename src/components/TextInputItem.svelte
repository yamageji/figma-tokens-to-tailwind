<script lang="ts">
  export let value: string;
</script>

<label class="flex w-fit items-center gap-2">
  <slot />
  <input
    type="text"
    bind:value
    placeholder="primitive"
    class="w-full rounded-sm border border-slate-500 px-1 py-0.5"
  />
</label>
