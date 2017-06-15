$(document).ready(function(){
    $("#home").css("color", "#fff");
    $("#home").css("fontSize", "22px");
    $("#home").css("background-color", "#080808");
    $("#home").attr("href" ,"javascript: void(0)" );
    
    $(this).scrollTop(0);
    carouselChange(5);
});

function carouselChange(num){
    var streamerData = StreamerData;
    var ran = new Array();
    for(var i = 0; i < num; i++){
        ran.push( streamerData.splice(Math.floor(Math.random() * streamerData.length),1)[0]);
    }
    for(var i = 1; i <= num; i++){
        document.getElementById("pic" + i).src = "info/" + ran[i-1]["名稱"] + ".png";
        document.getElementById("name" + i).innerHTML = ran[i-1]["名稱"];
        document.getElementById("profile" + i).href = "intro.html?q=" + (ran[i-1]["id"] - 1);
    }
}
/*
function carousel(num){
    var board = document.getElementById("myCarousel");
    var streamerData = StreamerData;
    var content = "";
    var ran = new Array();
    for(var i = 0; i < num; i++){
        ran.push( streamerData.splice(Math.floor(Math.random() * streamerData.length),1)[0]);
    }


    content += "<ol class='carousel-indicators'>";
    for(var i = 0; i < num; i++){
        if(i == 0){
            content += "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
        }else{
            content += "<li data-target='#myCarousel' data-slide-to='" + i +"'></li>";
        }
    }
    content += "</ol>";
    content += "<div class='carousel-inner' role='listbox'>";
    for(var i = 0; i < num; i++){
        if(i == 0){
            content += "<div class='item active'>";
        }else{
            content += "<div class='item'>";
        }
        content += "<img src='info/";
        //pic
        content += ran[i]["名稱"] + ".png";
        content += "' alt='First slide'>\
            <div class='container'>\
            <div class='carousel-caption'><h1>";
        //name
        content += ran[i]["名稱"];
        content += "</h1><p><a class='btn btn-lg btn-primary' href='";
        //link
        content += "intro.html?q=" + (ran[i]["id"] - 1);
        content += "' role='button'>了解更多</a></p></div></div></div>";
    }
    content += "<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>\
        <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>\
        <span class='sr-only'>Previous</span>\
        </a>\
        <a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>\
        <span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>\
        <span class='sr-only'>Next</span>\
        </a>\
        </div>";
    board.innerHTML += content;
    console.log(content);
}

var status;
function previewSome(n){
    var board = document.getElementById("board");
    var streamerData = StreamerData;
    var content = "";
    var ran = new Array();
    var i;
    for(i = 0;i < n;i++){
        ran.push( streamerData.splice(Math.floor(Math.random() * streamerData.length),1)[0]);
    }
    console.log(ran);
    
    for(i = 0;i < n;i++){
        if(i < n){
            if(i % 3 == 0){
                content += " <div class='container'><div class='row'>";
            }
            content += "<div class='col-sm-4'><div class='panel panel-primary'><div class='panel-heading'>";
            content += ran[i]["名稱"];
            content += "</div><div class='panel-body'>";
            content += "<a href = 'intro.html?q=" + i + "' target = '_blank'>";
            //https://placehold.it/150x80?text=IMAGE
            //content += "href = 'https://www.twitch.tv/" + streamerData[i]["twitchID"] + "' ";
            content += "<img src='info/" + ran[i]["名稱"] + "_twitch.png' ";
            
            content += "class='img-responsive' style='width:100%' alt='Image'></a></div><div class='panel-footer' id = '";
            content += ran[i]["名稱"] + " footer";
            content += "'></div>";
            
            //img link
            //board.innerHTML += "";
            //board.innerHTML += "";
            //online status
            content += "</div></div>";
            
            if(i % 3 == 2 || i == (n - 1)){
                content += "</div></div><br>";
            }
            
            //console.log(streamerData[i]["名稱"]);
        }
    }
    board.innerHTML = content;
    for(var i = 0;i < 6;i++){
        CheckOnlineStatus(ran[i]);
    }
    
}

$(document).ready(function(){
    $(this).scrollTop(0);
});

function CheckOnlineStatus(data){
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/" + data["twitchID"],
        dataType: 'json',
        //async: false,
        headers: {
        'Client-ID': "pkhmmzu8hpg98kvatbpog2eo89zyk6"
        },
        success: function(channel)
        {
            if (channel["stream"] != null)
            {
                document.getElementById(data["名稱"] + " footer").className += " online";
                document.getElementById(data["名稱"] + " footer").innerHTML = "開台中";
            } else {
                document.getElementById(data["名稱"] + " footer").className += " offline";
                document.getElementById(data["名稱"] + " footer").innerHTML = "關台中";
            }
        }
    });
}
*/
