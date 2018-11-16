<template>
    <!-- 播放器页面 -->
    <div class="player">
        <header class="header">
            <span class="iconfont icon-houtui" @click="hidePlayer"></span>
            <p>
                <span>{{musicInfo[index].name}}</span>
                <span class="singer">{{musicInfo[index].ar[0].name}}</span>
            </p>
            <span class="iconfont icon-iconfontfenxiang"></span>
        </header>
        <audio :src="url" autoplay @timeupdate="running"></audio>
        <div class="main">
            <div class="cd" :class="isPlay ? 'cur' :''">
                <img :src="musicInfo[index].al.picUrl">
            </div>
        </div>
        <footer class="footer">
            <ul class="list">
                <li class="iconfont icon-xin"></li>
                <li class="iconfont icon-xiazai1"></li>
                <li class="iconfont icon-tuijian"></li>
                <li class="iconfont icon-pinglun"></li>
                <li class="iconfont icon-more"></li>
            </ul>
            <div class="progressBar">
                <p class="start">{{currentTime | timeSwitch}}</p>
                <p class="range">
                    <span class="duration"  @click="speedMusic($event)">
                        <span class="currentTime" :style="{width:currentTime/duration * 100 +'%'}"></span>
                    </span>
                </p>
                <p class="end">{{duration | timeSwitch}}</p>
            </div>
            <ul class="play">
                <li class="iconfont icon-suiji-copy-copy"
                    :class="[
                        {'icon-shunxu' : playState == 'all'},
                        {'icon-suiji-copy-copy' : playState == 'random'},
                        {'icon-icon-1' : playState == 'once'}
                    ]" 
                    @click="changePlayState">
                </li>
                <li class="iconfont icon-shangyishou" @click="goPrev"></li>
                <li class="iconfont" 
                    :class="isPlay ? 'icon-paste':'icon-start'"
                    @click="pause_play">
                </li>
                <li class="iconfont icon-xiayishou" @click="goNext"></li>
                <li class="iconfont icon-icon-"></li>
            </ul>
        </footer>
    </div>
</template>

<script>
    export default {
        props:["autoPlayList","index","listIdx","url"],
        data(){
            return {
                isPlay:true,    //表示播放状态
                duration:0,     //总时长
                currentTime:0,  //当前时长
                isAddClass:true,    //控制何时添加类
                playState:"all",    //all表示循环播放,once表示单曲循环,random表示随机
            }
        },
        methods:{
            hidePlayer(){
                this.$store.commit("hidePlayer");
            },
            //播放音乐中一直执行的方法
            running(){
                this.duration = $("audio")[0].duration;
                this.currentTime = $("audio")[0].currentTime;
                if($("audio")[0].pause && this.isAddClass){
                    //如果音乐是暂停的，则移除类
                    this.isPlay = false;
                    this.isAddClass = false;
                }else{
                    //否则就播放，加类
                    this.isPlay = true;
                };
                if($("audio")[0].ended){
                    var index = this.index;
                    this.autoplay(index);
                }
            },
            speedMusic(e){  //快进
                $("audio")[0].currentTime = (e.offsetX / $(".duration").width()) * $("audio")[0].duration;
            },
            pause_play(){
                this.isPlay = !this.isPlay;
                if(this.isPlay != true){
                    $("audio")[0].pause();
                    this.isAddClass = true;
                }else{
                    $("audio")[0].play();
                }
            },
            changePlayState(){
                if(this.playState == 'all'){
                    this.playState = 'random';
                }else if(this.playState == 'random'){
                    this.playState = 'once';
                }else if(this.playState == 'once'){
                    this.playState = 'all';
                }
            },
            changeMusic(index){
                this.$store.dispatch("audio",{index});
                this.$store.commit("changeIndex",{index});
            },
            goPrev(){   //上一首 
                if(this.playState == 'all' || this.playState == 'once'){
                    if(this.index <= 0 ){
                        var index = this.autoPlayList.length - 1;
                        this.changeMusic(index);
                    }else{
                        var index = this.index - 1;
                        this.changeMusic(index);
                    }
                }else if(this.playState == 'random'){
                    var index = ~~(Math.random() * this.autoPlayList.length)
                    this.changeMusic(index);
                }
            },
            goNext(){   //下一首
                if(this.playState == 'all' || this.playState == 'once'){
                    if(this.index >= this.autoPlayList.length - 1){
                        var index = 0;
                        this.changeMusic(index);
                    }else{
                        var index = this.index + 1;
                        this.changeMusic(index);
                    }
                }else if(this.playState == 'random'){
                    var index = ~~(Math.random() * this.autoPlayList.length)
                    this.changeMusic(index);
                }
            },
            autoplay(index){    //歌曲播放结束自动切下一曲
                var index = index;
                if(this.playState == 'all'){
                    if(index <= this.autoPlayList.length -1){
                        index = index + 1;
                    }else{
                        index = 0;
                    }
                }else if(this.playState == 'once'){
                    index = index;
                    $("audio")[0].load();
                }else if(this.playState == 'random'){
                    index = ~~(Math.random() * this.autoPlayList.length)
                }
                this.changeMusic(index);
            }
        },
        computed:{
            musicInfo(){
                return this.autoPlayList;
            }
        },
        filters:{
            timeSwitch(s){
                var t;
                if(s > -1){
                    var min = Math.floor(s/60) % 60;
                    var sec = s % 60;
                    if(min < 10){t += "0";}
                    t = min + ":";
                    if(sec < 10){t += "0";}
                    t += ~~(sec);
                }
                return t;
            }
        }
    };
</script>
<style lang="less" scoped>
    .player{position: fixed;top: 0;left: 0;background: #fddcab;z-index: 2;width: 100%;height: 100%;
        .header{height: 1.5625rem;color:#aaa;border-bottom:1px solid #ccc;
            .icon-houtui,p{float: left;}
            .icon-iconfontfenxiang{float: right;}
            .icon-houtui,.icon-iconfontfenxiang{width: 1.5625rem;height: 1.5625rem;
                font-size: 1rem;text-align: center;line-height: 1.5625rem;
            }
            p{font-size: .5rem;padding: .15625rem .3125rem;max-width: 6.875rem;
                span{display: block}
                .singer{font-size: .375rem;color: #333}
            }
        }
        .main{height: 10.9375rem;position: relative;
            .cd{position: absolute;top: 50%;left: 50%;width: 5.46875rem;height: 5.46875rem;
                transform: translate(-50%,-50%);
                img{width: 100%;display: block;border-radius: 50%;height: 100%;}
                transform-origin: 50% 50%;animation: rotateCd 8s infinite linear;
                animation-play-state: paused;
                &.cur{ animation-play-state: running }
            }
        }
        .footer{height: 5.25rem;
            .list{display: flex;
                li{flex:1;text-align: center;height: 1.5625rem;line-height: 1.5625rem;font-size:.7rem;}
            }
            .progressBar{
                height: 1.5625rem;font-size:.375rem;
                .start,.end{width: 1.5625rem;text-align: center;line-height: 1.5625rem;float: left;}
                .end{float: right;}
                .range{float: left;width: 6.875rem;height: 1.5625rem;
                    .duration{width: 85%;height: .0625rem;background: #fff;
                        margin: .76rem .5rem;display: block;position: relative;
                        .currentTime{
                            position: absolute;top: 0;left: 0;width: 0%;height: 100%;
                            background: green;
                        }
                    }
                }
            }
            .play{display: flex;
                li{flex: 1;height: 2.125rem;line-height: 2.125rem;text-align: center;font-size: .8rem;}
                .icon-start,.icon-paste{font-size: 1.5rem;}
            }
        }
        @keyframes rotateCd {
            from{transform:translate(-50%,-50%) rotate(0deg)}
            to{transform:translate(-50%,-50%) rotate(360deg)}
        }
    }
</style>



