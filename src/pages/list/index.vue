<template>
  <div class="shell">
    <div class="content">内容</div>
    <a href="weixin://">打开微信</a>
    <a href="alipays://">打开支付宝</a>
    <el-button @click="handler">点击</el-button>
    <img src="../../assets/images/1.jpg" style="width: 200px" alt="" />
    <div id="main" style="width: 500px; height: 500px"></div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
     <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "list",
  data() {
      return {
        value1:'',
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
  methods: {
     handleNodeClick(data) {
        console.log(data);
      },
    handler() {
      this.$router.push({
        name: "my",
      });
    },
  },
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>
<style scoped lang="scss">
.shell {
  height: 1000px;
}
.content {
  transform: rotate(4deg);
  color: red;
  width: 100px;
}
</style>
