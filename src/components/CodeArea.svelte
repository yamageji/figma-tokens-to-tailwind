<script lang="ts">
  import IconClipboard from './icons/IconClipboard.svelte';
  import IconClipboardCopied from './icons/IconClipboardCopied.svelte';

  export let colorData: string;
  export let isCopied: boolean;
</script>

<div class="w-[360px]">
  <div
    class="flex h-fit w-full items-center justify-between rounded-t bg-code-title px-3 py-2 text-sm text-white"
  >
    <div
      class="before:contents-[''] flex items-center gap-1.5 before:h-2 before:w-2 before:rounded-full before:bg-teal-500"
    >
      <slot />
    </div>
    {#if colorData}
      <button
        id="semantic"
        type="button"
        on:click
        class="flex cursor-pointer items-center gap-1"
      >
        {#if isCopied}
          <IconClipboardCopied />
          Copied!
        {:else}
          <IconClipboard />
          Copy Code
        {/if}
      </button>
    {/if}
  </div>
  <div>
    <pre
      class="h-[400px] w-full overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if colorData}{colorData}{/if}</pre>
  </div>
</div>
