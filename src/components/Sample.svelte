<script lang="ts">
  import { onMount } from 'svelte';
  import IconClipboard from './IconClipboard.svelte';

  let primitiveColorData: string;
  let semanticColorData: string;
  let textData: string;

  let prefix = 'primitive';
  let hasPrimitive = false;
  let classifyByType = false;

  const generateTokens = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-tokens',
          state: { prefix, hasPrimitive, classifyByType },
        },
      },
      '*'
    );
  };

  const copyText = (event) => {
    // textarea を作ってコピーしたいテキストを value にセット
    let textArea = document.createElement('textarea');
    textArea.value =
      event.target.id === 'semantic' ? semanticColorData : primitiveColorData;

    // 一応画面外に飛ばしとく
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    // select して実行
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
  };

  onmessage = (event) => {
    semanticColorData = event.data.pluginMessage.semanticColorData;
    primitiveColorData = event.data.pluginMessage.primitiveColorData;
    textData = event.data.pluginMessage.textData;
  };

  onMount(() => generateTokens());
</script>

<div class="m-4 flex gap-8">
  <div class="w-[200px] flex-shrink-0">
    <h2 class="text-lg font-bold">Settings</h2>
    <div class="mt-2 flex flex-col gap-1">
      <label class="flex items-center gap-1">
        <input
          type="checkbox"
          bind:checked={hasPrimitive}
          class="accent-teal-600"
        />
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
        <input
          type="checkbox"
          bind:checked={classifyByType}
          class="accent-teal-600"
        />
        classify by type
      </label>
    </div>

    <button
      class="mt-6 w-full rounded bg-teal-700 py-1 font-normal text-teal-50 duration-200 hover:bg-teal-800"
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
          class="before:contents-[''] flex items-center gap-1.5 before:h-2 before:w-2 before:rounded-full before:bg-teal-500"
        >
          tailwind.config.js
        </div>
        <button
          id="semantic"
          type="button"
          on:click={copyText}
          class="flex cursor-pointer items-center gap-1"
        >
          <IconClipboard />
          copy code
        </button>
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
          class="before:contents-[''] flex items-center gap-1.5 before:h-2 before:w-2 before:rounded-full before:bg-teal-500"
        >
          main.css
        </div>
        <button
          id="primitive"
          type="button"
          on:click={copyText}
          class="flex cursor-pointer items-center gap-1"
        >
          <IconClipboard />
          copy code
        </button>
      </div>

      <pre
        class="h-[400px] w-full overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if primitiveColorData}{primitiveColorData}{/if}</pre>
    </div>
  </div>
</div>
