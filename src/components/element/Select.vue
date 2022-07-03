<template>
  <div class="space-y-1">
    <label id="listbox-label" class="block text-sm leading-5 font-medium bg-base-300">
      <slot name="SelectLabel"></slot>
    </label>

    <div class="relative" v-click-away="onClickAway">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          type="button"
          @click="openDropdown"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          class="cursor-pointer relative w-full rounded-md border bg-base-300 pl-4 pr-10 py-3 text-left
          focus:outline-none hover:border-info
          transition ease-in-out duration-150 sm:leading-5"
        >
          <div class="flex items-center space-x-3">
            <span class="block">
              {{ value }}
            </span>
          </div>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
      </span>

      <div v-show="isOpen" class="absolute mt-1 w-full rounded-md bg-gray-700 shadow-lg z-10">
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <li
            tabindex="0"
            @click="select(d)"
            id="listbox-item-0"
            role="option"
            v-for="d in data"
            v-bind:key="d"
            class="cursor-default select-none relative py-2 pl-4 pr-9 cursor-pointer hover:bg-indigo-400 hover:text-info focus:outline-none"
          >
            <div class="flex items-center space-x-3">
              <span
                class="block truncate"
                :class="isSelected(d) ? 'font-semibold' : 'font-normal'"
              >
                {{ d }}
              </span>
            </div>
            <span v-show="isSelected(d)" class="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: Array,
  value: String,
})
const emit = defineEmits(['valueSelect'])
const isOpen = ref(false)

const isSelected = (val) => {
  return props.value === val
}
const closeDropdown = () => {
  isOpen.value = false
}
const openDropdown = () => {
  isOpen.value = true
}
const select = (val) => {
  closeDropdown()
  emit('valueSelect', val)
}
const onClickAway = () => {
  closeDropdown()
}
</script>
