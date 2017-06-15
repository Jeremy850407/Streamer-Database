$(document).ready(function(){
    $("#overview").attr("class" ,"active" );
    $("#overviewLink").attr("href" ,"javascript: void(0)" );
    preview();
    $(this).scrollTop(0);

    $(function () { 
	    $("[data-toggle='popover']").popover();
	});

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


});
var status;
var streamerData;
function preview(){
    var board = document.getElementById("board")
    streamerData = StreamerData;
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
            
            content += "class='img-responsive' style='width:100%' alt='Image'></a></div>";
            content += "<div class='panel-footer' id = '";
            content += streamerData[i]["名稱"] + "-footer'>";
            content += "</div>";
            
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
    $(function() {
		var $div = $(className),$cbox = $(className).find('input');

		$div.on('click', function(e) {
             if(e.target !== $cbox.get(0)) $cbox.prop('checked', !$cbox.prop('checked'));
            });
	});
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

function checkBoxCheck(){
    var values = [];
    var checkBoxList = document.forms['streamer'].elements['num'];
    for(var i = 0; i < checkBoxList.length; i++){
        if(checkBoxList[i].checked){
            values.push(checkBoxList[i].value);
        }
    }
    //alert('You selected: ' + values.join(', '));
    var url = "http://multitwitch.tv/";
    for(var i = 0;i < values.length; i++){
        url += streamerData[values[i]]["twitchID"] + "/";
    }
    //alert(url);
    $("#URL").attr("href" ,url );
    $("#multiTwitchURL").html(url);
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function checkBoxClear(){
    var checkBoxList = document.forms['streamer'].elements['num'];
    for(var i = 0; i < checkBoxList.length; i++){
        if(checkBoxList[i].checked){
            checkBoxList[i].checked = false;
        }
    }
}

