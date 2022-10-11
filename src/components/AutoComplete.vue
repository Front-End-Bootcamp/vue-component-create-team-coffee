<script setup>
import {computed, ref} from "vue";
const props = defineProps(["items", "filterby", "title"]);
const emit = defineEmits(['selected']);
const input = ref(null);
const optionsList = ref(null);
const itemHeight = ref(39);
const selectedItem = ref(null);
const selected = ref(0);
const visible = ref(true);
const query = ref('');
const itemClicked = (index) => {
	selected.value = index;
  return selectItem();
}
const selectItem = () => {
	if (!matches.value.length) {
    return;
  }
  selectedItem.value = matches.value[selected.value];
	query.value = selectedItem.value.name;
	selected.value = 0;
  emit('selected', selectedItem.value);
}
const remove = () => {
	query.value = '';
	selectedItem.value = 0;
}
const up = () => {
	if (selected.value == 0) {
  	return;
  }
  selected.value -= 1;
  return scrollToItem();
}
const down = () => {
	if (selected.value >= matches.value.length - 1) {
    return;
  }

  selected.value += 1;
  return scrollToItem();
}
const scrollToItem = () => {
	return optionsList.value.scrollTop = selected.value * itemHeight.value;
}
const matches = computed(() => {
  // emit('change', query.value);

  if (query.value == '') {
    return [];
  }

  return props.items.filter((item) => item[props.filterby].toLowerCase().includes(query.value.toLowerCase()))
  }
)
</script>
<template>
  <div class="autocomplete">
    <div class="popover" v-show="visible">
      <input type="text" 
        ref="input"
        v-model="query"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        placeholder="Start Typing...">
				<button class="close" @click="remove " v-if="selectedItem">X</button>
      <div class="options" ref="optionsList">
        <ul>
          <li v-for="(match, index) in matches"
            :key="index"
            :class="{ 'selected': (selected == index)}"
            @click="itemClicked(index)"
            v-text="match[filterby]"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.autocomplete {
		bottom: 250px;
    width: 100%;
    position: relative;
		background: #fff;
		
}
.popover {
    min-height: 40px;
    border: 2px solid lightgray;
    position: absolute;
    left: 0;
    right: 0;
    background: #fff;
    border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;

		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		
    text-align: center;
		justify-content: center;
}
.popover input {
    width: 100%;
    min-height: 40px;
    font-size: 16px;
		border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
    border: 1px solid lightgray;
		background:  #fff ;
		color: black;
}
.close {
    position: absolute;
    right: 8px;
    top: 6px;
    background: none;
    border: none;
    color: black;
    cursor: pointer;
		align-items: center;
		justify-content: center;
}
.options {
    max-height: 450px;
    overflow-y: scroll;
		color: black;
		align-items: center;
		justify-content: center;

}

.options ul {
    list-style-type: none;
    text-align: left;
		border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
}
.options ul li {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    cursor: pointer;
    background: #f1f1f1;
		/* border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px; */
}
.options ul li:first-child {
    border-top: 2px solid #d6d6d6;
}

.options ul li:not(.selected):hover {
    background: #bfb3b3;
    color: #fff;
}
.options ul li.selected {
    background: rgb(143, 135, 135) ;
    color: #fff;
    font-weight: 600;
}
</style>
