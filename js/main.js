!(function () {
    var kfc = {
        hasLogin: false,
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
                        self.showList()
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
                            self.creatMa(res.data.movie_ids.split(','))
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
            var url = 'http://kfc.it2048.cn/v0/get-tickets';
            // $.ajax({
            //     url: url,
            //     type: 'POST',
            //     data: {
            //         cnt: cnt
            //     },
            //     dataType: 'json',
            //     success: function (res) {
            //         if(res.code == 0){
            //             self.creatMa(res.data.movie_ids.split(','))
            //             self.showPage(5)
            //         }else{
            //             self.showErr(res.msg)
            //         }
            //     },
            //     error: function (res) {
            //         self.showErr(res.msg)
            //     }
            // });
            var res = {
                "code": 0,
                "msg": "成功",
                "data": {
                    "movie_ids": "12345678,abcd1234"
                }
            }

            self.creatMa(res.data.movie_ids.split(','))
            self.showPage(5)
        },
        creatMa: function (ids) {
            if(ids.length > 0){
                var maDom = ''
                var maStr = ''
                for(var i = 0; i < ids.length; i++){
                    maDom = maDom + '<div class="ma_item"><div class="ma_lbl">兑换码' + (i + 1) + '</div><div class="ma_txt">' + ids[i] + '</div></div>'
                    maStr = maStr + '兑换码' + (i + 1) + ':' + ids[i] + ','
                }
                 $('#ma').val(maStr)
                $('.ma_list').html(maDom)
            }
        },
        showMa: function () {
            $('.ma_wrap').removeClass('hidden')
        },
        hiddenMa: function () {
            $('.ma_wrap').addClass('hidden')
        },
        copy: function () {
            // var ma_txt = document.getElementById("ma");
            // ma_txt.select();
            // document.execCommand("copy");
            // alert("已复制好，可贴粘。");
            var range = document.createRange();
            range.selectNode(document.getElementById('ma'));
            var selection = window.getSelection();
            if(selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            this.showErr("已复制好，可贴粘");
        }
    }
    kfc.init()
})()