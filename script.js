var oUrl = 'https://evening-mountain-7853.herokuapp.com/streams';
var localUrl = 'https://localhost/streams';
var uUrl = function(){
    return localUrl + '/post_stream_info/';
};

var offset = 0;

var session = function(i, p) {
    if(!i||!p){
        return {}
    }

    return {
        'p': parseInt(i[0].getAttribute('aria-valuenow')) + offset,
        't': Math.floor(Date.now()),
        'song_title': p[0].href.split('/').pop()
    }
};
var postIt = function(infoElt, progressElt) {
    var context = session(infoElt, progressElt);

    if(context){
        $.ajax(
            {
                type: 'POST',
                url: uUrl(),
                data: context,
                success: function(data) {
                    console.log(data);
                },
                error: function(ts) { console.log('error'); }
            }
        );
    }
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
