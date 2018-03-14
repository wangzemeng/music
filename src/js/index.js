var $ = window.Zepto;
var root = window.player;
// var index = 0;
var $scope = $(document.body)
var songList;
var controlmanager;
var audiomanager = new root.audioManager ();
var proccessor = root.proccess;
var playList = root.playList;

function bindTouch () {
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart",function(){
        proccessor.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        proccessor.upDate(percent);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        proccessor.upDate(percent);
        var index = controlmanager.index;
        var curDuration = songList[index].duration;
        var curTime = curDuration * percent;
        audiomanager.jumpToPlay(curTime);
        $scope.find(".play-btn").addClass("playing")
    })
}
function bindClick(){
    $scope.on("click",".play-btn",function (){
        if(audiomanager.status == "play"){
            audiomanager.pause();
            proccessor.stop();
        }else{
            audiomanager.play();
            proccessor.start();
        }
        $(this).toggleClass("playing");
    })
    $scope.find(".list-btn").on("click",function(){
        playList.show(controlmanager);
    })
    $scope.find(".next-btn").on("click",function(){
        // if(index == songList.length - 1){
        //     index = 0;
        // }else{
        //     index++;
        // }
        // index++;
        // root.render(songList[index])
        var index = controlmanager.next();
        $scope.trigger("player:change",index)
    })
    $scope.find(".prev-btn").on("click",function(){
        // if(index == 0){
        //     index = 0;
        // }else{
        //     index--;
        // }
        // index++;
        // root.render(songList[index])
        var index = controlmanager.prev();
        $scope.trigger("player:change",index)
        
    })
}
$scope.on("player:change",function(event,index,flag){
    root.render(songList[index]);
    audiomanager.changeSource(songList[index].audio);
    if(audiomanager.status == "play" || flag){
        proccessor.start();
        audiomanager.play();
    }
    proccessor.renderAllTime(songList[index].duration);
    proccessor.upDate(0)
})



function getData(url){
    $.ajax({
        type : "GET",
        url : url,
        success : successFn
    })
}
function successFn(data){
    songList = data;
    $scope.trigger("player:change",0)
    bindClick();
    bindTouch();
    playList.renderPlayList(data);
    controlmanager = new root.controlManager(data.length);
}
getData("/mock/data.json")
