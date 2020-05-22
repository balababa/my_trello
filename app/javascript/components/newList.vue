<template>
  <div class="container"> 
    <button  v-if="!editing" class="new_button" @click="newList">
      <span><i  class="fas fa-plus" ></i>&nbsp</span>新增其他列表
    </button>

    <input v-if="editing" ref="list_name" type="text" class="list_name" placeholder="為列表輸入標題" v-model="name" @keyup.enter="$event.target.blur()" @blur="createList">
    <button  v-if="editing"  class="button create_button" @click="createList">建立卡片</button>
    <button   v-if="editing"  class="cancel_button" @click="cancelCreateList"><span ><i  class="fas fa-times"></i></span></button>

  </div>

</template>

<script>
import Rails from '@rails/ujs';

export default {
  name: "Newlist",
  data: function() {
    return {
      editing: false,
      name: ''
    }
  },
  methods: {
    newList(event) {
      event.preventDefault();
      this.editing = true;
      this.$nextTick( () => {
        this.$refs.list_name.focus();

      })
    },
    cancelCreateList(event) {
      event.preventDefault();

      this.editing = false;
      this.name = '';
    },
    createList(event) {
      event.preventDefault();
      this.$store.dispatch("createList", this.name);
      this.name = '';
      this.editing = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .new_button {
  @apply .font-bold .w-full .text-left .px-2 .py-2 .text-gray-600;

  &:hover {
    @apply bg-gray-400;
  }

  &:focus {
    @apply .outline-none;
  }
}

.list_name {
  @apply .rounded .w-full .px-3 .py-2 .mb-2;

  &:focus {
    @apply .outline-none;
  }
}

.button {
  @apply .px-3 .py-1 .rounded .font-bold .text-sm;

  &:focus {
    @apply .outline-none;
  }
}

.create_button {
  @apply .bg-gray-400;

  &:hover {
    @apply .bg-gray-500;
  }
}

.cancel_button {
  @apply .ml-2 .text-gray-600 .text-xl .align-middle;

  &:hover {
    @apply .text-black;
  }
}

.container {
  @apply .bg-gray-300 .px-2 .py-2 .mx-2 .w-64 .h-full .rounded .flex-none;
}
</style>