<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.keyword">
      </el-input>

      <!--      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="重要性">-->
      <!--        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
      <!--        </el-option>-->
      <!--      </el-select>-->

      <!--      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">-->
      <!--        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
      <!--        </el-option>-->
      <!--      </el-select>-->

      <!--      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">-->
      <!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--        </el-option>-->
      <!--      </el-select>-->

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <!--      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>-->
      <!--      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
      <!--      <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="举报信息" width="125">
          <template scope="scope">
            <span>{{scope.row.informInfo}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述" width="65">
          <template scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" width="120">
          <template scope="scope">
            <img :src="scope.row.image"  min-width="70" height="70" />
          </template>
        </el-table-column>

      <el-table-column align="center" label="状态" width="80">
        <template scope="scope">
          <span v-if="scope.row.status=='1'">已处理</span>
          <span v-if="scope.row.status=='0'">未处理</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="170">
        <template scope="scope">
          <span v-if="scope.row.status=='0'" class="link-type" @click="handleRecover(scope.row)">处理</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import { fetchInformList } from 'api/inform_table';
  import waves from '@/directive/waves.js';// 水波纹指令
  import { parseTime } from 'utils';
  import { MessageBox } from 'element-ui'
  const calendarTypeOptions = [
    { key: 'CN', display_name: '中国' },
    { key: 'US', display_name: '美国' },
    { key: 'JP', display_name: '日本' },
    { key: 'EU', display_name: '欧元区' }
  ];



  // arr to obj
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc
  }, {});

  export default {
    name: 'table_demo',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          keyword: undefined,
          type: undefined,
          sort: '+id'
        },
        temp: {
          id: undefined,
          title: '',
          type: '',
          city:'',
          county: '',
          town:'',
          street:'',
          houseNumber:'',
          area:'',
          sellingPrice:'',
          electricity:'',
          contacts:'',
          phone:'',
          houseType:'',
          houseUseType:'',
          floor:'',
          fireControl:'',
          background:'',
          houseStatus:'',
          coverArea:'',
          houseEdge:'',
          singlePrice:'',
          useArea:'',
          signContract:'',
          description:'',
          trade:'',
          expireDate:''
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        showAuditor: false,
        tableKey: 0
      }
    },
    created() {
      this.getList();
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    mounted(){
      this.getCityList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchInformList(this.listQuery).then(response => {
          this.list = response.data.data.houseInfoList;
          this.total = response.data.data.total;
          this.listLoading = false;
        })
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined;
          this.listQuery.end = undefined;
          return;
        }
        this.listQuery.start = parseInt(+time[0] / 1000);
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
      },
      handleModifyStatus(id, userId, applyType) {
        passAudit(id, userId, applyType).then(response => {
          this.flag = response.data.flag;
          if (response.data.flag) {
            this.$message({
              message: '审核通过',
              type: 'success'
            });
            this.getList();
          }
        });
      },    
      handleRecover(row) {
        MessageBox.confirm('您确定删除该房源么', '确定删除', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHouse(row.id).then(response => {
            // this.flag = response.data.flag;
            if(response.data.flag == 1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
          })
        })
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp;
        updateHouse(this.temp).then(response => {
          // this.flag = response.data.flag;
          if(response.data.flag == 1){
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
            this.getList();
          }
        })

        this.dialogFormVisible = false;

      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          status: 'published',
          type: ''
        };
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
          const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, 'table数据');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getCityList(cityName){
        // let cityName = this.$route.query.city
        this.temp.county=''
        this.temp.town = ''
        cityList().then(response => {
          this.cityList = response.data.data;
        })
        this.city = cityName
        this.getCountyList()
      },

      getCountyList(countyName){
        // alert(this.city)
        this.temp.town = ''
        countyList(this.city).then(response => {
          this.countyList = response.data.data;
        })
        this.county = countyName
        this.getTownList()
      },
      getTownList(){
        // alert(this.county)
        townList(this.county).then(response => {
          this.townList = response.data.data;
        })
      },
      selectCity(val){

        this.cityList = []
        this.countyList = []
        this.townList = []
        this.getCityList(val)
      },
      selectCounty(val){
        this.countyList = []
        this.townList = []
        this.getCountyList(val)
      },
      selectTown(val){
        this.townList = []
        this.getTownList(val);


      },
    }
  }
</script>
