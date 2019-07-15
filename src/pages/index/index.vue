<template>
   <div>
     <div class="head">
        <div class="head-top">
          <div class="head-box1">
            <img class="logo" src="../../../static/images/162x44.jpg">
          </div>
          <div class="head-box2">
            <div class="head-box2-top">快来饭</div>
            <div class="head-box2-bottom">
              <span class="laba"></span>
              <div class="kouhao">亲爱的饭粉！欢迎加入“快来饭”大家庭！“快来饭”将至始至终遵守好米、好油、好菜、好肉、好料的准则，更快、更好、更用心的为您做好每一餐！感同身受，❤️贴❤️的为您服务！愿“快来饭”伴随您度过美好的一天又一天！跟随您健康饮食的脚步往前迈进，永不止步……</div>
            </div>
          </div>
          <div class="head-box3">
            <p class="head-box3-top">
              <span class="aixin"></span>
            </p>
            <p class="head-box3-bottom">收藏</p>
          </div>
        </div>
        <div class="head-bottom"></div>
      </div>
     <div class="tab">
        <div v-for="(item,index) in tabList" :key="index"  @click="changetab(index)">
          <span :class="{active:selNum==index}">{{item}}</span>
        </div>
     </div>
      <choo v-if="selNum==0"/>
      <evaluate v-if="selNum==1"/>
      <business v-if="selNum==2"/>
    </div>
</template>
<script>
import choo from "@/components/choo";
import business from "@/components/business";
import evaluate from "@/components/evaluate";
export default {
  data() {
    return {
      selNum:0,
      current: 'tab1',
      tabList:["选购","评价","商家"],
    };
  },
  components: {
    choo,
    business,
    evaluate,
  },
  mounted(){ 
    // 贝思客
    // this.$apis.test().then((res)=>{
    //   console.log(res);
    // })
    // this.$apis.getfood().then((res)=>{
    //   console.log(res);
    // })
  
  },
  methods: {
   changetab(index){
     this.selNum=index;
   }
    
  }
}
</script>



<style scoped lang='scss'>
div{
      .head {
        background: grey;
        z-index: 0;
        left: 0;
        top: 0;
        height: 100px;
        width: 100%;
      .head-top{
        padding: 10px;
        padding-right: 18px;
        height: 51px;
        clear: both;
        display: flex;
        .head-box1{
          float: left;
          height: 51px;
          width: 51px;
          border-radius: 50%;
          background-color: #fff;
          background-image: none;
          background-size: cover;
          .logo{
            height: 51px;
            width: 51px;
            border-radius: 50%;
          }
        }
        .head-box2{
          flex: 1;
          height: 52px;
          padding-left: 12px;
          padding-top: 8px;
          overflow: hidden;
          .head-box2-top{
            color: #fff;
            font-size: 16px;
            line-height: 16px;
            margin-bottom: 6px;
          }
          .head-box2-bottom{
            line-height: 20px;   
            .laba{
              float: left;
              margin-top: 2.5px;
              width: 15.5px;
              height:14px;
              background-image: url(../../../static/images/xiaolaba-copy.png);
              background-size: cover;
              background-repeat: no-repeat;
            }
            .kouhao{
              margin-left: 22.5px;
              font-size: 12px ;
              color: #fff;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .head-box3{
          float: right;
          margin-top: 9px;
          position: relative;
          width: 60px;
          border-left: .5px solid #fff;
          .head-box3-top{
            text-align: center;
            .aixin{
              text-align: center;
              width: 19px;
              height: 17.5px;
              color: #fff;
              display: block;
              background-image: url(../../../static/images/xinaixin.png);
              background-size: cover;
              background-repeat: no-repeat;
              margin-left:20px;
            }
          }
          .head-box3-bottom{
            margin-top: 6px;
            color: #fff;
            font-size: 14px;
            text-align: center;
          }
        }
      }
      .head-bottom{
        height: 30px;
        margin: 0 10px;
        padding-top: 2px;
        border-top: 1px dashed #fff;
        display: flex;
      }
 }
  .tab{
    width: 100%;
    display: flex;
    background: #fff;
    height:40.5px; 
     >div{
       flex: 1;
        height: 40.5px;
        text-align: center;
        >span{
          display: inline-block;
          height:38px;
          line-height:38px;
          padding:0 11.7px;
          font-size: 16px;
          color: #676767;
        }
     }
    }
    .active{
      color: #000;
      font-weight: 700;
      border-bottom: 2.5px solid red;
    }
}
</style>
