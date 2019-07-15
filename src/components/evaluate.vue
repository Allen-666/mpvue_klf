<template>
    <div class="content">
        <div class="cont-box">
            <div>
                <div>
                    <div>
                        <div><P>{{infoList.commentgrade}}</p></div>
                        <div><P>平均得分</p></div>
                        <div><P><span>（评论数</span><span>{{infoListshop.comment_num}}</span>条）<span></span></p></div>
                    </div>
                </div>
                <div>
                        <i-cell-group>
                           <div>
                                <i-cell>
                                    <i-rate 
                                        :count="5"
                                        :value="starIndex1"
                                        :size="18">
                                    </i-rate>
                                </i-cell>
                                <div><span>{{commentgradePeople.grade_5}}</span></div>
                           </div>
                            <div>
                                <i-cell>
                                    <i-rate 
                                        :count="5"
                                        :value="starIndex2"
                                        :size="18">
                                    </i-rate>
                                </i-cell>
                               <div> <span>{{commentgradePeople.grade_4}}</span></div>
                           </div> 
                            <div>
                                <i-cell>
                                    <i-rate 
                                        :count="5"
                                        :value="starIndex3"
                                        :size="18">
                                    </i-rate>
                                </i-cell>
                                <div><span>{{commentgradePeople.grade_3}}</span></div>
                           </div> 
                           <div>
                                <i-cell>
                                    <i-rate 
                                        :count="5"
                                        :value="starIndex4"
                                        :size="18">
                                    </i-rate>
                                </i-cell>
                                <div><span>{{commentgradePeople.grade_2}}</span></div>
                           </div>  
                           <div>
                                <i-cell>
                                    <i-rate 
                                        :count="5"
                                        :value="starIndex5"
                                        :size="18">
                                    </i-rate>
                                </i-cell>
                                <div><span>{{commentgradePeople.grade_1}}</span></div>
                           </div>                      
                        </i-cell-group>
                   
                </div>
                
            </div>
            <div>
                <div>
                    <span v-for="(item,index) in tagNum" :key="index" @click="changetab(index)" :class="{active:selNum==index}">{{item.name}}({{item.num}})</span>
                </div>
            </div>
            <div v-show="selNum==0" class="all">
                <ul>
                    <li v-for="(item,index) in commlist" :key="index">
                        <p class="nam">
                            <span>{{item.lewaimai_customer_id}}</span>
                            <i-cell>
                                <i-rate 
                                    :count="5"
                                    :value="item.grade"
                                    :size="18">
                                </i-rate>
                            </i-cell>
                        </p>
                        <p class="comm">
                            {{item.content}}
                        </p>
                        <div class="pic">
                            <img v-if="item.imgurl.length!=0" :src="'https://img.zhipuzi.com'+item.imgurl[0]">
                        </div>
                        <p class="tim">{{item.time}}</p>
                    </li>
                </ul>
            </div>
            <div v-show="selNum==1" class="havepic">
               <ul>
                    <li v-for="(item,index) in commlist" :key="index" v-show="item.imgurl.length!=0">
                        <p class="nam">
                            <span>{{item.lewaimai_customer_id}}</span>
                            <i-cell>
                                <i-rate 
                                    :count="5"
                                    :value="item.grade"
                                    :size="18">
                                </i-rate>
                            </i-cell>
                        </p>
                        <p class="comm">
                            {{item.content}}
                        </p>
                        <div class="pic">
                            <img v-if="item.imgurl.length!=0" :src="'https://img.zhipuzi.com'+item.imgurl[0]">
                        </div>
                        <p class="tim">{{item.time}}</p>
                    </li>
                </ul>
            </div>
            <div v-show="selNum==2" class="goodval">
                 <ul>
                    <li v-for="(item,index) in commlist" :key="index" v-show="item.grade==5">
                        <p class="nam">
                            <span>{{item.lewaimai_customer_id}}</span>
                            <i-cell>
                                <i-rate 
                                    :count="5"
                                    :value="item.grade"
                                    :size="18">
                                </i-rate>
                            </i-cell>
                        </p>
                        <p class="comm">
                            {{item.content}}
                        </p>
                        <div class="pic">
                            <img v-if="item.imgurl.length!=0" :src="'https://img.zhipuzi.com'+item.imgurl[0]">
                        </div>
                        <p class="tim">{{item.time}}</p>
                    </li>
                </ul>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    selNum:0,
    infoList: {},
    infoListshop:{},
    tagNum:[],
    commentgradePeople:{},
    commlist:[],
    starIndex1 : 5,
    starIndex2 : 4,
    starIndex3 : 3,
    starIndex4 : 2,
    starIndex5 : 1
    };
  },
  components: {
    
  },
  mounted() {
    this.$apis.getinfo().then(res => {
    this.infoList=res.data;
    this.infoListshop=res.data.shop;
    this.tagNum=res.data.tag_num;
    this.commentgradePeople=res.data.commentgradePeople;
    });
    this.$apis.getcomm().then(res => {
    this.commlist=res.data.comments;  
    });
  },
  computed: {
    
  },
  methods: {
    changetab(index){
    console.log(index)
     this.selNum=index;
   }
  }
};
</script>
<style scoped lang="scss">
.content{
    background-color: #fff;
    border-top: 1px solid #e7e7e7;
    .cont-box{
        width: 100%;
        height: 100%;
        >div:nth-child(1){
            height:145px;
            background-color: #fff;
            >div:nth-child(1){
                float: left;
                padding-bottom: 21.5px;
                width: 158.5px;
                >div{
                    border-right: 1.5px solid #ebebeb;
                    >div:nth-child(1){
                        text-align: center;
                        margin-top: 25px;
                        padding-bottom: 15px;
                        >p{
                            text-align: center;
                            font-size:35px;
                            color: #df5458;
                        }
                    }
                    >div:nth-child(2){
                        font-size: 14px;
                        color: #676767;
                        text-align: center;
                        margin-bottom:6px;
                    }
                    >div:nth-child(3){
                        font-size: 14px;
                        color: #676767;
                        text-align: center;
                    }
                }
            }
            >div:nth-child(2){
                float: right;
                width: 213px;
                i-cell-group{
                    >div{
                        border: none;
                        height: 18px;
                        margin-left: 34.5px;
                        margin-top: 5px;
                        i-cell{
                            height: 18px;
                            display: inline-block;
                            margin-right: 14px;
                            width: 114px;
                        }
                        >div{
                            display: inline-block;
                            color: #fdbc3f;
                            font-size: 15px;
                            font-weight: 700;
                        }
                    }
                    >div:nth-child(1){
                        margin-top:18px;
                    }
                }

            }
        }
        >div:nth-child(2){
            border-top: 10px solid #ebebeb;
            border-bottom: 10px solid #ebebeb;
            padding-bottom: 10px;
            >div{
                margin-left: 9px;
                margin-right: 15px;
                margin-top: 6px;
                 >span{
                    padding: 0 14px;
                    text-align: center;
                    color: #c2c2c2;
                    height: 29px;
                    display: inline-block;
                    line-height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    border: .5px solid #c2c2c2;
                    margin-left: 9px;
                    margin-top: 9px;
                }
                .active{
                    border-color: #f87a7c!important;
                    color: #f87a7c!important;
                    background-color: #ffe7e7;
                }
            }
        }
        >div:nth-child(3){
            background: #fff;
            >ul{
                margin-left:18px;
                >li{
                    .nam{
                        height: 18.5px;
                        line-height: 18.5px;
                        font-size: 14px;
                        font-weight: 700;
                        color: #373737;
                        margin-top: 12.5px;
                        vertical-align: middle;
                        i-cell{
                            float: right;
                            margin-right: 14px;
                        }
                    }
                    .comm{
                        font-size: 12px;
                        color: #373737;
                        margin-top: 12px;
                        margin-right: 18px;
                    }
                    .pic{
                        margin-top: 8px;
                        >img{
                            width:175px;
                            height: 175px;
                        }
                    }
                    .tim{
                        text-align: right;
                        font-size: 12px;
                        color: #676767;
                        height: .768;
                        line-height: 20px;
                        margin-right:20px;
                    }
                }
            }
        }
        >div:nth-child(4){
           background: #fff;
            >ul{
                margin-left:18px;
                >li{
                    .nam{
                        height: 18.5px;
                        line-height: 18.5px;
                        font-size: 14px;
                        font-weight: 700;
                        color: #373737;
                        margin-top: 12.5px;
                        vertical-align: middle;
                        i-cell{
                            float: right;
                            margin-right: 14px;
                        }
                    }
                    .comm{
                        font-size: 12px;
                        color: #373737;
                        margin-top: 12px;
                        margin-right: 18px;
                    }
                    .pic{
                        margin-top: 8px;
                        >img{
                            width:175px;
                            height: 175px;
                        }
                    }
                    .tim{
                        text-align: right;
                        font-size: 12px;
                        color: #676767;
                        height: .768;
                        line-height: 20px;
                        margin-right:20px;
                    }
                }
            }
        }
        >div:nth-child(5){
            background: #fff;
            >ul{
                margin-left:18px;
                >li{
                    .nam{
                        height: 18.5px;
                        line-height: 18.5px;
                        font-size: 14px;
                        font-weight: 700;
                        color: #373737;
                        margin-top: 12.5px;
                        vertical-align: middle;
                        i-cell{
                            float: right;
                            margin-right: 14px;
                        }
                    }
                    .comm{
                        font-size: 12px;
                        color: #373737;
                        margin-top: 12px;
                        margin-right: 18px;
                    }
                    .pic{
                        margin-top: 8px;
                        >img{
                            width:175px;
                            height: 175px;
                        }
                    }
                    .tim{
                        text-align: right;
                        font-size: 12px;
                        color: #676767;
                        height: .768;
                        line-height: 20px;
                        margin-right:20px;
                    }
                }
            }
        }
        >div:nth-child(6){
            width: 100%;
            height: 60px;
            text-align: center;
            font-size: 16px;
            line-height: 60px;
            color: #aaa;
            position: relative;
        }
    }
}
</style>