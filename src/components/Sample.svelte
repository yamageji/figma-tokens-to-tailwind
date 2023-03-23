<script lang="ts">
  import IconClipboard from './IconClipboard.svelte';

  let primitiveColorData: string;
  let semanticColorData: string;
  let textData: string;

  let prefix = 'primitive';
  let hasPrimitive = false;
  let classifyByType = false;
  let addToExtend = false;

  const generateTokens = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-tokens',
          state: { prefix, hasPrimitive, classifyByType, addToExtend },
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

<div class="flex gap-8 p-4">
  <div class="w-[200px] flex-shrink-0">
    <h2 class="text-lg font-bold">Settings</h2>
    <div class="mt-2 flex flex-col gap-1">
      <label class="flex items-center gap-1">
        <input type="checkbox" bind:checked={hasPrimitive} />
        primitive colors
      </label>

      <label class="flex items-center gap-2">
        prefix:
        <input
          type="text"
          bind:value={prefix}
          class="w-full rounded-sm border border-slate-500 px-1 py-0.5"
        />
      </label>

      <label class="flex items-center gap-1">
        <input type="checkbox" bind:checked={addToExtend} />
        add to extend
      </label>

      <label class="flex items-center gap-1">
        <input type="checkbox" bind:checked={classifyByType} />
        classify by type
      </label>
    </div>

    <button
      class="mt-6 w-full rounded bg-teal-600 py-1 font-normal text-teal-50 duration-200 hover:bg-teal-700"
      type="button"
      on:click={generateTokens}>generate code</button
    >
  </div>

  <div class="flex flex-grow gap-6">
    <div class="w-[360px]">
      <div
        class="flex h-fit w-full items-center justify-between rounded-t bg-code-title px-3 py-2 text-sm text-white"
      >
        <div
          class="before:contents-[''] flex items-center gap-1.5 before:h-2 before:w-2 before:rounded-full before:bg-teal-600"
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
          class="h-[400px] w-full overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if semanticColorData}{semanticColorData}{/if}</pre>
      </div>
    </div>

    <div class="w-[360px]">
      <div
        class="flex h-fit w-full items-center justify-between rounded-t bg-code-title px-3 py-2 text-sm text-white"
      >
        <div
          class="before:contents-[''] flex items-center gap-1.5 before:h-2 before:w-2 before:rounded-full before:bg-teal-600"
        >
          main.css
        </div>
        <span class="flex cursor-pointer items-center gap-1">
          <IconClipboard />
          copy code
        </span>
      </div>

      <pre
        class="h-[400px] w-full overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if primitiveColorData && hasPrimitive}{primitiveColorData}{/if}</pre>
    </div>
  </div>
</div>
