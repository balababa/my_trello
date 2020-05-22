<template>
  <div class="list">
    <div class="header"> 
      
      <a v-if="!editingName" @click="editName" class="w-full cursor-pointer ml-2 my-1"><h2  class="header inline">{{ list.name }}</h2></a>   
      <input ref="list_name" v-if="editingName" type="text" class="list_name" placeholder="為列表輸入標題" v-model="name" @blur="blur" @keyup.enter="$event.target.blur()">
      <button  class="delete" @click="deleteList"><span ><i class="fas fa-trash"></i></span></button>
    </div>

    <div class="deck">
      <draggable :animation="200" dragClass="card" ghost-class="ghost" group="list" v-model="cards" @change="cardMove">
        <Card class="shadow-md rounded" v-for="card in cards" :card="card" :key="card.id"></Card>
      </draggable>

      <div class="input-area">
        
       
        <button v-if="!editing" class="addbutton" @click="newCard"><span><i  class="fas fa-plus" ></i>&nbsp</span>新增卡片</button>

 
        
        <textarea ref="card_name" v-if="editing" class="content" id="" v-model="content" @keyup.enter="$event.target.blur()" @blur="createCard"></textarea>
        <button v-if="editing" class="button" @click="createCard">建立卡片</button>
        <button v-if="editing" class="cancel" @click="cancelNew"><span ><i  class="fas fa-times"></i></span></button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs';
import Card from 'components/card';
import draggable from 'vuedraggable';

export default {
  name: 'List',
  props: ["list"],
  components: { Card, draggable },
  data: function() {
    return {
      name: this.list.name,
      content: '',
      cards: this.list.cards,
      editing: false,
      editingName: false
    }
  },
  methods: {
    editName(event) {
      event.preventDefault();
      this.editingName = true;
       this.$nextTick(()=> {
           this.$refs.list_name.focus(); 
           this.$refs.list_name.select();
      })
      
    },
    blur(event) {
      event.preventDefault();
      this.$store.dispatch('updateList', { id: this.list.id, name: this.name});
      this.editingName = false; 
     
    },

    deleteList(event) {
      event.preventDefault();
      if (confirm("是否刪除?")) {
        this.$store.dispatch('deleteList', this.list.id);
      }
    },

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
      this.$nextTick(()=> {
        this.$refs.card_name.focus();
      })

          },
    cancelNew(event) {
      event.preventDefault();
      this.editing = false;
    },
    cardMove(event) {
      let evt = event.added || event.moved;
      if (evt) {
        let el = evt.element;
        let card_id = el.id;
        
        let data = new FormData();
        data.append('card[position]', evt.newIndex + 1);
        data.append('card[list_id]', this.list.id);

        Rails.ajax({
          url: `/cards/${card_id}/move`,
          type: 'PUT',
          data,
          dataType: 'json',
          success: resp => {
            console.log(resp);
          },
          error: err => {
            console.log(err);
          }
        });

      
      }


     
    }
  }
}
</script>

<style lang="scss" scoped>
  .ghost {
    @apply .border-2 .border-gray-400 .border-dashed .bg-gray-300;
  }

  .list {
    @apply .bg-gray-300 .mx-2 .w-64 .rounded .px-3 .py-2 .flex-none .h-full;

    .list_name {
      @apply .w-5/6 .px-2 .rounded .py-1;

      &:focus {
        
      }
    }

    .header {
      @apply .flex .justify-between .items-center;

      .delete {
       @apply  .text-gray-600 .px-3 .py-1 .w-1/6 ;

        &:hover {

          @apply .text-black .bg-gray-400;
        }
        &:focus {

          @apply .outline-none;
        }
      
      }
    }
  

    .header {   
      @apply   .font-bold;
    }

    .deck {
      @apply .mt-2;

      .card {
        opacity: 75;
      }

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

        &:hover {
          @apply .bg-green-300;
        }
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