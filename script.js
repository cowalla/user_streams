var oUrl = 'https://evening-mountain-7853.herokuapp.com/streams';
var localUrl = 'https://localhost:8000/streams/users';
var uUrl = function(){
    return oUrl + '/post_stream_info/';
};

var session = function(i, p) {
    if(!i||!p){
        return {}
    }

    return {
        'p': parseInt(i[0].getAttribute('aria-valuenow')),
        't': Math.floor(Date.now()),
        'song_title': p[0].href.split('/').pop()
    }
};
var postIt = function(infoElt, progressElt) {
    var context = session(infoElt, progressElt);
    console.log(context);
    if(context){
        $.ajax(
            {
                type: 'POST',
                url: uUrl(),
                data: context,
                success: function(data) {
                    console.log(data);
                }
            }
        );
    }
};

var getToken = function() {
    $.ajax(
        {
            type: 'GET',
            url: 'https://localhost:8000/streams/token/',
            success: function(data) {
                window.stored_cookie = JSON.parse(data);
            }
        }
    );
};

$(document).ready(function(){
    var func = function(){
        var soundProgress = $('.playbackTimeline__progressWrapper');
        var soundInfo = $('.playbackSoundBadge__title');
        postIt(soundProgress, soundInfo)
    };

    setInterval(func, 4000);
}
);
