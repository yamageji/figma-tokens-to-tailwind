<script lang="ts">
  let count: number = 1
  const createObject = () => {
    parent.postMessage(
      { pluginMessage: { type: 'create-rectangles', count } },
      '*'
    )
  }

  const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }
</script>

<div class="flex flex-col gap-4 p-4">
  <p>
    Count: <input
      bind:value={count}
      type="number"
      class="w-20 rounded-sm border border-slate-500 px-2 py-1"
    />
  </p>

  <div class="flex gap-2">
    <button
      class="rounded-md bg-blue-500 py-1 px-2 font-normal text-blue-50"
      type="button"
      on:click={createObject}>Create</button
    >
    <button
      class="rounded-md bg-slate-300 py-1 px-2 font-normal text-slate-800"
      type="button"
      on:click={cancel}>Cancel</button
    >
  </div>
</div>
