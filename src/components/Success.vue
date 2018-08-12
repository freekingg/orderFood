<template>
    
    <div>
    
            <div class="success">

                <img src="../assets/images/success.png">

                <div class="s_right">
                    <h2>支付成功</h2>
                    <p>期待您再次光临</p>
                </div>
            </div>

            <ul class="list">

                <li>

                    <div class="left">
                        订单状态
                    </div>
                    <div class="right">
                        已完成
                    </div>
                </li>
                <li>

                    <div class="left">
                       桌号
                    </div>
                    <div class="right">
                       a001
                    </div>
                </li>
                <li>

                    <div class="left">
                        人数
                    </div>
                    <div class="right">
                        12
                    </div>
                </li>
                <li>

                    <div class="left">
                        订单号
                    </div>
                    <div class="right">
                        121412412512512
                    </div>
                </li>

                <li>

                    <div class="left">
                        结账时间
                    </div>
                    <div class="right">
                        2018-04-15
                    </div>
                </li>
                
                <li>

                    <div class="left">
                        支付金额
                    </div>
                    <div class="right">
                        ¥79
                    </div>
                </li>
            </ul>
    </div>
</template>


<script>
    export default{

        data () {
            return {
                    msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            console.log(this.$route.query);
        }
    }
</script>

<style lang="scss">
    .success{
        width: 15rem;
        margin: 4rem auto;
        display:flex;
        border:1px solid #eee;
        border-radius: 20px;
        background: #fff;
        img{
            width: 6rem;
            height: 6rem;
        }
        .s_right{
            padding-left: 1rem;
            flex: 1;
            padding-top:1rem;
        }
    }

    .list{
        background: #fff;
        padding:10px;

        li{
            display: flex;
            line-height: 2;

            .left{
                width: 100px;
            }
            .right{
                flex: 1;
                text-align: right;
            }
        }
    }
</style>