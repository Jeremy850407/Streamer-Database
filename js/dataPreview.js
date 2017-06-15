$(document).ready(function(){
    $("#overview").attr("class" ,"active" );
    $("#overviewLink").attr("href" ,"javascript: void(0)" );
    preview();
    $(this).scrollTop(0);
});
var status;
function preview(){
    var board = document.getElementById("board")
    var streamerData = StreamerData;
    var n = streamerData.length;
    var content = "";
    content += "<form name = 'streamer'>";
    for(var i = 0;i < n;i++){
        if(i < n){
            if(i % 3 == 0){
                content += " <div class='container'><div class='row'>";
            }
            content += "<div class='col-sm-4'><div class='panel panel-primary'><div class='panel-heading'>";
            content += streamerData[i]["名稱"];
            content += "</div><div class='panel-body'>";
            content += "<a href = 'intro.html?q=" + i + "' target = '_blank'>";
            //https://placehold.it/150x80?text=IMAGE
            //content += "href = 'https://www.twitch.tv/" + streamerData[i]["twitchID"] + "' ";
            content += "<img src='info/" + streamerData[i]["名稱"] + "_twitch.png' ";
            
            content += "class='img-responsive' style='width:100%' alt='Image'></a></div><div class='panel-footer' id = '";
            content += streamerData[i]["名稱"] + "-footer";
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
    content += "</form>"
    board.innerHTML = content;
    
    for(var i = 0;i < n;i++){
        checkBox(streamerData[i], i);
    }

    for(var i = 0;i < n;i++){
        CheckOnlineStatus(streamerData[i]);
    }
}

function checkBox(data, num){
    var className = "#" + data["名稱"] + "-footer";
    $(className).append("<input type='checkbox' name='num' value='"+ num +"'>")
}

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
            var className = "#" + data["名稱"] + "-footer";
            if (channel["stream"] != null)
            {
                $(className).addClass("online");
                $(className).append("開台中");
            } else {
               $(className).addClass("offline");
                $(className).append("關台中");
            }
        }
    });
}
