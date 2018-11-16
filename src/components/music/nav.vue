<template>
    <!-- 音乐首页的横向导航组件 -->
    <ul class="nav">
        <li v-for="item in listArr">
            <span class="iconfont" :class="item.icon"></span>
            <span class="fonts">{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props:["listArr"]
}
</script>
<style lang="less" scoped>
    .nav{width: 100%;height: 1.875rem;overflow: hidden;display:flex;
        li{flex: 1;margin: .15625rem;
            span{display: block;width: 100%;height: 50%;text-align: center;
                font-size: .5rem;
                &.fonts{padding-top: .15625rem}
                &.iconfont{font-size: 1rem;}
            }
        }
        border-bottom: 1px solid #ccc;
    }
</style>