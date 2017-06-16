var streamerData;
$(document).ready(function(){
    $("#intro").attr("class" ,"active" );
    $("#introLink").attr("href" ,"javascript: void(0)" );
    $(this).scrollTop(0);
    streamerData = StreamerData;
    var id = getID();
    player(streamerData[id]["twitchID"]);
    $("title").html(streamerData[id]["名稱"]);
    preview(id);
});
function getID(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var num = url.searchParams.get("q");
    if( num == null ){
        num = Math.floor(Math.random() * streamerData.length);
    }else{
        num = parseInt(num);
    }
    return num;
}


function player(twitchID){
    var options = {
          channel: twitchID,
          width: 720,
          height: 405,
        };
    var player = new Twitch.Player("twitch-stream", options);
    player.setVolume(0.5);
}

function preview(num){
    document.getElementById("name").innerHTML = streamerData[num]["名稱"];

    var intro;
    intro = streamerData[num]["簡介"];
    document.getElementById("profile").innerHTML += intro;
    document.getElementById("pic").src = "info/" + streamerData[num]["名稱"] + "_profile.png";
    if(num != 11 || num != 20  || num != 22){
        var fanPage = "<iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F";
        fanPage += streamerData[num]["fbID"];
        fanPage += "&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId' width='340' height='500' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe>";
        document.getElementById("fanPage").innerHTML = fanPage;
    }else{
        document.getElementById("profile").className += " col-lg-offset-3";
    }

}
