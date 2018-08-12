<template>
    
    <div id="home">
        <header class="index_header">
			
			<div class="hlist">
				<img src="../assets/images/rexiao.png"/>
				<p>热销榜</p>				
			</div>
			
			<div class="hlist">
				<img src="../assets/images/caidan.png" />
				<p>点过的菜</p>				
			</div>
			<div class="hlist">
				
				<img src="../assets/images/sousuo.png"/>
				<p>搜你喜欢</p>				
			</div>
			
		</header>
		
		<aside class="left_cate" id="left_cate">
				<ul>
					<li v-for="(item,key) in list" @click="changeList(key)">{{item.title}}</li>				
				</ul>				
				<div id="nav_cate" class="nav_cate">
					<img src="../assets/images/nav.png"/>
					<p>菜单</p>
				</div>
				
				
		</aside>
		
		
		<div class="content">
			
			
			<div class="item" v-for="item in list">
				
				<h3 class="item_cate">{{item.title}}</h3>
				
				<ul class="item_list">
					<li v-for="food in item.list">	
						<div class="inner">

							<router-link :to="'/pcontent?id='+food._id">
								<img :src="api+food.img_url" />
								<p class="title">{{food.title}}</p>						
								<p class="price">¥{{food.price}}</p>
							
							</router-link>							
						
						</div>		
					</li>
					
					
					
				</ul>
				
			</div>
			
		</div>
		
		<div class="bg" id="bg">
			
			
		</div>
		

		<v-navfooter></v-navfooter>


		<div id="footer_cart" class="footer_cart">
            <router-link to="/cart">
                    <img src="../assets/images/cart.png"/>
                    <p>购物车</p>
            </router-link>	
            <span class="num" v-if="cartNum">{{cartNum}}</span>
		</div>

    </div>
</template>


<script>

	//引入NavFooter组件
	import NavFooter from './public/NavFooter.vue';

    import storage from '../model/storage.js';


	//引入配置文件

	import Config from '../model/config.js';

    export default{

        data () {  /*数据*/
            return {
				  list:[],
				  api:Config.api,
                  cartNum:0
            }
        }, 
         sockets:{   
            addcart: function(){  /*接受服务器广播过来的addcart*/
                //更新购物车的数量
                this.getCartCount();
            }            
        },
		methods:{  /*方法*/

			asideDomInit(){
					//按钮
			  		var navCate=document.getElementById('nav_cate');
			  		//分类
			  		var leftCate=document.getElementById('left_cate');
			  		
			  		//背景			  		
			  		var bg=document.getElementById('bg');
			  		var flag=true;			  		
			  		bg.onclick=navCate.onclick=function(){
			  			
			  			if(flag){			  				
			  				flag=false;
			  				leftCate.style.transform='translate(0,0)';			  				
			  				bg.style.display='block';			  				
			  			}else{	
			  				
			  				flag=true;
			  				leftCate.style.transform='translate(-100%,0)';
			  				
			  				bg.style.display='none';
			  			}
			  			
			  		}	

			},
			requestData(){


				var api=this.api+'api/productlist'
				//this  要注意指向
				this.$http.get(api).then(response => {

					console.log(response);

					this.list=response.body.result;


				}, response => {
					// error callback
				});

			},
            changeList(key){
              
                // alert(key);

                //itemCatesDom[key].offsetTop获取右侧分类距离顶部的高度
                
                var itemCatesDom=document.querySelectorAll('.item_cate');
                document.documentElement.scrollTop=itemCatesDom[key].offsetTop;
                //分类
                var leftCate=document.getElementById('left_cate');                
                //背景			  		
                var bg=document.getElementById('bg');
                leftCate.style.transform='translate(-100%,0)';
			    bg.style.display='none';
            },
            getCartCount(){/*获取购物车的数量*/

                  //桌子id  桌子号：是扫描二维码从url获取的

                var uid=storage.get('roomid')  || 1;

                var api=this.api+'api/cartCount?uid='+uid;

                this.$http.get(api).then((response)=>{

                    console.log(response.body.result);

                    this.cartNum=response.body.result;

                },(err)=>{

                    console.log(err);
                })


            }

		},
		mounted(){   /*生命周期函数*/

			this.asideDomInit();
			this.requestData();
            this.getCartCount();

		},components:{

			'v-navfooter':NavFooter
		}
    }
</script>

<style lang="scss">

.index_header{
    
    width: 96%;
    
    margin: 0 auto;
    
    height: 4.4rem;
    
    
    background: #fff;
    margin-top:1rem;
    
    display: flex;
    border-radius: .5rem;
    
    .hlist{
        
        flex: 1;
        text-align: center;
        padding-top: .2rem;
        border-right: 1px solid #eee;
        
        img{
            width: 2rem;
            height: 2rem;
            margin: 0 auto;
        }
        
        &:last-child{
            
            border-right: none;
        }
    }
    
    
}

/*列表*/
.item{
    
    .item_cate{
        text-align: center;
        
        padding: .5rem;
    }
    
    .item_list{
        
        display: flex;
        
        flex-wrap: wrap;
        
        padding: 0px .5rem;
        
        li{
            width: 33.3%;
            padding: .5rem;
            
            box-sizing: border-box;
            
                  
            .inner{
                
                background: #fff;                
                width: 100%;
                 border-radius: .5rem;    
                 overflow: hidden; 

                 a{
                     color:#666;

                     text-decoration:none;
                 }
                img{
                    width: 100%;

                    height:6rem;
                }
                p{
                    
                    padding: .2rem .5rem;
                    
                }
                
                .title{
                    
                    font-weight: bold;
                }
                
                
            }
        }
    }
}



/*侧边栏*/


.left_cate{
    
    /*css3运动  加过渡效果*/   
    transition: all .5s;
    
    transform: translate(-100%,0);
    
    z-index: 2;
    
    
    
    width: 6rem;
    
    height: 100%;
    
    position: fixed;
    
    background: #eee;
    top:0px;
    left: 0px;
    
    ul{
        position: absolute;
        
        height: 100%;
        padding: .5rem;
        
        z-index: 3;
        
        background: #eee;
        li{
            
            line-height: 4.4rem;
        }
    }
    
    
    
    .nav_cate{
        
        position: absolute;
        
        right: -3.5rem;
        
        background: rgba(132, 128, 128, 0.9);
        top:42%;
        
        width: 5rem;
        
        height: 4rem;
        text-align: center;
        
        border-radius: 0rem 50% 50% 0rem;
        
         z-index: 2;
        img{
            
            width: 1.8rem;
            
            height: 1.8rem;
            
            margin-left: 1rem;
            
            margin-top: .4rem;
            
        }
        p{
            color: #fff;
            margin-left: 1rem;
            
            margin-top:-0.3rem
        }
    }
}


/*透明层*/

.bg{
    
    position: fixed;
    
    width: 100%;
    height: 100%;
    
    background: rgba(132, 128, 128, 0.4);
    
    left: 0px;
    
    top:0px;
    z-index: 1;
    
    display: none;
    
    
}


</style>