<script lang="ts">
  import IconClipboard from './IconClipboard.svelte';

  let colorData: string;
  let addToExtend = true;
  let backgroundColor = false;
  let textColor = false;
  let borderColor = false;

  const generateTokens = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-tokens' } }, '*');
  };

  onmessage = (event) => {
    colorData = event.data.pluginMessage.printStyleData;
  };
</script>

<div class="flex gap-8 p-4">
  <div class="flex min-h-[300px] min-w-[300px] flex-col justify-between gap-2">
    <div>
      <div>
        <h2 class="mb-1 font-bold">Classify by Type</h2>
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={backgroundColor} />
          background color (bg/*)
        </label>
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={textColor} />
          text color (text/*)
        </label>
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={borderColor} />
          border color (border/*)
        </label>
      </div>

      <div class="mt-8">
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={addToExtend} />
          add to extend
        </label>
      </div>
    </div>

    <button
      class="rounded bg-slate-600 py-1 px-2 font-normal text-slate-50 duration-200 hover:bg-slate-700"
      type="button"
      on:click={generateTokens}>generate</button
    >
  </div>

  <div class="flex min-w-[300px] flex-col gap-2">
    <div
      class="flex h-fit w-full items-center justify-between rounded bg-slate-200 px-3 py-1 text-sm"
    >
      tailwind.config
      <span class="flex cursor-pointer gap-1">
        <IconClipboard />
        copy code
      </span>
    </div>
    <div class="flex-grow rounded border border-slate-500 px-2 py-1">
      {#if colorData}
        {colorData}
      {/if}
    </div>
  </div>
</div>
