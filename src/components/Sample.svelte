<script lang="ts">
  let count: number = 1
  const generateTokens = () => {
    parent.postMessage(
      { pluginMessage: { type: 'generate-tokens', count } },
      '*'
    )
  }

  const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
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
</div>
