<template>
    <!-- 音乐首页的推荐歌单信息 -->
    <div class="recommend">
        <h2>推荐歌单</h2>
        <ul>
            <li v-for="(item,index) in personalized" @click="showMusicList(item,index)">
                <img v-lazy="item.picUrl">
                <span class="iconfont icon-headphones-copy">{{item.playCount.toString().slice(0,3)}}万</span>
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                personalized:[],    //存放推荐歌单一系列的数据
            }
        },
        created(){
            this.axios.get("http://localhost:3000/personalized").then((res) => {
                this.personalized = res.data.result.slice(0,6);    //这里只放了推荐专辑的前六项
            })
        },
        methods:{
            showMusicList(item,index){
                this.$store.dispatch("getMusicList",{item,index})
            }
        }
    }
</script>

<style lang="less" scoped>
    .recommend{font-size: .375rem;width: 100%;
        h2{text-indent:.5rem;height: 1.5625rem;line-height: 1.5625rem;
            &:after{content: ">";color: #333;display: inline-block;}
        }
        ul{overflow: hidden;
            li{float: left;width: 33.33%;height: 5.078125rem;padding:10px;position: relative;
                img{width:100%;display: block}
                span{position: absolute;top: .15625rem;right: 0;font-size:.4rem;color: #c02020;
                    display: block;width: 100%;text-align: right;
                }
                p{height: 10%;text-indent:.15625rem}
            }
        }
    }
</style>

