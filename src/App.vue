<template>
  <h1>HELLO</h1>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <input type="text" v-model="hello">
  <button v-on:click="changeHello">Change Welcome</button> 
  <!-- v-on:click -> @click 으로 줄여서 사용 가능 -->
  <FavoriteSinger />
  <FavoriteSingerProps imgSrc="https://pbs.twimg.com/media/EDkRGSMXUAAvprm.jpg" />

</template>

<script>
import FavoriteSinger from './components/FavoriteSinger.vue';
import FavoriteSingerProps from './components/FavoriteSingerProps.vue';

export default {
    name: "App",
    data() {
        return {
            hello: "Welcome"
        };
    },
    methods: {
        changeHello() {
            this.hello = "Hi";
        }
    },
  components: {
        FavoriteSinger,
        FavoriteSingerProps
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
