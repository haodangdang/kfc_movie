!(function () {
    var kfc = {
        hasLogin: false,
        cnt: null,
        name: null,
        init: function () {
            this.getLogin()
            this.bindEvent()
        },
        bindEvent: function () {
            var self = this;
            $('.ok_btn').on('click', function () {
                self.showPage(2)
                setTimeout(function () {
                    self.showPage(3)
                },11000)
            });
            $('.submit_btn').on('click', function () {
                var account = $('.ipt_name').val(),
                    id = $('.ipt_id').val();
                if(!account || account == ''){
                    self.showErr('请输入正确的姓名')
                    return
                }
                if(!id || id == ''){
                    self.showErr('请输入身份证后六位')
                    return
                }
                self.login(account, id)
            });
            $('.get_btn').on('click', function () {
                var cnt = $(this).attr('cnt')
                self.getList(cnt)
            });
            $('.chakan_btn').on('click', function () {
                self.showMa()
            });
            $('.ma_close').on('click', function () {
                self.hiddenMa()
            });
            $('.copy_btn').on('click', function () {
                self.copy()
            });
            $('.share_btn').on('click', function () {
                self.share()
            });

        },
        showPage: function (index) {
            $('.page').addClass('hidden');
            $('.p' + index).removeClass('hidden')
        },
        showErr: function (txt) {
            $('.err').html(txt)
            $('.err').addClass('show')
            setTimeout(function() {
                $('.err').removeClass('show')
            },2000)
        },
        getLogin: function () {
            var self = this;
            var url = 'http://kfc.it2048.cn/v0/get-login-info'
            $.ajax({
                url: url,
                type: 'get',
                method: 'get',
                dataType: 'json',
                success: function (res) {
                    if(res.code === 0){
                        if(res.data.movie_ids != ''){
                            self.creatMa(res.data)
                            self.showPage(5)
                        }else{
                            self.showPage(4)
                        }
                    }else{
                        self.showPage(1)
                    }
                },
                error: function (res) {
                    self.showErr(res.msg)
                }
            });
        },
        login: function (account, id) {
            var self = this;
            var url = 'http://kfc.it2048.cn/v0/login';
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    account: account,
                    id_card: id
                },
                dataType: 'json',
                success: function (res) {
                    if(res.code == 0){
                        if(res.data.movie_ids != ''){
                            self.creatMa(res.data)
                            self.showPage(5)
                        }else{
                            self.showPage(4)
                        }
                    }else{
                        self.showErr(res.msg)
                    }
                },
                error: function (res) {
                    self.showErr(res.msg)
                }
            });
        },
        getList: function (cnt) {
            var self = this;
            // var url = 'http://kfc.it2048.cn/v0/get-tickets';
            // $.ajax({
            //     url: url,
            //     type: 'POST',
            //     data: {
            //         cnt: cnt
            //     },
            //     dataType: 'json',
            //     success: function (res) {
            //         if(res.code == 0){
            //             self.creatMa(res.data);
            //             self.showPage(5);
            //         }else{
            //             self.showErr(res.msg)
            //         }
            //     },
            //     error: function (res) {
            //         self.showErr(res.msg)
            //     }
            // });
        },
        creatMa: function (data) {
            var self = this;
            var ids = data.movie_ids.split(',');
            self.name = data.name;
            var id_length = ids.length;
            self.cnt = id_length;
            if(id_length > 0){
                var maDom = '';
                for(var i = 0; i < id_length; i++){
                    maDom = maDom + '<p class="ma_item"><span class="ma_lbl">兑换码' + (i + 1) + '</span><span class="ma_txt">' + ids[i] + '</span></p>'
                }
                $('.ma_list').html(maDom);
                $('.xin_title img').attr('src', 'img/p5_title_' + id_length + '.png');
                $('.xin img').attr('src', 'img/p5_xin_' + id_length + '.png');
                $('.name').html(self.name);
                $('.share_btn').attr('href', 'share.html?name=' + self.name + '&cnt=' + self.cnt)
            }
        },
        showMa: function () {
            $('.ma_wrap').removeClass('hidden')
        },
        hiddenMa: function () {
            $('.ma_wrap').addClass('hidden')
        },
        copy: function () {
            var range = document.createRange();
            range.selectNode(document.getElementById('ma_list'));
            var selection = window.getSelection();
            if(selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            this.showErr("已复制好，可贴粘");
        },
        toParent: function (query) {
            var name = query.name;
            var cnt = query.cnt;
            $('.xin_title img').attr('src', 'img/p5_title_' + cnt + '.png');
            $('.xin img').attr('src', 'img/p5_xin_' + cnt + '.png');
            $('.name').html(decodeURIComponent(name));
            $('.chakan_btn').addClass('hidden');
            $('.share_btn').addClass('hidden');
            this.showPage(5);
        },
        share: function () {
            var origin = window.location.origin;
            var pathname = window.location.pathname;
            // window.location.href =
        },
        closeShare: function () {
            var self = this;
            var state = {
                title: '',
                url: window.location.href
            };
            history.pushState(state, '' ,'index.html');
            $('.share_wrap').addClass('hidden')
        }
    }
    kfc.init()
})()