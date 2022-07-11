<template>
    <section>
        <transition-group name="list" tag="ul">
            <li :key="todoItem.key" v-for="todoItem in propsItems" class="shadow">
                <i class="checkBtn fas fa-check" aria-hidden="true"></i>
                {{ todoItem.value }}
                <span class="removeBtn" type="button" @click="removeTodo(todoItem.key)">
                    <i class="far fa-trash-alt" aria-hidden="true"></i>
                </span>
            </li>
        </transition-group>
    </section>
</template>

<style scoped>
    .list-enter-active, .list-leave-active { transition: all 0.5s; }
    .list-enter-from, .list-leave-to { opacity: 0; transform: translateY(30px);}

    ul { 
        list-style-type: none;
        padding-left: 0;
        margin-top: 0;
        text-align: left;
    }
    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background-color: #fff;
        border-radius: 5px;
    }
    .checkBtn {
        line-height: 50px;
        color: #62acde;
        margin-right: 5px;
    }
    .removeBtn {
        margin-left: auto;
        color: #de4343;
    }
</style>

<script>
export default {
    props: { propsItems: Array },
    methods: {
        removeTodo(key) {
            this.$emit('childRemoveTodo', key); //$emit('이벤트명', 실행할 작업)
        }
    },
    
}
</script>
