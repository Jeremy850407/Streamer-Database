$(document).ready(function(){
    $("#search").attr("class" ,"active" );
    $("#searchLink").attr("href" ,"javascript: void(0)" );
    $(this).scrollTop(0);
    //search("lng");
    
   
});
var streamerData;
function search(obj,e){
    streamerData = StreamerData;
    var keyword = obj.value;
    keyword = keyword.toLowerCase();
    var values = [];
    var board = document.getElementById("board");
    var content;
    if(e.keyCode == 13){

        //console.log(keyword);
        for(var i = 0;i < streamerData.length; i++){
            if(streamerData[i]["名稱"].toLowerCase().search(keyword) != -1){
                values.push(streamerData[i]);
                continue;
            }else if(streamerData[i]["twitchID"].toLowerCase().search(keyword) != -1){
                values.push(streamerData[i]);
                continue;
            }else if(streamerData[i]["fbID"].toLowerCase().search(keyword) != -1){
                values.push(streamerData[i]);
                continue;
            }else if(streamerData[i]["簡介"].toLowerCase().search(keyword) != -1){
                values.push(streamerData[i]);
                continue;
            }
        }
        //console.log(values);
        content = "";
        if(values.length == 1){
            for(var i = 0;i < values.length; i++){
                content += "<div class = 'row'><div class='col-md-4 col-md-offset-4'>";
                content += "<div class='panel panel-primary'>";
                content += "<div class='panel-heading'>";
                content += values[i]["名稱"];
                content += "</div><div class='panel-body'>";
                content += "<a href='intro.html?q=" + (values[i]["id"] -  1);
                content += "' target='_blank'><img src='info/";
                content += values[i]["名稱"];
                content += "_twitch.png' class='img-responsive' style='width:100%' alt='Image'></a></div>";
                content += "<div class='panel-footer' id = '";
                content += values[i]["名稱"] + "-footer'>";
                content += "</div></div></div></div></div>";
            }
        }else if(values.length == 0){
            content = "<div style='\
                text-align: center;\
                font-weight: 700;\
                font-size: 50px;\
                '>查無資料\
                </div>";
        }else{
            for(var i = 0;i < values.length;i++){
                if(i < values.length){
                    if(i % 3 == 0){
                        content += " <div class='container'><div class='row'>";
                    }
                    content += "<div class='col-sm-4'><div class='panel panel-primary'><div class='panel-heading'>";
                    content += values[i]["名稱"];
                    content += "</div><div class='panel-body'>";
                    content += "<a href = 'intro.html?q=" + i + "' target = '_blank'>";
                    
                    content += "<img src='info/" + values[i]["名稱"] + "_twitch.png' ";
                    
                    content += "class='img-responsive' style='width:100%' alt='Image'></a></div>";
                    content += "<div class='panel-footer' id = '";
                    content += values[i]["名稱"] + "-footer'>";
                    content += "</div>";
                    
                    
                    content += "</div></div>";
                    
                    if(i % 3 == 2 || i == (values.length - 1)){
                        content += "</div></div><br>";
                    }
                    
                }
            }
        }
        board.innerHTML = content;
        
        for(var i = 0;i < values.length; i++){
            CheckOnlineStatus(values[i]);
        }
        
        
    }
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
