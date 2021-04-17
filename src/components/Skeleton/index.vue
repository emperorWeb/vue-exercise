<template>
<img class="skeleton-img" src="https://oss.fjdaze.com/toolsApp/common/skeletonLoading.gif">
</template>

<script>
export default {
    name:'Skeleton'
}
</script>>

<style lang="scss" scoped>
.skeleton-img {
    width: 120px;
    height: 120px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -60px;
    margin-left: -60px;
}
</style>
