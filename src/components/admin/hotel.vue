<template>
<div class="">
    <table class="table" border="0" style="margin-left: 10%; width: 80%; margin-top: 50px; margin-bottom: 50px;">
        <tbody>
        <tr style="background-color: #ddd">
            <th>酒店名称</th>
            <th>地址</th>
            <th>距离学校公里</th>
            <th>单间协议价</th>
            <th>标间协议价</th>
        </tr>
        <tr v-for="i in hotel">
            <td>
                <el-input
                    placeholder="请输入内容"
                    v-model="i.hotelName"
                    :disabled="tableVaule">
                </el-input>
            </td>
        </tr>
        <tr style="background-color: #ddd">
            <td>
                <el-input
                        placeholder="请输入内容"
                        v-model="i.hotelAddress"
                        :disabled="tableVaule">
                </el-input>
            </td>
        </tr>
        <tr>
            <td>
                <el-input
                        placeholder="请输入内容"
                        v-model="i.distance"
                        :disabled="tableVaule">
                </el-input>
            </td>
        </tr>
        <tr style="background-color: #ddd">
            <td>
                <el-input
                        placeholder="请输入内容"
                        v-model="i.singlePrice"
                        :disabled="tableVaule">
                </el-input>
            </td>
        </tr>
        <tr>
            <td>
                <el-input
                        placeholder="请输入内容"
                        v-model="i.standardPrice"
                        :disabled="tableVaule">
                </el-input>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
    export default {
        name: "hotel",
        data(){
            return{
                tableVaule:true,
                hotel:[
                    {
                        hotelName:"酒店名字",
                        hotelAddress:"酒店地址",
                        distance:"酒店距离",
                        singlePrice:"单间协议价",
                        standardPrice:"标间协议价"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
        word-break: break-all;
        letter-spacing: 2px;
    }
    html {
        line-height: 1.15; /* Correct the line height in all browsers */
        -webkit-text-size-adjust: 100%; /* Prevent adjustments of font size after orientation changes in iOS. */
    }
    body {
        margin: 0;
        background-color: #fff;
    }
    a {
        background-color: transparent; /* Remove the gray background on active links in IE 10. */
        text-decoration: none;
        font-family: Georgia;
        color: #119;
    }
    img {
        border-style: none; /*  Remove the border on images inside links in IE 10. */
        margin: 0px;
        padding: 0px;
    }
    .after {
        border-left: solid 10px #133;
        padding-left: 15px;
    }
    .header {
        width: 100%;
        height: auto;
    }
    .guide > img {
        display: none;
    }
    /**************************/
    .guide {
        width: 100%;
        height: auto;
        background-color: #133;
        box-shadow: 0 0px 10px #888;
    }
    #guide_a > a{
        padding: 20px 0px;
        color: #fff;
        white-space:nowrap;
        font-size: 20px;
        transition: color 0.3s;
    }
    #guide_ul > li > a{
        white-space:nowrap;
        line-height: 30px;
        font-size: 15px;
        color: white;
    }
    @media screen and (min-width: 700px) {
        #guide_a > a{
            line-height: 70px;
        }
        .guide > ul > li {
            padding: 20px 0px;
            position: relative;
            padding: 0;
            display: inline;
            margin: 0 20px;
        }
        #guide_ul{
            position: absolute;
            padding: 13px 25px;
            color: #fff;
            left: 0px;
            opacity: 0;
            top: 50px;
            z-index: -1;
            visibility: hidden;
            list-style: none;
            background-color: #122;
            border-top: solid 3px #599;
            transition: top 0.3s, opacity 0.3s;
        }
        .guide2 {
            display: none;
        }

    }

    @media screen and (max-width: 700px) {
        #guide_a > a{
            line-height: 50px;
        }
        .guide > ul > li {
            display: list-item;
            margin: 0px;
            padding: 0px;
            list-style: none;
        }
        #guide_ul{
            display: none;
        }
        .guide2 {
            display: block;
            margin-top: 15px;
            margin-left: 10%;
        }
        .guide2 > a{
            line-height: 35px;
            white-space:nowrap;
            color: #133;
            font-family: "";
        }.guide2 > a:hover{
             color: #399;
         }

    }

    /*************************/
    #guide_a:hover > a{
        color: #599;
    }
    #guide_ul > li:hover > a{
        color: #599;
    }
    #guide_ul:hover ,
    #guide_a:hover > #guide_ul {
        visibility: visible;
        z-index: 1001;
        opacity: 1;
        top:40px;
    }
    .text {
        width: 80%;
        height: auto;
        background-color: #fff;
        margin: 50px auto;
    }
    .text > p {
        font-size: 18px;
        line-height: 28px;
    }
    .icon {
        margin: 30px auto;
        text-align: center;
        width: 90%;
    }
    .icon > a > img {
        width: 20%;
        min-width: 100px;
        margin: 20px 30px;
    }
    .end {
        width: 100%;
        height: auto;
        background-color: #122;
        text-align: center;
    }
    .etext {
        width: 100%;
        height: auto;
        padding-top: 40px;
        padding-bottom: 40px;
    }
    .etext> span {
        font-size: 15px;
        color: #ddd;
    }
</style>
