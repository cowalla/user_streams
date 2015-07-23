var oUrl = 'https://evening-mountain-7853.herokuapp.com/streams/';
var localUrl = 'https://localhost:4000/streams/';
var uUrl = function(user_key){
    return oUrl + user_key + '/stream_info_user/';
};

var session = function(i, p) {
    console.log(i, p);
    return {
        'current_position': parseInt(i[0].getAttribute('aria-valuenow')),
        'time': Math.floor(Date.now()),
        'url': p[0].href.split('/').pop()
    }
};
var postIt = function(infoElt, progressElt) {
    var context = JSON.stringify(session(infoElt, progressElt));
    console.log(context);
    $.ajax(
        {
            type: 'POST',
            url: uUrl(1),
            data: context,
            success: function(data) {
            }
        }
    );
};

$(document).ready(function(){
    var func = function(){
        var soundProgress = $('.playbackTimeline__progressWrapper');
        var soundInfo = $('.playbackSoundBadge__title')
        postIt(soundProgress, soundInfo)
    };

    setInterval(func, 1000);
}
);
