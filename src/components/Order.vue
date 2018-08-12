<template>
    
    <div id="order">
        <div class="order_content" v-if='list.total_num'>
                
                <div class="order_info">
                    
                    <div class="order_top">
                        <img src="../assets/images/timer.png" />	       		       		      			
                        <div class="order_info_right">
                            <h2>118号桌待门店接单</h2>
                            <p>请及时联系服务员确认一点菜品信息!</p>
                        </div>	 
                    </div>
                    
                    
                    <h3>已点菜品{{list.total_num}}份,合计 : <span class="price">{{list.total_price}}元</span> </h3>


                    <button @click="doPay()">
                        支付宝立即支付
                    </button>

                    <br>
                    <br>
                    <br>
                    <button @click="doWeixinPay()">
                      微信立即支付
                    </button>
            </div>
            
            <!--订单列表-->
            
            <div class="order_list">
                
                    <h3>菜品详情:</h3>
                    <ul class="list">
                        <li v-for="item in list.items">
                            <div class="title">
                                {{item.title}}/
                                已下厨
                            </div>
                                
                            <div class="num">
                                
                                {{item.num}}份
                            </div>
                            
                            
                            <div class="price">
                                
                                ¥{{item.price}}元
                            </div>
                    
                        </li>
                        
                        
                    </ul>
            
            </div>
            
                
            </div>

            <div v-if="!list.total_num" class="cart_empty">您还没有点餐，点击菜单开始点菜</div>


            <v-navfooter></v-navfooter>
			
		
            <div id="footer_book" class="footer_book" style="left:auto;right:5px;">
                <router-link to="/home">
                    <img src="../assets/images/menu.png"/>
                    <p>菜单</p>
                </router-link>
            </div>
    </div>
</template>


<script>

	//引入NavFooter组件
	import NavFooter from './public/NavFooter.vue';

    
    //引入配置文件

	import Config from '../model/config.js';


    import storage from '../model/storage.js';


    export default{

        data () {
            return {
                    api:Config.api,
                    list:[]
            }
        },
         components:{

			'v-navfooter':NavFooter
		},
        methods:{

            getOrder(){

                    var uid=storage.get('roomid');

                    var api=this.api+'api/getOrder?uid='+uid;

                    this.$http.get(api).then((response)=>{
                        console.log(response);
                        
                        this.list=response.body.result[0];

                    },(error)=>{
                        console.log(error);
                    })

            },
            doPay(){

                    var that=this;
                    var uid=storage.get('roomid');
                    var api=this.api+'api/doPay';
                    this.$http.post(api,{
                        uid,                      
                        total_price:that.list.total_price,
                        order_id:that.list.order_id,
                        return_url:'http://localhost:8080/#/success'                         
                    }).then((response)=>{                              
                        console.log(response);                        
                        location.href=response.body.result.data;
                    },(err)=>{
                        console.log(err);
                    })
            },
            doWeixinPay(){                                      
                    var order_id=this.list.order_id;
                    location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bf3787c783116e4&redirect_uri=http://b.itying.com?order_id='+order_id+'&response_type=code&scope=snsapi_base#wechat_redirect';

           }
        },
        mounted(){

            this.getOrder();
        }
    }
</script>

<style lang="scss">

.order_content{
    padding: 1rem;
    
    
    .order_info{
        
        background: #fff;
        
        border-radius: .5rem;
        
       .order_top{
           
           display: flex;
           
           img{
               width: 5.6rem;
               height: 5.6rem;
           }
           
           .order_info_right{
               flex: 1;
               padding-top: .5rem;
               
           }           
          
       }
       
        h3{
               
               line-height: 2;
               padding: .5rem;
               
               .price{
                   font-size: 2rem;
                   
                   color: red;
               }
        }
    }
    
    
    //  订单列表
    
    
      .order_list{
          
          background: #FFFFFF;
          border-radius: .5rem;
          margin-top: 1rem;
          
          padding: .5rem;
          
          h3{
              
              line-height: 2;
          }
          
          
          .list{
                           
              
              li{
                  
                  display: flex;
                  
                  line-height: 2;
                  padding: .5rem 0rem;
                  
                  .title{
                      
                      flex: 2;
                  }
                  
                  .num{
                      flex: 1;
                      text-align: center;
                  }
                  
                  .price{
                      flex: 1;
                      
                      text-align: center;
                  }
              }
          }
          
      }

    /*支付页面*/
    .order_pay{
        
            
            background: #fff;
            
            border-radius: .5rem;
            
            h3{
                
                padding:2rem 0rem .5rem 0rem;
                
                font-size: 2rem;
                text-align: center;
               
            }
            
            .order_pay_detail{
                display: flex;
                
                line-height: 2;
                
                border-bottom: 1px solid #eee;
                
                padding: .5rem;
                
                .d_num,.p_num,.order_time{
                    
                    flex:1;
                }
            }
            
            .order_pay_info{
                
                line-height: 2;
                
                display: flex;
                
                margin: 1rem 0rem;
                padding: .5rem .5rem 1rem .5rem;
                
                
                .price_list{
                    flex: 1;
                    
                    .price{
                        
                        font-size: 2rem;
                        
                        color: red;
                    }
                }
                
                .pay_button{
                    
                        width: 10rem;
                        border-radius: .5rem;
                        background: red;
                        color: #fff;
                        text-align: center;
                        height: 2.6rem;
                        line-height: 2.6rem;
                       position: relative;
                       
                       top:.5rem
                }
            }
    }

    
    
}



.cart_empty{
    
    text-align: center;
    line-height: 3;
    margin-top: 10rem;
    
    h3{
        font-size: 1.8rem;
    }
}

</style>