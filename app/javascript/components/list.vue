<template>
  <div class="list">
    <h2 class="header">{{ list.name }}</h2>
    <div class="deck">
      <Card class="shadow-md rounded" v-for="card in cards" :card="card" :key="card.id"></Card>

      <div class="input-area">
        
       
        <button v-if="!editing" class="addbutton" @click="newCard"><span><i  class="fas fa-plus" ></i>&nbsp</span>新增卡片</button>

 
        
        <textarea v-if="editing" class="content" id="" v-model="content"></textarea>
        <button v-if="editing" class="button" @click="createCard">建立卡片</button>
        <button v-if="editing" class="cancel" @click="cancelNew"><span ><i  class="fas fa-times"></i></span></button>
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
      cards: this.list.cards,
      editing: false
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
         this.editing = false;
        },
        error: err => {
          console.log(err);
          this.cards
        }
      });
    },
    newCard(event) {
      event.preventDefault();
      this.editing = true;

          },
    cancelNew(event) {
      event.preventDefault();
      this.editing = false;
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
        @apply .w-full .p-2 rounded .shadow-md mb-2;

        &:focus {
          @apply .outline-none;
        }
      }

      .addbutton{
        @apply .text-gray-600 rounded px-3 py-1 w-full text-left;

        &:hover {
          @apply .bg-gray-400;
        }
      }

  

      .button {
        @apply .px-3 .py-2 .font-semibold .text-sm .bg-green-400 rounded;

        &:focus {
          @apply .outline-none;
        }
      }

      .cancel {
        @apply .ml-2 .text-2xl .text-gray-600 .align-middle; 

        &:hover {
          @apply .text-black;
        }
      }
    }
  }
</style>