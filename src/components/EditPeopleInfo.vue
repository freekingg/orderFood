<template>
    
    <div id="start">
    
           
         <div  class="start_content">			
                
                <header class="start_header">				
                    <img src="../assets/images/canju.png"/> 修改用餐人数
                </header>			
                
                <p class="notice">请选择正确的用餐人数</p>
                            
                <div class="content"> 
                    <ul class="user_list">
                        <li v-for="(item,key) in userList" :class="{'active':parseInt(peopleList.p_num)==key+1}">						
                            <span>{{item}}</span>
                        </li>                
                                                              
                    </ul>

                    <div class="mark_input">
                        <input type="text" v-model='p_mark' placeholder="请输入您的口味要求，忌口等（可不填）"/>
                    </div>
    
                   
                    <ul class="mark_list">
                        <li>						
                            <span>打包带走</span>
                        </li>
                        <li>
                            <span>
                               不要放辣椒
                            </span>
                        </li>
                        <li>
                            <span>
                               微辣
                            </span>
                        </li>
                    </ul>
                    
                </div>

               
                    
            </div>
            
         
           
            <div id="start_cancel" class="start_cancel">
                <router-link to="/cart">                
                    <span>
                            取消
                    </span>     
                </router-link>               
            </div>
           
            <div id="start_ok" class="start_ok" @click="addPeopleInfo()">                
                <span>
                        确定修改
                </span>                
            </div>
           


    </div>
</template>


<script>


        //引入config

    import  Config from '../model/config.js'


    import storage from '../model/storage.js';

    export default{

        data () {
            return {
                 'p_num':'1人',
                 'p_mark':'',
                 'api':Config.api,
                 'peopleList':[],
                 'userList':[]
            }
        },
        
        methods:{
            addChangeEnvet(){

                var that=this;/*保存this*/
                
                
                //人数的dom操作
                var userLis=document.querySelectorAll('.user_list li');
                // alert(lis)

                for(var i=0;i<userLis.length;i++){
                    userLis[i].onclick=function(){

                        //去掉所有的li的class，让当前点击的li的class等于active

                        for(var j=0;j<userLis.length;j++){
                            userLis[j].className='';
                        }
                        this.className='active';   //this 就是li这个dom节点

                        //trim()表示去除空格

                        that.p_num=this.querySelector('span').innerHTML.trim();

                    }

                }




                 //口味的dom操作
                 var markLis=document.querySelectorAll('.mark_list li');           

                for(var i=0;i<markLis.length;i++){
                    markLis[i].onclick=function(){

                        for(var j=0;j<markLis.length;j++){
                            markLis[j].className='';
                        }
                        this.className='active';   //this 就是li这个dom节点

                        that.p_mark= that.p_mark+' '+this.querySelector('span').innerHTML.trim();
                    }

                }


            }
            ,addPeopleInfo(){

                //桌子id  桌子号：是扫描二维码从url获取的

                var uid=storage.get('roomid');

                var api=this.api+'api/addPeopleInfo';
                this.$http.post(api,{
                    uid:uid,                 
                    p_num:this.p_num,
                    p_mark:this.p_mark                                       
                }).then((response)=>{
                    if(response.body.success){

                        this.$router.push({ path: 'cart' })
                    }                                        
                },(err)=>{
                    console.log(err);
                })

            },
            //获取用餐人的信息

            getPeopleInfoList(){
                 //桌子id  桌子号：是扫描二维码从url获取的
                var uid=storage.get('roomid');


                var api=this.api+'api/peopleInfoList?uid='+uid;
                
                this.$http.get(api).then(response => {

                    this.peopleList=response.body.result[0];


                    this.p_mark= this.peopleList.p_mark;

                }, response => {
                    // error callback
                });

            }
        },
        mounted(){


            for(var i=0;i<12;i++){

                this.userList.push(i+1+'人');
            }
            //数据渲染完成操作dom                    
            this.$nextTick(function(){

                this.addChangeEnvet();
            })


            this.getPeopleInfoList();
        }
    }
</script>

<style lang="scss">

.start_content{
    
    
    
    .start_header{
        
        height: 3.2rem;
        
        line-height: 3.2rem;
        background: #000;
        
        color: #fff;
        
        width: 10rem;
        
        margin: 5rem auto 0rem auto;
        
        border-radius: .5rem;
        
        img{
            
            height:2.2rem;
            
            line-height: 2.2rem;
            position: relative;
            
            top:.5rem;
            margin-left: 1rem;
        }
    }
    
    
    .notice{
        
        color: red;
        //
        text-align: center;
        
        
        margin:1rem 0rem;
        
        
    }
    

    .mark_input{
        padding: 1rem;

        input{

            height: 3rem;
            line-height:3rem;

            width:100%;
            border:1px solid #eee;
        }

    }
    .user_list,.mark_list{
        
        display: flex;
        
        flex-wrap: wrap;
        padding: .5rem;
        
        li{
            
             width: 25%;
             padding: .5rem;             
             box-sizing: border-box;   /*盒子的宽度=盒子本身宽度    默认 盒子的宽度=盒子的宽度+padding+border*/
             
             span{
                 
                 display: block;
                 
                 width: 100%;
                 height: 3.2rem;
                 
                 line-height: 3.2rem;
                 text-align: center;
                 background: #fff;
                 border-radius: .5rem;
                 border: 1px solid #ccc;
             }
            
        }

        li.active{

              span{
                 
                
                 background: red;                 
                 border: 1px solid red;

                 color:#fff;
             }
        }
        
        
    }
}

.start{
    
    position: fixed;
    
    bottom: 5rem;
    
    left: 50%;
    margin-left: -3rem;
    
    width: 6rem;
    
    height: 6rem;
    
    border-radius: 50%;
    
    background: red;
    color: #fff;
    
    span{
        
        display: block;
        
        width: 2rem;
        
        margin: 0 auto;
        
        position: relative;
        
        top:1.5rem;
    }
    
  }




.start_ok{
    
    position: fixed;
    
    bottom: 4rem;
    
    right:6rem;
    
    
    width: 4rem;
    
    height: 4rem;
    
    border-radius: 50%;
    
    background: red;
    color: #fff;
    
    span{
        
        display: block;
        
        width: 2rem;
        
        margin: 0 auto;
        
        position: relative;
        
        top:0.5rem;
    }
    a{
        color:#fff;
    }
    
  }
  .start_cancel{
    
    position: fixed;
    bottom: 4rem;
    
    left:6rem;
    
    
    width: 4rem;
    
    height: 4rem;
    
    border-radius: 50%;
    
    background: red;
    color: #fff;
    
    span{
        
        display: block;
        
        width: 2rem;
        
        margin: 0 auto;
        
        position: relative;
        
        top:1.5rem;
    }
    a{
        color:#fff;
    }
    
  }



</style>