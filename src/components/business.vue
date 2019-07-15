<template>
<div class="content">  
    <div class="cont-cont">
        <div class="cont-head">
            <div class="cont-pic">
                <div class="pic"><img src="../../static/images/bigbg.jpg"></div>
                <div class="dian"><div></div></div>
            </div>
        </div>
        <div class="cont-five-start">
            <ul>
                <li>
                    <div>
                        <div>
                            <ul>
                                <li><img src="../../static/images/wuxing.png" ></li>
                                <li><img src="../../static/images/wuxing.png"></li>
                                <li><img src="../../static/images/wuxing.png"></li>
                                <li><img src="../../static/images/wuxing.png"></li>
                                <li class="banxing">
                                    <span class="huang"></span>
                                    <span class="hui"></span>
                                </li>
                            </ul>
                            <div>{{infoList.commentgrade}}</div>
                        </div>
                        <span>{{infoListshop.comment_num+"人已评价"}}</span>
                        <i><img src="../../static/images/jiantou.png"></i>                     
                    </div>
                </li>
            </ul>
        </div> 
        <div class="cont-start">
            <ul>
                <li>
                    <div>
                        <i><img src="../../static/images/dingwei.png" ></i>
                        <span>{{infoListshop.shopaddress}}</span>
                        <i class="i3"><img src="../../static/images/jiantou.png"></i>
                    </div>
                </li>
                <li>
                    <div>
                        <i><img src="../../static/images/dianhua.png" ></i>
                        <span>{{infoListshop.orderphone}}</span>
                        <i class="i3"><img style="width:23px;height:23px;display:block;" src="../../static/images/dianhuahong.png"></i>
                    </div>
                </li>
            </ul>
        </div> 
        <div class="cont-start">
            <ul>
                <li>
                    <div>
                        <i><img src="../../static/images/shizhong.png" ></i>
                        <span>营业时间：</span>07:00:00-13:30:00,,16:01:00-2...
                        <i class="i3"><img  src="../../static/images/jiantou.png"></i>
                    </div>
                </li>
                <li>
                    <div>
                        <i><img src="../../static/images/dingwei.png" ></i>
                        <span>服务区域：</span>点此查看有效区域
                        <i class="i3"><img src="../../static/images/jiantou.png"></i>
                    </div>
                </li>
            </ul>
        </div> 
        <div class="cont-start">
            <ul>
                <li>
                    <div>
                        <i><img src="../../static/images/qi.png"></i>
                        <span>起送价：</span>{{infoList.basicprice+"元"}}
                        <i class="i3"><img src="../../static/images/jiantou.png"></i>
                    </div>
                </li>
                <li>
                    <div>
                        <i><img src="../../static/images/song.png" ></i>
                        <span>配送费：</span>{{infoList.delivery_fee+"元"}}
                       
                        <view class="vie3">
                            <i class="i3 i33" @click="handleOpen1"><img class="dianji" src="../../static/images/jiantou.png"></i>
                        </view>   
                        <i-modal title="配送费" :visible="visible1" @click="handleClose1" :actions="actions3">
                            <view>{{infoList.delivery_fee+"元"}}</view>
                        </i-modal>
                    </div>
                </li>
            </ul>
        </div> 
        <div class="foot">
            <div class="foot-box">
                <div><img src="../../static/images/touxiang.jpg" alt=""></div>
                <img src="../../static/images/wenzi.png">
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      infoList: {},
      infoListshop:{},
      hoursList:[],
      visible1: false,
      actions3:[
          {name:'确定',color:'#f87a7c'}
      ]
    };
  },

  components: {
    
  },
  mounted() {
    this.$apis.getinfo().then(res => {
     this.infoList=res.data;
     this.infoListshop=res.data.shop;
     this.hoursList=res.data.shop.business_hours;
    });
  },
  computed: {
    
  },
  methods: {
      handleOpen1 () {
         this.visible1=true
    },
    handleClose1 () {
        this.visible1=false
    }, 
  }
};
</script>

<style scoped lang="scss">
.content{
    background-color: #fff;
    border-top: 1px solid #e7e7e7;
    .cont-cont{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        .cont-head{
            background-color: #fff;
            position: relative;
            .cont-pic{
                height: 265px;
                .pic{
                    overflow: hidden;
                    position: relative;
                    height: 100%;
                    >img{
                        display: block;
                        transform: none;
                        width: 100%;
                        height: 100%;
                    }
                }
                .dian{
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    >div{
                        width: 7px!important;
                        height: 7px!important;
                        border: 1px solid rgba(0,0,0,.2)!important;
                        opacity: 1!important;
                    }
                }
            }
        }
        .cont-five-start{
            >ul{
                background-color: #f5f5f5;
                li{
                    color: #373737;
                    background-color: #fff;

                    >img{
                        width: 14px;
                        height: 14px;
                        display: inline-block;
                    }
                    >div{
                        display: flex;
                        border-bottom: none;
                        position: relative;
                        font-size: 14px;
                        line-height: 20px;
                        vertical-align: middle;
                        padding: 9.5px 0 12px;
                        margin-left: 16.4px;
                        >div{
                             display: flex; 
                            >ul{
                                display: flex;                             
                                 >li{                                  
                                    margin-right: 6px;
                                 }
                                 .banxing{
                                     .huang{
                                        background:url('../../static/images/wuxing.png') no-repeat 0 0;
                                        background-size: 14px 14px;
                                        display: inline-block;
                                        width: 7px;
                                        height: 14px;
                                     }
                                     .hui{
                                        background:url('../../static/images/wuxinghui.png') no-repeat -7px 0;
                                        background-size: 14px 14px;
                                        display: inline-block;
                                        width: 7px;
                                        height:14px;
                                     }

                                 }
                            }
                            >div{
                                color: #fcbb2b;
                                font-size: 13px;
                                line-height: 14px;
                            }
                        }
                        >i{
                            margin-right: 18px;
                            >img{
                                width: 7px;
                                height: 12px;
                                vertical-align: middle;
                            }
                        }
                        >span{
                            margin-right: 30px;
                            margin-left:112px;
                        }
                    }
                }
            }
        }
        .cont-start{
            border-top: 10px solid #f5f5f5;
            >ul{
                background-color: #f5f5f5;
                li{
                    color: #373737;
                    background-color: #fff;
                    >div{
                        font-size: 14px;
                        line-height: 17px;
                        vertical-align: middle;
                        padding: 14px 0 12px;
                        margin-left: 16.4px;
                        border-bottom: 1.5px solid #f5f5f5;                   
                        >i:nth-child(1){
                            margin-right: 12px;
                            display: inline-block;
                            vertical-align: top;
                            >img{
                                width: 17px;
                                height:17px;
                                vertical-align: middle;
                            }
                        }
                        >span{
                            display: inline-block;
                            vertical-align: top;                           
                        }
                        .vie3{
                            display: inline-block;                         
                            margin-right: 18px;
                        }
                        .i3{
                            float: right;
                            margin-right: 18px;
                            >img{
                                width: 7px;
                                height: 12px;
                                vertical-align: middle;
                            }
                            .dianji{
                                margin-left: 208px;
                            }
                        }
                        .i33{
                             margin-right:0;
                        }
                    }
                }
                li:nth-child(2){
                    >div{
                        border-bottom: none;
                    }
                }
            }
        }
        .foot{
            .foot-box{
                background: #f5f5f5;
                background-size: cover;
                width: 100%;
                padding-top: 47px;
                padding-bottom:94px;
                text-align:center;
                color: #b7b7b7;
                height: 36.5px;
                >div{
                    >img{
                        margin: 0 auto;
                        width: 22px;
                        height: 22px;
                        display: block;
                    }
                }
                >img{
                    display: block;
                    margin: 0 auto;
                    width:103px;
                    margin-top: 4;
                    display: block;
                    height: 10.5px;
                }
            }
        }
    }
}
</style>

