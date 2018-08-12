<template>
    
    <div id="cart">
        <div class="cart_content">
			
			<div class="cart_info"  v-if="totalNum">
				
				
				<h2>购物车</h2>
				<div class="p_number">
					<div class="p_number_left">
	       				<p>用餐人数:{{peopleList.p_num}}</p>
	       				<p>备注:<span v-if="!peopleList.p_mark">无</span><span v-if="peopleList.p_mark">{{peopleList.p_mark}}</span></p>
	       			</div>	       			
	       			<div class="p_number_right">
                       <router-link to="/editpeopleinfo">
                            <img src="../assets/images/edit.png"/>
                            <p>修改</p>
                        </router-link>
	       			</div>					
					
				</div>
				
				<div class="cart_p_num">
					
					<p>购物车中总共有{{totalNum}}个菜</p>
	       			
	       			<p>合计：<span class="price">¥{{allPrice}}</span></p>
				</div>
			</div>
			
			
			
			<div class="cart_list"  v-if="totalNum">
				
				
				<ul>
					
					
					<li class="item" v-for="(item,key) in list">
							 	<div class="left_food">
	       						    <img :src="api+item.img_url" />       						
		       						<div class="food_info">
		       							<p>{{item.title}}</p>
		       							<p class="price">¥{{item.price}}</p>
		       						</div>
	       							
	       						</div>
	       						
	       						<div id="right_cart">
	       							<div class="cart_num">
								         <div class="input_left" @click="decNum(item,key)">-</div>
								          <div class="input_center">
								              <input type="text"  readonly="readonly" v-model="item.num" name="num" id="num" />
								          </div>
								          <div class="input_right" @click="incNum(item)">+</div>				      
								        </div>	
	       						</div>	
						
						
						
					</li>
				</ul>
			</div>
			
			
			
			
			<div class="hot_food">
				
				<h3>本店顾客最长点的菜</h3>
				
				<div class="item_list_outer">
					<ul class="item_list">
						<li>	
							<div class="inner">
								<img src="../assets/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>
						
						<li>
							<div class="inner">
								<img src="../assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						<li>	
							<div class="inner">
								<img src="../assets/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>
						
						<li>
							<div class="inner">
								<img src="../assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						<li>
							<div class="inner">
								<img src="../assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						
					</ul>
					
				</div>
				
			</div>

             <div v-if="!totalNum" class="cart_empty">您的购物车空空的，点击菜单开始点菜</div>
		</div>
		

       
		
	    <v-navfooter></v-navfooter>
			
		
		<div id="footer_book" class="footer_book">
        	<router-link to="/home">
                <img src="../assets/images/menu.png"/>
                <p>菜单</p>
            </router-link>
		</div>
		
		
		
		<div @click="addOrder()" id="footer_cart" class="footer_cart">
			<img src="../assets/images/doorder.png"/>
			<p>下单</p>
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
                  list:[],
                  peopleList:[],
                  allPrice:0,
                  totalNum:0
            }
        }
        ,sockets:{   
            addcart: function(){  /*接受服务器广播过来的addcart*/
                //更新购物车的数据
                this.getCartData();
            }            
        }
        ,methods:{

                getCartData(){
                    
                    //桌子id  桌子号：是扫描二维码从url获取的

                    var uid=storage.get('roomid');

                    var api=this.api+'api/cartlist?uid='+uid;

                    this.$http.get(api).then((response)=>{
                        // console.log(response);

                        this.list=response.body.result;

                        this.getTotalResult();
                    },(error)=>{
                        console.log(error);
                    })
                },
                decNum(item,key){
                    var uid=storage.get('roomid');

                    //请求远程服务器执行更新操作
                    //桌子id  桌子号：是扫描二维码从url获取的
                    var product_id=item.product_id;
                    var num=item.num;
                    var api=this.api+'api/decCart?uid='+uid+'&product_id='+product_id+'&num='+num;

                    this.$http.get(api).then((response)=>{

                        //修改购物车数据的时候给服务器发消息
                        this.$socket.emit('addcart','addcart');

                        this.getTotalResult();
                    },(error)=>{
                        console.log(error);
                    })



                    if(item.num==1){
                        //删除当前购物车的这条数据
                        this.list.splice(key,1);

                    }else{
                        --item.num;
                    }



                   
                },
                incNum(item){

                        // incCart?uid=a001&product_id=1241241255436246&num=2
                        //请求远程服务器执行更新操作
                        var uid=storage.get('roomid');

                        //桌子id  桌子号：是扫描二维码从url获取的
                        var product_id=item.product_id;
                        var num=item.num;
                        var api=this.api+'api/incCart?uid='+uid+'&product_id='+product_id+'&num='+num;

                        this.$http.get(api).then((response)=>{
                           
                            //修改购物车数据的时候给服务器发消息
                            this.$socket.emit('addcart','addcart');

                            this.getTotalResult();
                        },(error)=>{
                            console.log(error);
                        })


                        ++item.num;
                }
                ,
                /*获取总数量 以及总价格*/
                getTotalResult(){  


                    var allPrice=0;
                    var totalNum=0;

                    for(var i=0;i<this.list.length;i++){

                        allPrice+=parseFloat(this.list[i].price*this.list[i].num);

                        totalNum+=this.list[i].num;
                    }

                    this.allPrice=allPrice;

                    this.totalNum=totalNum;
                },
                //获取用餐人的信息

                getPeopleInfoList(){

                    var uid=storage.get('roomid');

                    var api=this.api+'api/peopleInfoList?uid='+uid;
                    
                    this.$http.get(api).then(response => {

                        console.log(response);
                        this.peopleList=response.body.result[0];

                    }, response => {
                        // error callback
                    });

                },
                addOrder(){  //提交订单

                       var uid=storage.get('roomid');

                       var p_num= this.peopleList.p_num;

                       var p_mark= this.peopleList.p_mark;


                       var total_price=this.allPrice;

                       var total_num=this.totalNum;

                       var order=JSON.stringify(this.list);  /*数组   把json对象转化成json字符串*/

                     
                        var api=this.api+'api/addOrder';

                        this.$http.post(api,{
                            uid,
                            p_num,
                            p_mark,
                            total_price,
                            total_num,
                            order                         
                        }).then((response)=>{                              
                                if(response.body.success){
                                         this.$router.push({ path: 'order' })
                                }else{
                                    alert('提交数据有误');
                                }
                                                
                        },(err)=>{
                            console.log(err);
                        })


                }
        },
        mounted(){



            this.getCartData();
            this.getPeopleInfoList();
        },
        
        components:{

			'v-navfooter':NavFooter
		}
    }
</script>

<style lang="scss">

.cart_content{
    
    padding: 1rem;
    
    /*头部信息*/
    .cart_info{
        
        background: #fff;
        
        h2{
            text-align: center;
            font-size: 1.8rem;
            padding: .8rem 0px;
            border-bottom: 1px solid #eee;
        }
        border-radius:.5rem;
        padding: .5rem;
        .p_number{
            
            
            display: flex;
            
            padding: .5rem 0;
            border-bottom: 1px solid #eee;
            
            .p_number_left{
                
                flex: 1;
                
                 
                p{
                    line-height: 2;
                    
                    &:first-child{
                        
                        color: red;
                    }
                }
            }
            
            .p_number_right{
                width: 4rem;
                height: 4rem;
                text-align: center;
                
                img{
                    
                    width: 1.8rem;
                    height: 1.8rem;
                    margin: 0 auto;
                }
            }
            
            
            
        }
        
        /*购物车总数量*/
        
        
       .cart_p_num{
           border-bottom: 1px solid #eee;
           p{
               
               line-height: 2;
               
               .price{
                   
                   font-size: 2.4rem;
                   color:red;
               }
           }
       }
        
        
    }
    /*购物车列表*/
   
   .cart_list{
       margin-top: 1rem;
       
       padding: .5rem;
       
       background: #fff;
       
       border-radius: .5rem;
       
       
       
       display: flex;
       
       ul{
           width: 100%;
           
             .item{
                    display: flex;
                    width:100%;
                    
                     border-bottom: 1px solid #eee;
                    
                    padding: 1rem 0px;
                   .left_food{
                       flex: 1;
                       
                       display: flex;                       
                       img{
                            width: 4rem;
                            height: 4rem;
                            border-radius: 10%;
                            margin-right: .8rem;
                                                   
                       }
                       
                       .food_info{
                           
                           flex: 1;
                       }
                       
                       
                   }
                   
                   .right_cart{
                       
                       width: 10rem;
                   }
           }
       }
     
       
      
   }
   
   /*最长点的菜*/
  
  .hot_food{
      
      background: #fff;
      
      margin-top: 1rem;
      
      border-radius: .5rem;
      
      margin-bottom: 4rem;
      
      h3{
          
          font-size: 1.4rem;
          
          padding: .5rem 0px;
      }
      
      .item_list_outer{
          
            width: 100%;
            
            overflow-x:auto;
            .item_list{
          
             
                padding: 0px .5rem;                
                width: 50rem;
                
                li{
                    
                        width: 8rem;
                        padding: .5rem;
                        box-sizing: border-box;                    
                        float: left;
                        
                        .inner{
                                background: #fff;
                                width: 100%;
                                border-radius: .5rem;
                                overflow: hidden;
                                
                                img{
                                    
                                    width:100%;
                                }
                                
                        }
                }
          }
      
          
      }
    
      
      
       
  }
    
    
}

/*购车加减*/
.cart_num{
          
      width: 10rem;      
      
      display: flex;
      margin-top: .8rem;
      
      
      .input_left,.input_right{
          flex: 1;
          
          width: 2.8rem;
          height: 2.8rem;
          
          line-height: 2.8rem;
          
          text-align: center;
          
          color: red;
          
          border: 1px solid #eee;
          
          font-size: 2.4rem;
      }    
      
      .input_center{
          
          flex: 1;
          
          input{
              
               width: 2rem;
               text-align: center;
                width: 100%;
                height: 2.8rem; 
                border: none;
                
                 border-top: 1px solid #eee;
                 
                 border-bottom: 1px solid #eee;
          
                 float: left;
          }
      }
  }
  


/*购车空*/


.cart_empty{
    
    text-align: center;
    line-height: 3;
    
    h3{
        font-size: 1.8rem;
    }
}

</style>