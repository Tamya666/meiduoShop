let vm = new Vue({
    el: '#app',
    // 修改Vue读取变量的语法
    delimiters: ['[[', ']]'],
    data: {
        username: '',
        password: '',
        password2: '',
        mobile: '',
        allow: '',
        image_code_url:'',
        uuid:'',
        image_code: '',
        sms_code_tip: '获取短信验证码',
        sms_code:'',
        send_flag: false,

        error_name: false,
        error_password: false,
        error_password2: false,
        error_mobile: false,
        error_allow: false,
        error_image_code: false,
        error_sms_code:false,

        error_name_message: '',
        error_mobile_message: '',
        error_image_code_message: '',
        error_sms_code_message:''
    },
    mounted() {
        // 生成图形验证码
        this.generate_image_code();
    },
    methods: {
    // 发送短信验证码
    send_sms_code() {
        // 避免恶意用户频繁的点击获取短信验证码的标签
        if (this.send_flag == true) {
            return;
        }
        this.send_flag = true; // 如果可以进入到厕所，立即关门

        // 校验数据：mobile，image_codecheck_image_code
        this.check_mobile();
        this.check_image_code();
        if (this.error_mobile == true || this.error_image_code == true) {
            this.send_flag = false;
            return;
        }

        let url = '/sms_codes/' + this.mobile + '/?image_code=' + this.image_code + '&uuid=' + this.uuid;
        axios.get(url, {
            responseType: 'json'
        })
            .then(response => {
                if (response.data.code == '0') {
                    // 展示倒计时60秒效果
                    let num = 60;
                    let t = setInterval(() => {
                        if (num == 1) { // 倒计时即将结束
                            clearInterval(t); // 停止回调函数的执行
                            this.sms_code_tip = '获取短信验证码'; // 还原sms_code_tip的提示文字
                            this.generate_image_code(); // 重新生成图形验证码
                            this.send_flag = false;
                        } else { // 正在倒计时
                            num -= 1; // num = num - 1;
                            this.sms_code_tip = num + '秒';
                        }
                    }, 1000)
                } else {
                    if (response.data.code == '4001') { // 图形验证码错误
                        this.error_image_code_message = response.data.errmsg;
                        this.error_image_code = true;
                    }
                    this.send_flag = false;
                }
            })
            .catch(error => {
                console.log(error.response);
                this.send_flag = false;
            })
    },
    // 生成图形验证码
    generate_image_code(){
        this.uuid = generateUUID();
        this.image_code_url = '/image_codes/'+this.uuid+'/';
    },
    // 校验用户名
    check_username(){
        let re = /^[a-zA-Z0-9_-]{5,20}$/;
        if (re.test(this.username)) {
            this.error_name = false;
        } else {
            this.error_name_message = '请输入5-20个字符的用户名';
            this.error_name = true;
        }
         // 判断用户名是否重复注册
        if (this.error_name == false) { // 只有当用户输入的用户名满足条件时才回去判断
            let url = '/usernames/' + this.username + '/count/';
            axios.get(url, {
                responseType: 'json'
            })
                .then(response => {
                    if (response.data.count == 1) {
                        // 用户名已存在
                        this.error_name_message = '用户名已存在';
                        this.error_name = true;
                    } else {
                        // 用户名不存在
                        this.error_name = false;
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    },
    // 校验密码
    check_password(){
        let re = /^[0-9A-Za-z]{8,20}$/;
        if (re.test(this.password)) {
            this.error_password = false;
        } else {
            this.error_password = true;
        }
    },
    // 校验确认密码
    check_password2(){
        if(this.password != this.password2) {
            this.error_password2 = true;
        } else {
            this.error_password2 = false;
        }
    },
    // 校验手机号
    check_mobile(){
        let re = /^1[3-9]\d{9}$/;
        if(re.test(this.mobile)) {
            this.error_mobile = false;
        } else {
            this.error_mobile_message = '您输入的手机号格式不正确';
            this.error_mobile = true;
        }
        // 判断用户名是否重复注册
        if (this.error_name == false) { // 只有当用户输入的用户名满足条件时才回去判断
            let url = '/usernames/' + this.username + '/count/';
            axios.get(url, {
                responseType: 'json'
            })
                .then(response => {
                    if (response.data.count == 1) {
                        // 用户名已存在
                        this.error_name_message = '用户名已存在';
                        this.error_name = true;
                    } else {
                        // 用户名不存在
                        this.error_name = false;
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    },
    // 校验图形验证码吗
    check_image_code() {
        if (this.image_code.length != 4) {
            this.error_image_code_message = '请输入图形验证码';
            this.error_image_code = true;
        } else {
            this.error_image_code = false;
        }
    },
    check_sms_code(){
        if(this.sms_code.length != 6){
            this.error_sms_code_message = '请填写短信验证码';
            this.error_sms_code = true;
        } else {
            this.error_sms_code = false;
        }
    },
    // 校验是否勾选协议
    check_allow(){
        if(!this.allow) {
            this.error_allow = true;
        } else {
            this.error_allow = false;
        }
    },
    // 监听表单提交事件
    on_submit(){
        this.check_username();
        this.check_password();
        this.check_password2();
        this.check_mobile();
        this.check_sms_code();
        this.check_allow();

        if(this.error_name == true || this.error_password == true || this.error_password2 == true
            || this.error_mobile == true || this.error_allow == true || this.error_sms_code == true) {
            // 禁用表单的提交
            window.event.returnValue = false;
        }
    },
}
});