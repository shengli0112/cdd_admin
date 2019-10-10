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

      <!--<el-table-column width="180px" align="center" label="时间">
        <template scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>-->

      <el-table-column align="center" label="园区名" width="125">
        <template scope="scope">
          <span>{{scope.row.parkName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="城市" width="140">
        <template scope="scope">
          <span>{{scope.row.city}}-{{scope.row.county}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="区域" width="90">
        <template scope="scope">
          <span>{{scope.row.town}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" width="120">
        <template scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总面积" width="90">
        <template scope="scope">
          <span>{{scope.row.totalArea}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总价" width="100">
        <template scope="scope">
          <span>{{scope.row.totalPrice}}</span>

        </template>
      </el-table-column>

      <el-table-column align="center" label="适合行业" width="120">
        <template scope="scope">
          <span>{{scope.row.industry}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="标签" width="120">
        <template scope="scope">
          <span>{{scope.row.tag}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="园区介绍" width="120"  show-overflow-tooltip>
        <template scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="80px" label="公司名">
         <template scope="scope">
           <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.companyName}}</span>
 &lt;!&ndash;          <el-tag>{{scope.row.type | typeFilter}}</el-tag>&ndash;&gt;
         </template>
       </el-table-column>

       <el-table-column width="200px" align="center" label="公司地址">
         <template scope="scope">
           <span>{{scope.row.address}}</span>
         </template>
       </el-table-column>;


       <el-table-column width="120px" label="注册日期">
         <template scope="scope">
           <span>{{scope.row.registerDate}}</span>
 &lt;!&ndash;          <icon-svg v-for="n in +scope.row.importance" icon-class="wujiaoxing" class="meta-item__icon" :key="n"></icon-svg>&ndash;&gt;
         </template>
       </el-table-column>-->

      <el-table-column align="center" label="联系人" width="95">
        <template scope="scope">
          <span>{{scope.row.contacts}}</span>
          <!--        <span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="130">
        <template scope="scope">
          <span>{{scope.row.phone}}</span>
          <!--          <span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="180">
        <template scope="scope">
          <span>{{scope.row.createTs | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="80">
        <template scope="scope">
          <span v-if="scope.row.status=='1'">可用</span>
          <span v-if="scope.row.status=='0'">已删除</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="170">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">修改</span>
          <span v-if="scope.row.status=='1'" class="link-type" @click="handleDelete(scope.row)">删除</span>
          <span class="link-type" @click="handleTop(scope.row)">置顶</span>
          <span v-if="scope.row.status=='0'" class="link-type" @click="handleRecover(scope.row)">恢复</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="园区名">
          <el-input v-model="temp.parkName"></el-input>
        </el-form-item>

        <el-form-item label="区域">
          <el-select class="filter-item" v-model="temp.city" clearable filterable placeholder="请选择" @change="selectCity"
                     label-width="70px">
            <el-option v-for="item in  cityList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select class="filter-item" v-model="temp.county" clearable filterable placeholder="选择县/区"
                     @change="selectCounty" label-width="70px">
            <el-option v-for="item in  countyList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select class="filter-item" v-model="temp.town" learable filterable placeholder="选择镇" @change="selectTown"
                     label-width="70px">
            <el-option v-for="item in  townList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>

        <el-form-item label="总面积">
          <el-input v-model="temp.totalArea"></el-input>
        </el-form-item>

        <el-form-item label="总价">
          <el-input v-model="temp.totalPrice"></el-input>
        </el-form-item>

        <el-form-item label="适合行业">
          <el-input v-model="temp.industry"></el-input>
        </el-form-item>

        <el-form-item label="标签">
          <el-input v-model="temp.tag"></el-input>
        </el-form-item>

        <el-form-item label="园区介绍">
          <el-input v-model="temp.description"></el-input>
        </el-form-item>

        <el-form-item label="联系人">
          <el-input v-model="temp.contacts"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="temp.phone"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import { fetchSellList, deleteSell, recoverSell, cityList, countyList, townList } from 'api/sell_park_table';
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
        cityList:null,
        temp: {
          id: undefined,
          parkName: '',
          city: '',
          county: '',
          town: '',
          address: '',
          totalArea: '',
          totalPrice: '',
          industry: '',
          tag: '',
          description: '',
          phone: ''
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
        fetchSellList(this.listQuery).then(response => {
          this.list = response.data.data.sellParkList;
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
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleRecover(row) {
        MessageBox.confirm('您确定恢复该园区么', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recoverSell(row.id).then(response => {
            // this.flag = response.data.flag;
            if(response.data.flag  == 1){
              this.$notify({
                title: '成功',
                message: '恢复成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
          })
        })
      },
      handleTop(row) {
        MessageBox.confirm('您确定置顶该房源么', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          topHouse(row.id).then(response => {
            // this.flag = response.data.flag;
            if(response.data.flag  == 1){
              this.$notify({
                title: '成功',
                message: '置顶成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
          })
        })
      },
      handleDelete(row) {
        MessageBox.confirm('您确定删除该园区么', '确定删除', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSell(row.id).then(response => {
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
      create() {
        this.temp.id = parseInt(Math.random() * 100) + 1024;
        this.temp.timestamp = +new Date();
        this.temp.author = '原创作者';
        this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        });
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp;
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v);
            this.list.splice(index, 1, this.temp);
            break;
          }
        }
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
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

        cityList().then(response => {
          this.cityList = response.data.data;
        })
        this.city = cityName
        this.getCountyList()
      },

      getCountyList(countyName){
        // alert(this.city)
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

      },
    }
  }
</script>
