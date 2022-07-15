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
import axios from 'axios';
import DateUtils from './utils/DateUtils';

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
        const param = {
          'todo': todoItem
        };
        axios.post('/todo/index', param)
        .then(res => {
          if(res.status === 200 && res.data) {
            console.log(res);
            const item = {
              'itodo': res.data.result,
              'todo': todoItem,
              'created_at': DateUtils.getTimestamp(new Date())
            }
            this.todoItems.push(item);
          }
        })
        // this.todoItems.push(
        //   {
        //     key: this.cnt++,
        //     value: todoItem
        //   }
        // )
      },
      removeTodo(key) {
        // this.todoItems.splice(idx, 1); //(start number, delete amount)
        this.todoItems.forEach((item, idx) => { //중간 번호 지웠을 때 key값 바로 이어지도록 바꿈
          if(item.itodo === key) {
            this.todoItems.splice(idx, 1);
            axios.delete(`/todo/index/${item.itodo}`)
            .then(res => {
              console.log(res);
            });
          }
        })
      },
      clearTodo() {
        this.todoItems.splice(0);
        this.cnt = 0
        axios.delete(`/todo/index/`)
        .then(res => {
              console.log(res);
        });
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
      axios.get('/todo/index')
      .then(res => {
        if(res.status === 200 && res.data.length > 0) {
          res.data.forEach(item => {
            this.todoItems.push(item);
          })
        }
        console.log(res);
      });

        // const json = localStorage.getItem("todoItems");
        // if(json) {
        //   const todoItems = JSON.parse(json);
        //   todoItems.forEach(item => {
        //     this.todoItems.push(item);
        //   });
        //   const cnt = localStorage.getItem("cnt");
        //   this.cnt = cnt;
        // }
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
  .ctnt { font-size: 1rem; }
  .d-flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-row { flex-direction: row; }
  .grow_1 { flex-grow: 1; }
  .shadow { box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03); }
  .justify_content_evenly { justify-content: space-evenly; }
</style>
