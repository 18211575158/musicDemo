export default{
    showOrHideMusicList(state,payload){
        state.musicState.isShowList = payload.isShowList;
    },
    getMusicList(state,payload){
        state.musicState.musicLoadList = payload;
        //console.log(state.musicState.musicLoadList)
    },
    showPlayer(state,payload){
        //console.log(payload)
        state.musicState.isShowPlayer = true;
        state.musicState.autoPlayList = payload.a.songs;
        state.musicState.index = payload.b;
        state.musicState.listIdx = payload.a.listIndex;
        //console.log(state.musicState)
    },
    hidePlayer(state,payload){
        state.musicState.isShowPlayer = false;
    },
    changeUrl(state,payload){
        state.musicState.url = payload.url;
    },
    changeIndex(state,payload){
        state.musicState.index = payload.index;
    }
}