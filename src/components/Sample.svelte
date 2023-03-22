<script lang="ts">
  import IconClipboard from './IconClipboard.svelte';

  let colorData: string;
  let textData: string;

  let addToExtendColor = false;
  let classifyByType = false;
  let addToExtendText = false;

  const generateTokens = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-tokens' } }, '*');
  };

  onmessage = (event) => {
    colorData = event.data.pluginMessage.colorData;
    textData = event.data.pluginMessage.textData;
  };
</script>

<div class="flex gap-8 p-4">
  <div class="flex min-h-[300px] min-w-[300px] flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-bold">Color Tokens</h2>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={addToExtendColor} />
          add to extend
        </label>
        <div>
          <label class="flex items-center gap-1">
            <input type="checkbox" bind:checked={classifyByType} />
            Classify by Type
          </label>
          <ul class="mt-2 rounded-sm border border-slate-400 px-2 py-1 text-sm">
            <li>background color (bg/*)</li>
            <li>text color (text/*)</li>
            <li>border color (border/*)</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-bold">Text Tokens</h2>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={addToExtendText} />
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
    <div
      class="flex-grow rounded border border-slate-400 px-2 py-1 font-mono text-sm leading-snug"
    >
      {#if colorData}
        <pre>{colorData}</pre>
        <pre>{textData}</pre>
      {/if}
    </div>
  </div>
</div>
