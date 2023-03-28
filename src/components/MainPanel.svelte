<script lang="ts">
  import { onMount } from 'svelte';
  import IconArrowPath from './IconArrowPath.svelte';
  import IconClipboard from './IconClipboard.svelte';
  import IconClipboardCopied from './IconClipboardCopied.svelte';

  let primitiveColorData: string;
  let semanticColorData: string;
  let textData: string;

  let prefix = '';
  let hasPrimitive = false;
  let classifyByType = false;

  let isCopiedSemantic = false;
  let isCopiedPrimitive = false;

  const generateTokens = () => {
    isCopiedSemantic = false;
    isCopiedPrimitive = false;

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

    //
    if (event.target.id === 'semantic' && isCopiedSemantic === false) {
      isCopiedSemantic = true;
      setTimeout(() => {
        isCopiedSemantic = false;
      }, 2000);
    } else if (event.target.id === 'primitive' && isCopiedPrimitive === false) {
      isCopiedPrimitive = true;
      setTimeout(() => {
        isCopiedPrimitive = false;
      }, 2000);
    }
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
      <label class="flex w-fit items-center gap-1">
        <input
          type="checkbox"
          bind:checked={hasPrimitive}
          class="accent-teal-600"
        />
        Primitive colours
      </label>

      <label class="flex w-fit items-center gap-2">
        prefix:
        <input
          type="text"
          bind:value={prefix}
          placeholder="primitive"
          class="w-full rounded-sm border border-slate-500 px-1 py-0.5"
        />
      </label>

      <label class="mt-4 flex w-fit items-center gap-1">
        <input
          type="checkbox"
          bind:checked={classifyByType}
          class="accent-teal-600"
        />
        Classify by keys
      </label>
    </div>

    <button
      class="mt-6 flex w-full items-center justify-center gap-2 rounded bg-teal-700 py-1 font-normal text-teal-50 duration-200 hover:bg-teal-800"
      type="button"
      on:click={generateTokens}
      >generate
      <IconArrowPath />
    </button>
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
        {#if semanticColorData}
          <button
            id="semantic"
            type="button"
            on:click={copyText}
            class="flex cursor-pointer items-center gap-1"
          >
            {#if isCopiedSemantic}
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
        {#if primitiveColorData}
          <button
            id="primitive"
            type="button"
            on:click={copyText}
            class="flex cursor-pointer items-center gap-1"
          >
            {#if isCopiedPrimitive}
              <IconClipboardCopied />
              Copied!
            {:else}
              <IconClipboard />
              Copy Code
            {/if}
          </button>
        {/if}
      </div>

      <pre
        class="h-[400px] w-full overflow-auto break-words rounded-b bg-code-surface px-3 py-2 font-mono text-sm leading-snug text-code-text">{#if primitiveColorData}{primitiveColorData}{/if}</pre>
    </div>
  </div>
</div>
