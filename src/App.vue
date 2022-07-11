<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @childAddTodo="addTodo" @showModal="showModal"></TodoInput>
    <TodoList :propsItems="todoItems" @childRemoveTodo="removeTodo"></TodoList>
    <TodoFooter @clearTodo="clearTodo"></TodoFooter>
  </div>
  <AlertModal :show="modalShow" @close="closeModal" header="Alert" body="Type contents."></AlertModal>
</template>


<script>
import TodoHeader from './components/todo/TodoHeader.vue';
import TodoInput from './components/todo/TodoInput.vue';
import TodoList from './components/todo/TodoList.vue';
import TodoFooter from './components/todo/TodoFooter.vue';
import AlertModal from './components/common/AlertModal.vue';

export default {
    name: "App",
    data() {
      return {
        todoItems: [],
        cnt: 0,
        modalShow: false,
      }
    },
    methods: {
      addTodo(todoItem) {
        this.todoItems.push(
          {
            key: this.cnt++,
            value: todoItem
          }
        )
      },
      removeTodo(key) {
        // this.todoItems.splice(idx, 1); //(start number, delete amount)
        this.todoItems.forEach((item, idx) => { //중간 번호 지웠을 때 key값 바로 이어지도록 바꿈
          if(item.key === key) {
            this.todoItems.splice(idx, 1);
          }
        })
      },
      clearTodo() {
        this.todoItems.splice(0);
        this.cnt = 0
      },
      changeValue() {
        const json = JSON.stringify(this.todoItems);
        localStorage.setItem('todoItems', json);
        localStorage.setItem('cnt', this.cnt);
      },
      showModal() {
        this.modalShow = true;
      },
      closeModal() {
        this.modalShow = false;
      }
    },

    components: {
      TodoHeader,
      TodoInput,
      TodoList,
      TodoFooter,
      AlertModal
    },
    watch: {
      todoItems: {
        deep: true,
        handler() {
          this.changeValue();
        }
      }
    },
    created() { //lifecycle hooks 참조
        const json = localStorage.getItem("todoItems");
        if(json) {
          const todoItems = JSON.parse(json);
          todoItems.forEach(item => {
            this.todoItems.push(item);
          });
          const cnt = localStorage.getItem("cnt");
          this.cnt = cnt;
        }
    }
    
}
</script>

<style>
  body {
    text-align: center;
    background-color: #f6f6f8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button { border-style: groove; }
  .shadow { box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03); }
</style>
