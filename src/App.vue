<template>
  <TodoHeader></TodoHeader>
  <TodoInput @childAddTodo="addTodo"></TodoInput>
  <TodoList :propsItems="todoItems" @childRemoveTodo="removeTodo"></TodoList>
  <TodoFooter @clearTodo="clearTodo"></TodoFooter>
</template>


<script>
import TodoHeader from './components/todo/TodoHeader.vue';
import TodoInput from './components/todo/TodoInput.vue';
import TodoList from './components/todo/TodoList.vue';
import TodoFooter from './components/todo/TodoFooter.vue';

export default {
    name: "App",
    data() {
      return {
        todoItems: []
      }
    },
    methods: {
      addTodo(todoItem) {
        this.todoItems.push(todoItem);
      },
      removeTodo(idx) {
        this.todoItems.splice(idx, 1); //(start number, delete amount)
      },
      clearTodo() {
        this.todoItems.splice(0);
      },
      changeValue() {
        const json = JSON.stringify(this.todoItems);
        localStorage.setItem('todoItems', json);
      }
    },
    components: {
      TodoHeader,
      TodoInput,
      TodoList,
      TodoFooter
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
          })
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
