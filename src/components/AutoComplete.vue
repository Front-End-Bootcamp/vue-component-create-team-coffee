<script setup>
import {computed, ref} from "vue";
const props = defineProps(["items", "filterby", "title", "shouldReset"]);
const emit = defineEmits(['selected']);
const input = ref(null);
const optionsList = ref(null);
const itemHeight = ref(39);
const selectedItem = ref(null);
const selected = ref(0);
const visible = ref(false);
const query = ref('');

const toggleVisible = () => {
	visible.value = !visible.value;
}
const setTimeout = (() => {
	input.value.focus();
},50);
const itemClicked = (index) => {
	selected.value = index;
  return selectItem();
}
const selectItem = () => {
	if (!matches.value.length) {
    return;
  }
  selectedItem.value = matches.value[selected.value];
  visible.value = false;
  if (props.shouldReset) {
    query.value = '';
    selected.value = 0;
  }
  emit('selected', JSON.parse(JSON.stringify(selectedItem.value)));
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
	optionsList.value.scrollTop = selected.value * itemHeight.value;
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
    <div class="input" @click="toggleVisible" v-text="selectedItem ? selectedItem[filterby] : ''"></div>
		<!-- placeholderda seçili öğe yoksa propstan gelen title gösterilir -->
    <div class="placeholder" v-if="selectedItem == null" v-text="props.title"></div>

		<!-- @click seçili öğeyi kaldırır. -->
    <button class="close" @click="selectedItem = null" v-if="selectedItem">X</button> 
<!-- Input alanı. Entere basılınca otomatik öğe seçiliyor -->
    <div class="popover" v-show="visible">
      <input type="text"
        ref="input"
        v-model="query"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        placeholder="Start Typing...">
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
    width: 100%;
    position: relative;
}
.input {
    height: 40px;
    border-radius: 3px;
    border: 2px solid lightgray;
    box-shadow: 0 0 10px #eceaea;
    font-size: 25px;
    padding-left: 10px;
    padding-top: 10px;
    cursor: text;
}
.close {
    position: absolute;
    right: 8px;
    top: 6px;
    background: none;
    border: none;
    color: lightgrey;
    cursor: pointer;
		align-items: center;
		justify-content: center;
}
.placeholder {
    position: absolute;
    top: 11px;
    left: 11px;
    font-size: 25px;
    color: #d0d0d0;
    pointer-events: none;
		width: 100%;
		text-align: center;



}
.popover {
    min-height: 50px;
    border: 2px solid lightgray;
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 3px;
    text-align: center;
}
.popover input {
    width: 95%;
    margin-top: 5px;
    height: 40px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid lightgray;
    padding-left: 8px;
}
.options {
    max-height: 150px;
    overflow-y: scroll;
    margin-top: 5px;
}
.options ul {
    list-style-type: none;
    text-align: left;
    padding-left: 0;
}
.options ul li {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    cursor: pointer;
    background: #f1f1f1;
}
.options ul li:first-child {
    border-top: 2px solid #d6d6d6;
}

.options ul li:not(.selected):hover {
    background: #8c8c8c;
    color: #fff;
}
.options ul li.selected {
    background: #58bd4c;
    color: #fff;
    font-weight: 600;
}
</style>
