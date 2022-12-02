<template>
<!-- 首页 -->
    <div class="index">
        <div class="left">
            <h1>你好，李缘琪！</h1>
            <div class="dis">
                <p>轻松工作 高校办公</p>
                <p>协同办公 让工作更简单</p>
            </div>
            <div class="cir">
                <div class="item">
                    <div class="itemci one">1</div>
                    <p>先进的技术</p>
                </div>
                <div class="item">
                    <div class="itemci two">2</div>
                    <p>强大的团队</p>
                </div>
                <div class="item">
                    <div class="itemci three">3</div>
                    <p>丰富的经验</p>
                </div>
            </div>
        </div>
        <div class="right">
            <img :src= "require('../../assets/imgs/banner.e96934b9.png')" alt="" />
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.index{
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: .5rem;
    width: 100%;
    min-width: 7.2rem;
    height: 100%;
    border-radius: .05rem;
    box-shadow: .05rem .05rem .05rem #ccc;
    .left{
        // height: 4rem;
        width: 40%;
        // border: .01rem solid #f00;
        h1{
            font-size: .3rem;
            text-align: center;
            font-weight: 600;
            margin: .3rem 0;
        }
        .dis{
            font-size: .2rem;
            padding-left: .1rem;
            font-weight: 600;
            color: #a6acad;
            width: 2.6rem;
            // margin:0 0 .5rem .11rem;
            border-left: .04rem solid #a6acad;
            // border: 1px solid #f00;
            p{
                margin-bottom: .2rem;
            }
        }
        .cir{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .item{
                width: .7rem;
                .itemone{
                    width: .7rem;
                    height: .7rem;
                    border-radius: .35rem;
                    background: #26a6ff;
                }
                .itemci {
                    width: .7rem;
                    height: .7rem;
                    text-align: center;
                    line-height: .7rem;
                    font-size: .2rem;
                    color: #fff;
                    border-radius: .35rem;
                }
                .one{
                    background: #26a6ff;
                }
                .two{
                    background: #fe3950;
                }
                .three{
                    background: #5ce055;
                }
                p{
                    font-size: .14rem;
                }
            }
        }
    }
    .right{
        // height: 3rem;
        width: 40%;
        img{
            // height: 3rem;
            width: 100%;
        }
    }
}
</style>