<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
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
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
<!--      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
<!--      <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list"
              v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%" :row-key="getRowKeys"
              :expand-row-keys="userList"
              @current-change="toggleRowExpansion"
    >

      <el-table-column type="expand" width="0px" label="扩展">
        <el-table :key='userTableKey' :data="userList" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

          <!--<el-table-column align="center" label="序号" width="65">
            <template scope="props">
              <span>{{props.row.id}}</span>
            </template>
          </el-table-column>-->

          <el-table-column align="center" label="用户名" width="125">
            <template scope="props">
              <span>{{props.row.username}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="手机号" width="125">
            <template scope="props">
              <span>{{props.row.phone}}</span>
            </template>
          </el-table-column>



          <el-table-column align="center" label="用户类型" width="120">
            <template scope="props">
              <span v-if="props.row.userType=='1'">普通用户</span>
              <span v-if="props.row.userType=='2'">经纪人</span>
              <span v-if="props.row.userType=='3'">经纪人主管</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="多多币" width="140">
            <template scope="props">
              <span>{{props.row.integral}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="服务区域" width="150">
            <template scope="props">
              <span>{{props.row.serviceArea}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="注册时间" width="180">
            <template scope="props">
              <span>{{props.row.createTs}}</span>
            </template>
          </el-table-column>


          <el-table-column align="center" label="状态" width="80">
            <template scope="props">
              <span v-if="props.row.status=='1'">可用</span>
              <span v-if="props.row.status=='0'">已删除</span>
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
      </el-table-column>

      <el-table-column min-width="80px" label="公司名">
        <template scope="scope">
          <span>{{scope.row.companyName}}</span>
<!--          <el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
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
<!--          <icon-svg v-for="n in +scope.row.importance" icon-class="wujiaoxing" class="meta-item__icon" :key="n"></icon-svg>-->
        </template>
      </el-table-column>

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
      <el-table-column label="营业执照" width="120">
        <template scope="scope">
          <img :src="scope.row.license"  min-width="70" height="70" v-if="scope.row.license.length>0" :data-img="scope.row.license" type="text" size="small" @click="$imgPreview" />

        </template>

      </el-table-column>

      <el-table-column align="center" label="操作" width="100">
        <template scope="scope">
          <p v-if="scope.row.applyType=='2'">已通过</p>
          <el-button v-if="scope.row.applyType!='2'" size="small" type="success" @click="handleModifyStatus(scope.row.id,scope.row.userId,'2')">通过
          </el-button>


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
        <el-form-item label="类型">
          <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

        <el-form-item label="重要性">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </el-form-item>

        <el-form-item label="点评">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
          </el-input>
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
  import { fetchList, fetchPv, passAudit, companyUserList } from 'api/article_table';
  import { deleteUser,recoverUser } from 'api/user_table';
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
        userList:null,
        total: null,
        listLoading: true,
        expands:null,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        companyName:{
          companyName:undefined
        },
        temp: {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          type: '',
          status: 'published'
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
        tableKey: 0,
        userTableKey: 0,
        // 获取row的key值
        getRowKeys(row) {
            return row.companyName;
        },
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
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.items;
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
      rowClick:function(row, column, cell, event) {
          // alert(row.companyName)
          this.companyName.companyName=row.companyName
          companyUserList(this.companyName).then(response => {
              this.userList = response.data.data;
          })

          // alert('ddd')

      },
      toggleRowExpansion(row){
          this.userList = [];
          this.userList.push(row.id);
          this.companyName.companyName=row.companyName
          companyUserList(this.companyName).then(response => {
              this.userList = response.data.data;
          })
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
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData;
          this.dialogPvVisible = true;
        })
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
      }
    }
  }
</script>
