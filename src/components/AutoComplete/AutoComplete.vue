<script setup>
import { ref, computed } from 'vue';
import { useClickOnTarget } from '@/composables/clickOnTarget';
const props = defineProps(["data"])
const emits = defineEmits(["setSelected"])
const wrapper = ref(null)
const showResults = ref(true)
const search = ref("")
const skipUnwrap = { el: ref([]) };
const selectedOption = ref(null)
const isClickOnTarget = useClickOnTarget(wrapper)
const filterBySearch = computed(() => props.data.filter(option => option.name.toLowerCase().includes(search.value.toLowerCase())))

const selectOptionHandler = (option) => {
  search.value = ""
  selectedOption.value = option
  showResults.value = false
  emits("setSelected", option)
}

const typeHandler = (event) => {
  search.value = event.target.value
  showResults.value = true
  selectedOption.value = null
}

const clearSearchHandler = () => {
  search.value = ""
  selectedOption.value = null
}


const clickInputHandler = () => {
  showResults.value = true
}
</script>


<template>
  <div ref="wrapper" class="autocomplete">
    <div @click="clickInputHandler" class="autocomplete__input">
      <input  class="search" placeholder="Type for search" type="text" :value="search || selectedOption?.name" @input.trim="typeHandler"/>
      <span  @click="clearSearchHandler" class="material-icons close">close</span>
      <span :class="{'active': isClickOnTarget & showResults}" class="material-icons expand">expand_more</span>

    </div>

    <div v-if="filterBySearch.length > 0" v-show="isClickOnTarget && showResults" class="autocomplete__results">

      <button 
        :ref="skipUnwrap.el" 
        @click="selectOptionHandler(option)" 
        class="result" 
        :class="{'selected' : selectedOption?.name === option.name}" 
        v-for="option in filterBySearch">
        {{option.name}}
      </button>

    </div>
    <div class="not-found" v-else>Your search - {{search}} - did not match any options.</div>
  </div>
</template>


<style lang="scss" scoped>
.autocomplete {
  @apply w-[500px] my-5 mx-auto select-none;

  &__input {
    @apply flex gap-2 items-center h-12 rounded-md px-4 border border-slate-200;

    .search{
      @apply bg-inherit flex-1 outline-none
    }

    .close{
      @apply text-lg flex items-center p-1 px-2 rounded-full cursor-pointer
    }

    .expand{ 
      @apply delay-75 transition-all flex items-center p-1 rounded-full cursor-pointer
    }
    .active{
      @apply rotate-180
    }

  }

  &__results {
    @apply max-h-[300px] overflow-y-auto border rounded-md border-slate-200;

    .result {
      @apply flex py-2.5 px-4 border-b border-slate-200 w-full outline-none;

      &:focus{
        @apply bg-slate-700;
      }

    }

    .selected{
        @apply bg-slate-700;
      }
  }


  .not-found{
    @apply px-3 py-2 border border-slate-200 rounded-md break-words
  }
}
</style>