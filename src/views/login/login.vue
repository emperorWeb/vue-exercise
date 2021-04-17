<template>
    <div class="login">
        <div class="login-btn" @click="loginBtn">登录</div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        loginBtn(){
            let pathname = location.pathname.toLowerCase();
            if (pathname.indexOf('/myapp/') == -1) {
                this.$ajax.post("tool/b/out/manage/viewBackground", {
                    id: '138673641035661312'
                }).then(res => {
                    localStorage.setItem("xcToken", res.msg);
                    this.$router.push({
                        path: "/index",
                    });
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.login{
    .login-btn{
        width:100px;
        padding:15px 0px;
        margin:200px auto 0;
        color:#7f7dd9;
        background: #f5f5f5;
    }
}
</style>