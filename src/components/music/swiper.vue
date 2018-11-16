<template>
    <!-- 音乐首页的轮播图组件 -->
    <div class="swiper">
        <swiper :options="swiperOption">
            <!-- 轮播图 -->
            <swiper-slide v-for="(item,index) in swiperArr" :key="index">
                <img :src="item.imgSrc">
            </swiper-slide>
            <!-- 控制器小圆点 -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        props:["swiperArr"],
        data(){
            return{
                swiperOption: {
                    autoplay:true,
                    loop:true,
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .swiper{
        width: 100%;height:4.6875rem;
        img{width: 100%;display: block;}
    }
</style>

