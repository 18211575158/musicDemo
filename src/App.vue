<template>
    <div id="app">
        <div class="header">
            <span class="iconfont icon-caidan"></span>
            <ul>
                <li v-for="item in indexNav" @click="routeGo(item.url)">{{item.name}}</li>
            </ul>
        </div>
        <transition name="run">
            <router-view/>
        </transition> 
        <transition name="run">
            <list v-if="$store.state.musicState.isShowList"
                :musicLoadList="$store.state.musicState.musicLoadList"></list>
        </transition> 
        <transition name="run">
            <player v-show="$store.state.musicState.isShowPlayer"
                :autoPlayList="$store.state.musicState.autoPlayList"
                :index="$store.state.musicState.index"
                :listIdx="$store.state.musicState.listIdx"
                :url="$store.state.musicState.url"
            ></player>
        </transition>   
    </div>
</template>

<script>
    import list from "./components/music/list.vue"
    import player from "./components/music/player.vue"
    export default {
        data(){
            return{
                indexNav:[
                    {url:"/music",name:"音乐架"},
                    {url:"/more",name:"发现"}
                ]
            }
        },
        methods:{
            routeGo(url){
                this.$router.push({path:url})
            }
        },
        components:{
            list,player
        }
    }
</script>
<style lang="less" scoped>
    .header{width: 100%;height: 1.09375rem;background: #000;font-size:.5rem;
        padding: 0 0 0 .46875rem;
        span{float:left;width:.78125rem;height: 100%;color: #f00;
            font-size:0.8rem;text-align: center;line-height: 1.09375rem;margin-right: .46875rem;
        }
        ul{overflow: hidden;width: 8.28125rem;float: left;
            li{float: left;height: 100%;width: 50%;line-height: 1.09375rem;text-align:right;color: #f00;
                &.icon-caidan{font-size: 1rem}
                &:first-child{font-size: 0.6rem;text-shadow: 0 0 8px #fff;color: #000}
            }
        }
    }
</style>


