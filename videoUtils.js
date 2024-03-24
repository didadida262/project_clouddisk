const ffmpeg = require('ffmpeg');

const process = ffmpeg('E:\\RESP\\cate_music_fire\\测试视频.mp4')
process.then((video) => {
    // // console.log('video>>>', video)
    video.setVideoFormat('avi')
})


// 转换视频为mp3
const transferToMp3 = (video) => {
    const mp3 = video.fnExtractSoundToMP3('E:\\RESP\\cate_music_fire\\我尼玛.mp3')
    return mp3
}