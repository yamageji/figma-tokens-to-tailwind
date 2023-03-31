<button
  class="flex w-full items-center justify-center gap-2 rounded bg-teal-700 py-1 font-normal text-teal-50 duration-200 hover:bg-teal-800 {$$restProps.class ||
    ''}"
  type="button"
  on:click
>
  <slot />
</button>
