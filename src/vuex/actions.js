import Vue from 'vue';
const api = 'http://127.0.0.1:8080/api';
export default{
    getMusicList({commit,state},{item,index}){
        //把传过来的index处理一下，作为标识歌单
        var listIndex = 'tjgd' + index;
        //先根据专辑的id请求专辑里面的歌曲列表，获得res.data.playlist.trackIds，这个就是歌曲的id
        let temp = [];
        var str = '';
        Vue.axios.get(`${api}/playlist/detail?id=${item.id}`).then((res)=>{
            //临时存放歌曲id到数组
            temp = res.data.playlist.trackIds;
            //取得歌单的图片Url与标题、评论次数、分享次数、收藏次数
            var listImg = res.data.playlist.coverImgUrl;
            var listTitle = res.data.playlist.name;
            var listCommentCount = res.data.playlist.commentCount;
            var listShareCount = res.data.playlist.shareCount;
            var listSubscribedCount = res.data.playlist.subscribedCount;
            if(res.request.statusText == 'OK'){     //当响应为OK的时候，遍历取得歌曲id串
                for(var i=0;i<temp.length;i++){
                    str = str + temp[i].id + ',';
                }
                str = str.substr(0,str.length-1);   //去除最后一个逗号
                //根据id串请求歌曲的信息
                Vue.axios(`${api}/song/detail?ids=${str}`).then((res)=>{
                    commit("getMusicList",{
                        songs:res.data.songs,
                        listImg,
                        listTitle,
                        listCommentCount,
                        listShareCount,
                        listSubscribedCount,
                        listIndex
                    });
                    commit("showOrHideMusicList",{isShowList:true});
                })
            }
        });   
    },
    audio({commit,state},{index}){
        var urlid = state.musicState.musicLoadList.songs[index].id;
        Vue.axios.get(`${api}/song/url?id=${urlid}`).then((res)=>{
            var url = res.data.data[0].url;
            commit("changeUrl",{url});
        })
    }
}