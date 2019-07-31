<template>
    <div class="cardBox">
        <h3><b>{{task.name}}</b><a>#{{task.task_id}}</a></h3>
        <div class="cardDetail">
            <span>目的</span>
            <vue-markdown :source="task.target" :emoji="true" class="text"></vue-markdown>
        </div>
        <div class="cardFooter">
            <span></span>
            <router-link :to="`/exercise/${$route.params.exeid}/task/${task.task_id}`"><el-button type="danger" size="mini">查看</el-button></router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: 'task-card',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang='scss' scoped>
// 不知道做自适应的时候这个组件的 长宽是确定值是多少 更改.cardBox这个类的长宽即可

.cardBox{
    position: relative;
    background-color: #fff;

    padding: 22px;
    height: 210px;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
}
h3{
    font-size:18px;
    margin:0;
    display: flex;
    justify-content: space-between;
    a{
        font-size:14px;
        color:#ababab;
    }
}
.cardDetail{
    margin-top:12px;
    span{
        font-size:12px;
        color:#ccc;
    }
    p{
        word-wrap:break-word;
        font-size:14px;
        overflow:hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:5;
        margin:6px 0 12px 0;
    }
}
.cardFooter{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom:10px;
    width:100%;
    padding:0 15px;
    left: 0;
    em{
        font-style: normal;
        vertical-align: middle;
        margin-left:5px;
        font-size:12px;
    }
    img{
        width:18px;
        vertical-align: middle;
    }
    span{
        display: flex;
        align-items:center;
    }
}
</style>
