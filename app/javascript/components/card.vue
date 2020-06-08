<template>
<div>
    <div class="card" @click="editing=true">
    
      <span>{{ card.name }}</span>
      <a @click.stop="" @click="deleteCard"><i class="fas fa-times" ></i></a>
    

  </div>

  <div v-if="editing" class="dialog" >
    <div class="inner">
      <a class="closeButton" @click="close"><i class="fas fa-times" ></i></a>
      <textarea class="content" v-model="content"></textarea>
      <button class="updateButton" @click="update">更新</button>
    </div>
  </div>
</div>

</template>

<script>
export default {
  nam: 'Card',
  data: function() {
    return {
      editing: false,
      content: this.card.name
    }
  },
  props: ["card"],
  methods: {
    close(event) {
      event.preventDefault();
      this.editing = false;
      this.content = this.card.name
    },

    update(event) {
      event.preventDefault();
      this.$store.dispatch("updateCard", { id: this.card.id, name: this.content });
      this.editing = false;
    },

    deleteCard(event) {
      event.preventDefault();
      if (confirm("是否刪除?")) {
        console.log(`card_id: ${this.card.id}`)
        this.$store.dispatch('deleteCard', { card_id: this.card.id, list_id: this.card.list_id});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    @apply .bg-gray-100 .mb-2 .rounded-sm .px-2 .py-2 .cursor-pointer .flex .justify-between;
  }

  .dialog {
    background-color: rgba(0,0,0,0.7);
    @apply .fixed .w-full .h-full .top-0 .left-0 .flex .items-center .justify-center;  

    .inner {
      @apply .bg-white .flex .flex-col .px-6 .py-2 .w-1/2;
      .closeButton {
        @apply .text-gray-800 .text-right .cursor-pointer;
      }

      .content {
        @apply .px-2 .py-2 .border-2 .border-gray-300 .mt-2;

        &:focus {
          @apply outline-none;
        }
      }

      .updateButton {
        @apply .bg-gray-400 .px-3 .py-2 .mt-2 .rounded;
        &:focus {
          @apply outline-none;
        }
      }
    }
  }
</style>