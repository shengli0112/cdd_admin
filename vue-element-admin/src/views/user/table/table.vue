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
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
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

      <el-table-column align="center" label="用户名" width="125">
        <template scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="125">
        <template scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>



      <el-table-column align="center" label="用户类型" width="120">
        <template scope="scope">
          <span v-if="scope.row.userType=='1'">普通用户</span>
          <span v-if="scope.row.userType=='2'">经纪人</span>
          <span v-if="scope.row.userType=='3'">经纪人主管</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="多多币" width="140">
        <template scope="scope">
          <span>{{scope.row.integral}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="服务区域" width="150">
        <template scope="scope">
          <span>{{scope.row.serviceArea}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间" width="180">
        <template scope="scope">
          <span>{{scope.row.createTs}}</span>
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



      <el-table-column align="center" label="状态" width="80">
        <template scope="scope">
          <span v-if="scope.row.status=='1'">可用</span>
          <span v-if="scope.row.status=='0'">已删除</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">修改</span>
          <span v-if="scope.row.status=='1'" class="link-type" @click="handleDelete(scope.row)">删除</span>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import { fetchUserList, deleteUser, recoverUser, fetchExportUser, updateUser, cityList, countyList, townList } from 'api/user_table';
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
        exportUserList: null,
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
        cityList: null,
        countyList: null,
        townList: null,
        temp: {
          id: undefined,
          city: '',
          county: '',
          town: ''
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
    mounted() {
      this.getCityList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchUserList(this.listQuery).then(response => {
          this.list = response.data.data.userList;
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
        MessageBox.confirm('您确定恢复该用户么', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recoverUser(row.id).then(response => {
            // this.flag = ;
            if(response.data.flag == 1){
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
            if(response.data.flag == 1){
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
        MessageBox.confirm('您确定删除该用户么', '确定删除', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(row.id).then(response => {

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
        updateUser(this.temp).then(response => {
          if (response.data.flag === 1) {
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
      getExportList() {
        fetchExportUser(this.listQuery).then(response => {
          this.exportUserList = response.data.data;
        })
      },
      handleDownload() {
        this.getExportList();
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['用户名', '手机号', '用户类型', '多多币值', '服务区域', '注册时间'];
          const filterVal = ['username', 'phone', 'userType', 'integral', 'serviceArea', 'createTs'];
          const data = this.formatJson(filterVal, this.exportUserList);
          export_json_to_excel(tHeader, data, '用户数据');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
      getCityList(cityName) {
        // let cityName = this.$route.query.city
        this.temp.county = ''
        this.temp.town = ''
        cityList().then(response => {
          this.cityList = response.data.data;
        })
        this.city = cityName
        this.getCountyList()
      },

      getCountyList(countyName) {
        // alert(this.city)
        this.temp.town = ''
        countyList(this.city).then(response => {
          this.countyList = response.data.data;
        })
        this.county = countyName
        this.getTownList()
      },
      getTownList() {
        // alert(this.county)
        townList(this.county).then(response => {
          this.townList = response.data.data;
        })
      },
      selectCity(val) {
        this.cityList = []
        this.countyList = []
        this.townList = []
        this.getCityList(val)
      },
      selectCounty(val) {
        this.countyList = []
        this.townList = []
        this.getCountyList(val)
      },
      selectTown(val) {
        this.townList = []
        this.getTownList(val);
      }
    }
  }
</script>
