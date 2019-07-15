<template>
  <div>
    <div class="content">
      <scroll-view scroll-y class="content-left">
        <ul class="content-left-ul">
          <li class="fangdajing">
            <span class="pic"></span>
          </li>
          <li
            :class="{active:currentNum==index}"
            v-for="(item,index) in goodsList"
            :key="index"
            @click="sel(index)"
          >
            <span class="title">{{item.typeName}}</span>
            <span class="classcount" v-if="item.num!=0">{{item.num}}</span>
          </li>
        </ul>
      </scroll-view>

      <scroll-view
        scroll-y
        class="content-right"
        :scroll-into-view="scrollId"
        scroll-with-animation
        @scroll="scroll"
        @scrolltolower="scrolltolower"
      >
        <ul class="content-right-til">
          <li v-for="(item,index) in goodsList" :key="index" class="titlerh">
            <h3 class="title" :id="'po'+index">{{item.typeName}}</h3>
            <ul class="content-right-food">
              <li v-for="(it,dex) in item.foodList" :key="dex">
                <div class="left-pic">
                  <img :src="it.img" alt />
                </div>
                <div class="right-cont">
                  <p class="cont-name">{{it.name}}</p>
                  <p class="cont-des">{{it.descript}}</p>
                  <p class="cont-pri">
                    <span class="price">{{"￥"+it.price}}</span>
                    <span class="unit" v-show="it.unit">{{"/"+it.unit}}</span>
                    <span class="formepri">{{it.formerprice==0?"":"￥"+it.formerprice}}</span>
                    <span class="buy">
                      <span class="btn" @click="add(item,it)">+</span>
                      <span class="tobuy">{{it.count}}</span>
                      <span class="btn" @click="del(item,it)">-</span>
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll-view>
      <div class="til">
        <div class="til-rel">
          <div class="gwc">
            <img src="../../static/images/gouwuchef.png" alt />
          </div>
          <div class="countpri">
            <p>总价:￥{{sum}}</p>
          </div>
          <div
            class="song"
            v-show="sum>9.9"
            style="color:red;font-weight:900；background:#fff;"
            @click="changebool"
          >购买</div>
          <div class="song" v-show="sum<9.9">￥{{infoList.basicprice}}元起送</div>
        </div>
      </div>
      <div class="section" v-if="bool">
        <ul>
          <li v-for="(item,index) in fooddata" :key="index">
            <img :src="item.img" />
            <div class="text">
              <p class="name">{{item.name}}</p>
              <p class="shuzi">{{item.num}}</p>
            </div>
            <h3>￥{{item.price}}</h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      scrollId: "",
      // 右侧listTop
      listHeight: [],
      // scroll
      scrollTop: 0,
      currentNum: 0,
      infoList: {},
      countpic: true,
      bool: false,
      listData: [],
      sum: 0,
      fooddata:[],
    };
  },

  components: {},
  mounted() {
    this.fooddata=this.$store.state.footList
    // 贝思客
    // this.$apis.test().then((res)=>{
    //   console.log(res);
    // })

    //  foodtype    饮料 id  1897544
    // foodlist    饮料 type_id 1897544

    let goodsList = [];
    wx.showLoading({
      title: "加载中..."
    });
    this.$apis.getfood().then(res => {
      for (var i = 0; i < res.data.foodtype.length; i++) {
        // console.log(res.data.foodtype[i].id)
        goodsList.push({
          typeName: res.data.foodtype[i].name,
          type_id: res.data.foodtype[i].id,
          foodList: [],
          num: 0
        });
        for (var n = 0; n < res.data.foodlist.length; n++) {
          if (res.data.foodtype[i].id == res.data.foodlist[n].type_id) {
            res.data.foodlist[n].count = 0;
            goodsList[i].foodList.push(res.data.foodlist[n]);
          }
        }
      }
      this.goodsList = goodsList;
      wx.hideLoading();
      setTimeout(() => {
        // console.log(this.$refs);
        this.getNodesData();
      }, 80);
    });
    this.$apis.getinfo().then(res => {
      this.infoList = res.data;
    });
  },

  computed: {
    currentIndex() {
      this.scrollTop = this.scrollTop + 141;
      for (var i = 0; i < this.listHeight.length; i++) {
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        // console.log(height1,height2);

        if (this.scrollTop >= height1 && this.scrollTop < height2) {
          this.currentNum = i;
          return i;
        }
      }
      // return this.scrollTop;
    },
    total() {
      if (this.$store.getters.total) {
        this.sum = this.$store.getters.total;
      } else {
        this.sum = 0;
      }
      return this.sum;
    }
  },
  methods: {
    changebool() {
      this.bool = !this.bool;
    },
    sel(index) {
      this.scrollId = "po" + index;
    },
    // countadd(item){
    //   item.count++;
    // },
    add(item, it) {
      console.log(item, it);
      it.count++;
      item.num++;
      this.$store.commit("add", it);
    },
    del(item, it) {
      it.count--;
      if (it.count < 0) {
        it.count = 0;
        return;
      }
      item.num--;
    },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
      // console.log(this.scrollTop);
    },
    getNodesData() {
      var query = wx.createSelectorQuery();
      // select    id
      // selectAll class
      // console.dir()
      query
        .selectAll(".titlerh")
        .boundingClientRect(nodes => {
          // console.log(nodes);

          nodes.map(item => {
            this.listHeight.push(item.top);
          });
          // console.log(this.listHeight)
        })
        .exec();
    },
    scrolltolower() {
      setTimeout(() => {
        this.currentNum = this.listHeight.length - 1;
      }, 80);
    }
  }
};
</script>



<style scoped lang="scss">
.content {
  display: flex;
  background-color: #fff;
  border-top: 1px solid #e7e7e7;
  height: 526px;
  overflow: hidden;
  .content-left {
    width: 80.5px;
    background-color: #f2f2f2;
    overflow-x: hidden;
    overflow-y: scroll;
    .content-left-ul {
      > li {
        height: 50px;
        padding: 0 5px;
        width: 68px;
        align-items: center;
        font-size: 13px;
        line-height: 50px;
        text-align: center;
        position: relative;
        .classcount {
          width: 15px;
          height: 15px;
          line-height: 15px;
          display: inline-block;
          border-radius: 50%;
          background-color: #f87a7c;
          color: #fff;
          text-align: center;
          font-size: 12px;
          position: absolute;
          right: 0;
          top: 5px;
        }
      }
      > li:nth-child(1) {
        height: 52.5px;
        .pic {
          background: url("../../static/images/fangdajing.png") no-repeat center;
          background-size: 25px 25px;
          width: 25px;
          height: 25px;
          margin-top: 15px;
          display: inline-block;
        }
      }
      .active {
        color: #f87a7c;
        background-color: #fff;
        border-left: 2.5px solid #f87a7c;
      }
    }
  }
  .content-right {
    width: 280px;
    .content-right-til {
      .titlerh {
        .title {
          margin-top: 11.7px;
          margin-left: 10px;
          padding-left: 11.7px;
          min-height: 23.4px;
          line-height: 23.4px;
          font-size: 14px;
          border-left: 2.5px solid #f87a7c;
        }
        .content-right-food {
          > li {
            padding: 13px 0;
            border-bottom: 1px solid #e7e7e7;
            display: flex;
            .left-pic {
              > img {
                width: 62px;
                height: 62px;
                display: block;
                margin: 0 10px;
              }
            }
            .right-cont {
              min-height: 83.5px;
              font-size: 0;
              .cont-name {
                line-height: 15px;
                overflow: hidden;
                font-size: 15px;
                color: #2f2f2f;
                margin-bottom: 5px;
              }
              .cont-des {
                font-size: 12px;
                color: #a9a9a9;
                margin-bottom: 2.5px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .cont-pri {
                margin-top: 15.5px;
                margin-right: 5px;
                .price {
                  color: #f87a7c;
                  font-size: 16px;
                  line-height: 27px;
                  vertical-align: middle;
                }
                .unit {
                  font-size: 13px;
                  color: #a9a9a9;
                  vertical-align: bottom;
                }
                .formepri {
                  color: #999;
                  font-size: 12px;
                  vertical-align: bottom;
                  text-decoration: line-through;
                }
                .buy {
                  position: absolute;
                  right: 15px;
                  .btn {
                    vertical-align: bottom;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    display: inline-block;
                    border-radius: 50%;
                    background-color: #f2f2f2;
                    text-align: center;
                    font-size: 14px;
                  }
                  .tobuy {
                    width: 15px;
                    height: 15px;
                    display: inline-block;
                    margin: 0 5px;
                    line-height: 15px;
                    font-size: 14px;
                    color: #000;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .til {
    height: 45px;
    z-index: 50;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #141d27;
    .til-rel {
      line-height: 45px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      display: flex;
      .gwc {
        width: 30px;
        height: 30px;
        background: #fff;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 7px;
        margin-left: 40px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .countpri {
        text-align: left;
        margin-left: 10px;
        width: 195px;
      }
      .song {
        background: #eee;
        width: 100px;
        color: #999;
      }
    }
  }
  .section {
    width: 100%;
    margin-top: r(40);
    background-color: #fff;
    position: absolute;
    top: 65px;
    left: 0;
    height: 100%;
    ul {
      padding: 0 r(20);
      li {
        display: flex;
        margin-top: r(20);
        width: 100%;
        align-items: center;
        img {
          width: r(60);
          height: r(60);
        }
        .text {
          margin-left: r(10);
          width: r(170);
          .name {
            font-size: r(14);
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            height: r(40);
          }
          .shuzi {
            font-size: r(13);
            color: gray;
          }
        }
        h3 {
          margin-left: r(30);
          font-size: r(18);
          color: #000;
          line-height: r(30);
        }
      }
    }
  }
}
</style>
