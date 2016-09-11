var oUrl = 'https://localhost/streams';
var localUrl = 'https://localhost/streams';
var SOUNDCLOUD_URL = 'soundcloud.com';
var uUrl = function(){
    return oUrl + '/post_stream_info/';
};

var offset = 0;

var onSoundCloud = function(){return window.location.hostname == SOUNDCLOUD_URL};

var session = function(i, p) {
    if(!onSoundCloud() || !i[0] || !p[0]) {
        return false
    }

    return {
        'p': parseInt(i[0].getAttribute('aria-valuenow')) + offset,
        't': Math.floor(Date.now()),
        'title': p[0].href.split('/').pop(),
        'url': p[0].href
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
                error: function(XMLHttpRequest, textStatus, errorThrown) { console.log(XMLHttpRequest.responseText) }
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
    if(onSoundCloud()){
        console.log('STARTING MASTER HEARTBEAT');
        setInterval(func, 3000);
    }
}
);
