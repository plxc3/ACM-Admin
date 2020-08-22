<template>
    <div class="app-container">
        <el-page-header @back="goBack" content="访问统计页面">
        </el-page-header>

        <!--表单-->
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-select v-model="enddata.type" clearable placeholder="请选择">
                    <el-option label="学校登录数统计" value="login_num"/>
                    <el-option label="学校注册数统计" value="register_num"/>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-date-picker
                        v-model="enddata.begin"
                        type="date"
                        placeholder="选择开始日期"
                        value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        v-model="enddata.end"
                        type="date"
                        placeholder="选择截止日期"
                        value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-button
                    :disabled="btnDisabled"
                    type="primary"
                    icon="el-icon-search"
                    @click="showChart()">查询</el-button>
        </el-form>

        <div class="chart-container">
            <div id="chart" class="chart" style="height:500px;width:100%" />
        </div>
    </div>
</template>

<script>
    import staApi from "../../api/sta";
    import echarts from 'echarts'
    export default {
        name: "show",
        data() {
            return {
                enddata: {
                    type:'',
                    end:'',
                    begin:''

                },
                btnDisabled: false,
                chart: null,
                title: '',
                xData: [],
                yData: []
            }
        },
        methods: {
            showChart() {
                console.log(this.enddata)
                staApi.show(this.enddata)
                    .then(res=>{
                        console.log(res)
                        this.xData=res.data.date_calculatedList
                        this.yData=res.data.numDataList
                        //调用下面成图表的方法，改变值
                        this.setChart()
                    })
            },

            goBack(){
                this.$router.push({path:"/adminManage"})
            },

            // 准备图表数据
            initChartData() {

            },

            // 设置图标参数
            setChart() {
                // 基于准备好的dom，初始化echarts实例
                this.chart = echarts.init(document.getElementById('chart'))
                // console.log(this.chart)


                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    dataZoom: [{
                        show: true,
                        height: 30,
                        xAxisIndex: [
                            0
                        ],
                        bottom: 30,
                        start: 10,
                        end: 80,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'

                        },
                        textStyle: {
                            color: '#fff'
                        },
                        borderColor: '#90979c'
                    },
                        {
                            type: 'inside',
                            show: true,
                            height: 15,
                            start: 1,
                            end: 35
                        }],
                    title: {
                        text: '数据统计'
                    },
                    // x轴是类目轴（离散数据）,必须通过data设置类目数据
                    xAxis: {
                        type: 'category',
                        data: this.xData,
                    },
                    // y轴是数据轴（连续数据）
                    yAxis: {
                        type: 'value'
                    },
                    // 系列列表。每个系列通过 type 决定自己的图表类型
                    series: [{
                        // 系列中的数据内容数组
                        data: this.yData,
                        // 折线图
                        type: 'line'
                    }]
                }
                this.chart.setOption(option)
            }
        }
    }
</script>

<style scoped>

</style>
