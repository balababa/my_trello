<template>
  <div class="list">
    <h2 class="header">{{ list.name }}</h2>
    <div class="deck">
      <Card v-for="card in cards" :card="card" :key="card.id"></Card>

      <div class="input-area">
        <textarea class="content" id="" v-model="content"></textarea>
        <button class="button" @click="createCard">新增卡片</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs';
import Card from 'components/card';

export default {
  name: 'List',
  props: ["list"],
  components: { Card },
  data: function() {
    return {
      content: '',
      cards: this.list.cards
    }
  },
  methods: {
    createCard(event) {
      event.preventDefault();
      
      let data = new FormData();
      data.append("card[name]", this.content);
      data.append("card[list_id]", this.list.id);

      Rails.ajax({
        url: '/cards',
        type: 'POST',
        data,
        dataType: 'json',
        success: resp => {
         this.content = '',
         this.cards.push(resp);
        },
        error: err => {
          console.log(err);
          this.cards
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    @apply .bg-gray-300 .mx-2 .w-64 .rounded .px-3 .py-1;

    .header {   
      @apply   .font-bold;
    }

    .deck {
      @apply .mt-2;

    }

    .input-area {
      @apply .mt-3;
      
      .content {
        @apply .w-full .p-2 rounded-sm;

        &:focus {
          @apply .outline-none;
        }
      }

      .button {
        @apply .px-3 .py-1 .font-semibold .text-sm .bg-blue-300 rounded;

        &:focus {
          @apply .outline-none;
        }
      }
    }
  }
</style>