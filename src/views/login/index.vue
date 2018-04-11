<template>
<div class="login-container" :style="style">
  <div id="canvascontainer" ref='can'></div>

  <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" class="card-box login-form">
    <img src="static/img/login-logo.png" class="login-logo" alt="">
    <Form-item prop="email">
      <Input type="text" v-model="loginForm.email" placeholder="Username" autoComplete="on">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input type="password" v-model="loginForm.password" placeholder="Password" @keyup.enter.native="handleLogin">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item>
      <Button type="primary" style="padding:12px 5px 12px 15px; font-size:14px; background-color:#6bc5a4;" @click="handleLogin('loginForm')" long>登录</Button>
    </Form-item>
  </Form>

</div>
</template>

<script>
import {
  isWscnEmail
} from 'utils/validate';

export default {
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isWscnEmail(value)) {
        callback(new Error('请输入正确的合法邮箱'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{
          required: true,
          trigger: 'blur',
          validator: validateEmail
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: false,
      showDialog: false,
      style: {
        backgroundImage: "url(" + require("static/img/login-bg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: "0px",
        overflow: "hidden"
      },
    }
  },
  mounted() {

  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
            this.$Message.success('登录成功');
            this.loading = false;
            this.$router.push({
              path: '/'
            });
          }).catch(error => {
            console.log(error.request);
            if (error.request) {
              const $response = JSON.parse(error.request.response)
              this.$Message.error($response.message);
            } else {
              this.$Message.error("网络错误!");
            }
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
body,
html {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    margin: 0;
}
// body {
//     background-image: url(static/img/login-bg.jpg);
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
// }
.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
}
.login-container a {
    color: #0078de;
}

.wz-input-group-prepend {
    background-color: #141a48;
    border: 1px solid #2d8cf0;
    border-right: none;
    color: #2d8cf0;
    padding: 4px 20px;
}

.ivu-input-group-prepend {
    background-color: #eaeaec;
    border: 1px solid #2d8cf0;
    border-right: none;
    color: #2d8cf0;
    font-size: 18px;
    padding: 4px 15px;
}

.ivu-form-item-error .ivu-input-group-append,
.ivu-form-item-error .ivu-input-group-prepend {
    background-color: #eaeaec;
    color: #ed3f14;
}
.login-container {
    height: 100vh;
    overflow: hidden;

    .login-logo {
        display: block;
        margin: 0 auto 35px;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    input {
        background-color: #eaeaec;
        border: 1px solid #2d8cf0;
        -webkit-appearance: none;
        border-radius: 3px;
        padding: 12px 5px 12px 15px;
        color: #555;
        height: 47px;
    }

    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
    }

    .title {
        font-size: 26px;
        font-weight: 400;
        color: #eeeeee;
        margin: 0 auto 40px;
        text-align: center;
        font-weight: bold;
    }

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        max-width: 310px;
        padding: 35px 35px 15px;
        margin: 120px auto;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px #ccc;
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .forget-pwd {
        color: #fff;
    }
}
</style>
