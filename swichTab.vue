<template>
  <div class="swicth">
      <div class="titleBox">
            <div :class="index === current ? 'zxc active':'zxc'" v-for="(item,index) in list" :key="item.name" @click="handleClick(index)">
                <div class="center">
                    <div class="name">{{item.name}}</div>
                    <div class="value_container">
                        <div class="value">{{item.homeCount}}</div>
                        <div class="value">{{item.rate}}</div>
                    </div>
                    <div class="value_container">
                        <div class="unit">{{item.homeCount1}}</div>
                        <div class="unit">{{item.rate1}}</div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            current:0,
            list: [
                {name:'融资公司1',homeCount1:'家次', rate1:'较上年同期',homeCount:100, rate:28},
                {name:'融资公司',homeCount:100, rate:28,homeCount1:100, rate1:28},
            ],
        };
    },
    methods: {
        handleClick(index){
            this.current = index;
            this.$emit("select-event", index);
        }
  },
//   mounted() {
//     this.echartsdata && this.showDataFormat(this.echartsdata);
//   },
//   watch: {
//     echartsdata(val) {
//       this.showDataFormat(val);
//     },
//   },
};
</script>

<style scoped>
.titleBox {
    display: flex;
    width: 100vw;
    height: 3.5rem;
    margin: 0 auto;
    font-family: SourceHanSansCN-Normal;
    text-align: center;
    border-bottom: #F0F0F0 solid 0.01rem;
}

.titleBox>div {
    width: 50%;
    padding: 0.2rem;
}

.active {
    box-shadow: 1px 3px 6px rgba(165, 165, 165, 0.5);
    border-bottom: solid #2E84FC 0.15rem;
}

.zxc {
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    opacity: 1;
    position: relative;
}

.zfz {
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    opacity: 1;
}

.name {
    font-size: 0.75rem;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    opacity: 1;
}

.proportion {
    font-size: 0.6rem;
    font-family: SourceHanSansCN-Medium;
    opacity: 1;
}

.value {
    font-size: .667rem;
    font-family: Roboto-Medium;
    opacity: 1;
    width: 50%;
}

.red {
    color: #F43438;
}

.green {
    color: #069F5F;
}

.unit {
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    width: 50%;
    font-size: 0.64rem;
}

.value_container {
    display: flex;
    justify-content: space-around;
}

.center {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 90%;
}

.app {
    background-color: #FFFFFF;
}
</style>
