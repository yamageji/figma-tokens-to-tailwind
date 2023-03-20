<script lang="ts">
  let colorData: string

  const generateTokens = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-tokens' } }, '*')
  }

  const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  onmessage = (event) => {
    colorData = event.data.pluginMessage.printStyleData
  }
</script>

<div class="flex flex-col gap-4 p-4">
  <div class="flex gap-2">
    <button
      class="rounded-md bg-blue-500 py-1 px-2 font-normal text-blue-50"
      type="button"
      on:click={generateTokens}>generate</button
    >
    <button
      class="rounded-md bg-slate-300 py-1 px-2 font-normal text-slate-800"
      type="button"
      on:click={cancel}>Cancel</button
    >
  </div>
  {#if colorData}
    <div class="border border-slate-500 p-2">{colorData}</div>
  {/if}
</div>
