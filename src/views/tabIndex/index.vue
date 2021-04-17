<template>
    <div class="tab-admin">
        <div class="admin-list" @click="adminBtn">测试加快</div>
    </div>
</template>
<script>
import {
    Toast
} from "vant";
export default {
    data() {
        return {

        }
    },
    mounted(){
        this.getDtail();
    },
    methods:{
        getDtail(){
            this.$ajax.post('/tool/b/album/get/home/user',{},{
                loading:true
            }).then((res) => {
                console.log(res)
            })
        },
        adminBtn(){
            Toast.loading({
                duration: 0,
                icon: "https://oss.fjdaze.com/toolsApp/common/skeletonLoading.gif",
                className: "user-loading",
            });
        }
    }
}
</script>
<style lang="scss" scoped>
div{
    width:750px;
    height:100%;
}
</style>