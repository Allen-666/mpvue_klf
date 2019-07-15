import fly from "./http"

class Apis {
    getfood() {
        return fly.request("/customer/common/page/food/choose?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            food_type: 1,
            shop_id: 374933,
            from_type: 1
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    getinfo() {
        return fly.request("/customer/common/shop/shop/info?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            food_type: 1,
            shop_id: 374933,
            from_type: 1
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    getcomm() {
        return fly.request("/customer/crm/communion/comment/list", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",         
            shop_id: 374933, 
            page: 0,
            num: 20,
            tag: 0,          
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
}
export default new Apis();