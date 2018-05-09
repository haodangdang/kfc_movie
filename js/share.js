!(function () {
    var kfcSahre = {
        init: function () {
            var queryArr = location.search && location.search.replace('?','').split('&');
            var query = {}
            if(queryArr.length > 0){
                for(var j = 0; j < queryArr.length; j++){
                    var key = queryArr[j].split('=')[0]
                    var val = queryArr[j].split('=')[1]
                    query[key] = val
                }
                if(query.name && query.cnt){
                    this.toParent(query)
                }else{
                    this.toNormal()
                }

            }else{
                this.toNormal()
            }
            this.bindEvent();
        },
        bindEvent: function () {
            var self = this;
            $('.close_share').on('click', function () {
                self.toNormal()
            });
        },
        toParent: function (query) {
            var name = query.name;
            var cnt = query.cnt;
            $('.xin_title img').attr('src', 'img/p5_title_' + cnt + '.png');
            $('.xin img').attr('src', 'img/p5_xin_' + cnt + '.png');
            $('.name').html(decodeURIComponent(name));
            if(query.isappinstalled){
                $('.share_wrap').addClass('hidden')
            }
        },
        toNormal: function () {
            var pathArr = window.location.pathname.split('/');
            pathArr.shift();
            pathArr.pop()
            window.location.href = window.location.origin + '/' + pathArr.join('/') + '/index.html'
        }
    }
    kfcSahre.init()
})()