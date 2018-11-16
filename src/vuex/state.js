export default{
    isShowList:false,   //歌曲列表组件的状态，默认不显示
    musicLoadList:[],       //存放等待播放的歌曲列表，不列进正式的播放列表
    isShowPlayer:false,     //播放器的显示，默认不显示
    autoPlayList:[],        //存放需要播放的歌曲信息
    index:0,                //正在播放的歌曲下标
    listIdx:0,              //存放播放的歌单的下标信息
    url:null,               //歌曲链接
}