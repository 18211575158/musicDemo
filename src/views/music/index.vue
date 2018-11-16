<template>
    <div class="index" v-height='70'>
        <swiper :swiperArr="swiperArr"></swiper>
        <navList :listArr="listArr"></navList>
        <recommendSong></recommendSong>
    </div>
</template>

<script>
    import swiper from "../../components/music/swiper.vue";
    import navList from "../../components/music/nav.vue";
    import recommendSong from "../../components/music/recommendSong.vue"; 

    export default {
        components:{
            swiper,
            navList,
            recommendSong
        },
        data(){
            return{
                swiperArr:[
                    {imgSrc:"../../../static/img/banner1.jpg"},
                    {imgSrc:"../../../static/img/banner2.jpg"},
                    {imgSrc:"../../../static/img/banner3.jpg"},
                    {imgSrc:"../../../static/img/banner4.jpg"},
                ],
                listArr:[
                    {icon:"icon-icon--",name:"私人FM"},
                    {icon:"icon-tuijian",name:"每日推荐"},
                    {icon:"icon-icon-",name:"歌单"},
                    {icon:"icon-paixing",name:"排行榜"},
                ]
            }
        },
    }
</script>
<style lang="less" scoped>
    .index{height: 100%;overflow:scroll;}
</style>



