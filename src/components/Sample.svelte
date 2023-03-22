<script lang="ts">
  import IconClipboard from './IconClipboard.svelte';

  let primitiveColorData: string;
  let semanticColorData: string;
  let textData: string;

  let prefix = 'primitive';
  let hasPrimitiveColors = false;
  let classifyByType = false;
  let addColorsToExtend = false;

  let addToExtendText = false;

  const generateTokens = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-tokens',
          state: { prefix, hasPrimitiveColors },
        },
      },
      '*'
    );
  };

  onmessage = (event) => {
    semanticColorData = event.data.pluginMessage.semanticColorData;
    primitiveColorData = event.data.pluginMessage.primitiveColorData;
    textData = event.data.pluginMessage.textData;
  };
</script>

<div class="flex min-h-[300px] flex-col gap-8 p-4">
  <div class="flex gap-4">
    <div class="flex grow basis-1/2  flex-col gap-2">
      <h2 class="text-lg font-bold">Color Tokens</h2>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={hasPrimitiveColors} />
          primitive colors
        </label>

        <label class="ml-5 flex items-center gap-2">
          prefix:
          <input
            type="text"
            bind:value={prefix}
            class="w-full rounded-sm border border-slate-500 px-1 py-0.5"
          />
        </label>

        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={addColorsToExtend} />
          add to extend
        </label>

        <div>
          <label class="flex items-center gap-1">
            <input type="checkbox" bind:checked={classifyByType} />
            classify by type
          </label>
          <!-- <ul class="mt-2 rounded-sm border border-slate-400 px-2 py-1 text-sm">
            <li>background color (bg/*)</li>
            <li>text color (text/*)</li>
            <li>border color (border/*)</li>
          </ul> -->
        </div>
      </div>
    </div>

    <div class="flex grow basis-1/2  flex-col gap-2">
      <h2 class="text-lg font-bold">Text Tokens</h2>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-1">
          <input type="checkbox" bind:checked={addToExtendText} />
          add to extend
        </label>
      </div>
    </div>
  </div>

  <button
    class="w-fit rounded bg-teal-600 py-1 px-8 font-normal text-teal-50 duration-200 hover:bg-teal-700"
    type="button"
    on:click={generateTokens}>generate code</button
  >

  <div class="flex gap-4">
    <div class="w-1/2">
      <div
        class="flex h-fit w-full items-center justify-between rounded-t bg-code-title px-3 py-1 text-sm text-white"
      >
        <div
          class="before:contents-[''] flex items-center gap-2 before:h-2 before:w-2 before:rounded-full before:bg-teal-600"
        >
          tailwind.config.js
        </div>
        <span class="flex cursor-pointer items-center gap-1">
          <IconClipboard />
          copy code
        </span>
      </div>
      <div>
        <pre
          class="h-[400px] flex-grow overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if semanticColorData}{semanticColorData}{/if}</pre>
      </div>
    </div>

    <div class="w-1/2">
      <div
        class="flex h-fit w-full items-center justify-between rounded-t bg-code-title px-3 py-1 text-sm text-white"
      >
        <div
          class="before:contents-[''] flex items-center gap-2 before:h-2 before:w-2 before:rounded-full before:bg-teal-600"
        >
          main.css
        </div>
        <span class="flex cursor-pointer items-center gap-1">
          <IconClipboard />
          copy code
        </span>
      </div>

      <pre
        class="h-[400px] flex-grow overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if primitiveColorData}{primitiveColorData}{/if}</pre>
    </div>
  </div>
</div>
