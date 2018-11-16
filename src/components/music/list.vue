<template>
    <!-- 歌曲列表组件 -->
    <div class="list">
        <div class="header">
            <nav class="topnav">
                <span class="iconfont icon-houtui" @click="hideList"></span>
                <h4>歌曲列表</h4>
                <span class="iconfont icon-more"></span>
            </nav>
            <div class="mid">
                <p class="img">
                    <img :src="musicLoadList.listImg">
                </p>
                <p class="word">
                    <span>{{musicLoadList.listTitle}}</span>
                    <span>网易云音乐&gt</span>
                </p>
            </div>
            <ul>
                <li>
                    <i class="iconfont icon-pinglun1"></i>
                    <span>{{musicLoadList.listCommentCount}}</span>
                </li>
                <li>
                    <i class="iconfont icon-iconfontfenxiang"></i>
                    <span>{{musicLoadList.listShareCount}}</span>
                </li>
                <li>
                    <i class="iconfont icon-xiazai1"></i>
                    <span>下载</span>
                </li>
                <li>
                    <i class="iconfont icon-duoxuan"></i>
                    <span>多选</span>
                </li>
            </ul>
        </div>
        <div class="footer">
            <header>
                <i class="iconfont icon-start"></i>
                <span class="all">播放全部(共{{musicLoadList.songs.length}}首)</span>
                <span class="shoucang">+收藏({{musicLoadList.listSubscribedCount | collect }})</span>
            </header>
            <ul>
                <li v-for="(item,index) in musicLoadList.songs" @click="showPlayer(musicLoadList,index)">
                    <span class="idx">{{index + 1}}</span>
                    <p>
                        <span class="song">{{item.name}}</span>
                        <span class="singer">{{item.ar[0].name}}</span>
                    </p>
                    <span class="iconfont icon-more"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:["musicLoadList"],
        methods:{
            hideList(){
                this.$store.commit("showOrHideMusicList",{isShowList:false});
            },
            showPlayer(a,b){
                this.$store.commit("showPlayer",{a,b});
                //提交播放音乐请求
                this.$store.dispatch("audio",{index:b});
            }
        },
        filters:{
            collect(a){     //这里定义一个过滤收藏人数的过滤器
                if(a > 10000){
                    //评论数大于一万，返回单位万
                    a = a/10000;
                    return a.toString().slice(0,4) + '万'
                }else{
                    //小于一万则直接返回
                    return a;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    html,body{width: 100%;height: 100%;}
    .list{
        position: fixed;top: 0;left: 0;z-index: 1;width: 100%;height: 100%;background: #Fff;
        color: #fff;
        .header{
            width: 100%;height: 45%;background:#a4a2a3;
            .topnav{
                overflow: hidden;
                span{float: left;width: 1.09375rem;height: 1.09375rem;
                    line-height: 1.09375rem;text-align: center;font-size: .6rem;
                }
                h4{float: left;height: 1.09375rem;line-height: 1.09375rem;font-size: .5rem}
                .icon-more{float: right; }
            }
            .mid{width: 100%;height: 60%;padding:.46875rem .9375rem;
                .img{width: 45%;height:100%;img{
                    width: 100%;display: block;border-radius: .15625rem;
                    box-shadow: 0 0 .15625rem #fff;
                    }
                overflow: hidden;float: left;}
                .word{width: 55%;float: left;height: 100%;padding: .46875rem 0;
                    span{font-size: .4rem;display: block;height: 50%;margin-left: .15625rem;}
                }
            }
            ul{display: flex;height: 26%;
                li{flex:1;height: 100%;text-align: center;
                    i{display: block;width: 100%;height: 50%;font-size: .8rem}
                    span{display: block;width: 100%;height: 50%;font-size: .375rem}
                }
            }
        }
        .footer{
            width: 100%;height: 55%;overflow: scroll;
            background: #fff;border-top-left-radius:.3125rem;border-top-right-radius:.3125rem;
            margin-top: -0.46875rem;
            header{height: 1.25rem;border-bottom:1px solid #ccc;
                i,span{display: block;line-height: 1.25rem;float: left;text-align: center;}
                i{font-size: .7rem;width: 1rem;height: 1.25rem;margin-right: .325rem;color: #000;}
                span{font-size: .4rem}
                .all{color: #000}
                .shoucang{float: right;padding:0 .234375rem;background: #d73d33}
            }
            ul{color: #000;
                li{height: 1.5625rem;overflow: hidden;
                    .idx{font-size: .5625rem;width: 1.5625rem;text-align: center;line-height: 1.5625rem;color: #808080}
                    .idx,p{float: left;}
                    p{font-size: .5rem;height: 100%;max-width: 5.75rem;
                        span{height: 50%;display: block;padding-top: .15625rem}
                        .singer{font-size: .40625rem;color: #808080;padding: 0;}
                        .song{font-size: 0.4rem; overflow-x:scroll;}
                    }
                    .icon-more{float: right;font-size: .6rem;display: block;width: 1.5625rem;text-align: center;
                        height: 100%;padding-top:.390625rem;color: #808080;}
                }
            }
        }
    }
</style>

