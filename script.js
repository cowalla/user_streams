var oUrl = 'https://evening-mountain-7853.herokuapp.com/streams/';
var localUrl = 'https://localhost:4000/streams/';
var uUrl = function(user_key){
    return localUrl + user_key + '/stream_info_user';
};

var session = function(i, p) {
    return {
        'current_position': parseInt(i.getAttribute('aria-valuenow')),
        'time': Math.floor(Date.now()),
        'url': p.href
    }
};
var postIt = function(infoElt, progressElt) {
    $.ajax(
        {
            type: 'POST',
            url: uUrl(1),
            data: session(infoElt, progressElt),
            success: function(data) {
                console.log(data);
            }
        }
    );
};

$(document).ready(function(){
    var func = function(){
        var soundProgress = $('.playbackTimeline__progressWrapper')[0];
        var soundInfo = $('.playbackSoundBadge__avatar')[0];
        postIt(soundInfo, soundProgress)
    };

    setInterval(func, 1000);
}
);
