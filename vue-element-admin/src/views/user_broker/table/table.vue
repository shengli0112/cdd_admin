<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词"
                v-model="listQuery.keyword">
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
      <el-button class="filter-item" type="primary" icon="document" @click="handleImport">导入用户资源</el-button>
      <!--      <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%">

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

      <el-table-column align="center" label="姓名" width="125">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="130">
        <template scope="scope">
          <span>{{scope.row.phone}}</span>
          <!--          <span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="市" width="65">
        <template scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="区/县" width="90">
        <template scope="scope">
          <span>{{scope.row.county}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="镇" width="95">
        <template scope="scope">
          <span>{{scope.row.town}}</span>
          <!--        <span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
        </template>
      </el-table-column>



<!--      <el-table-column align="center" label="录入人" width="180">-->
<!--        <template scope="scope">-->
<!--          <span>{{scope.row.username}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column align="center" label="创建时间" width="180">
        <template scope="scope">
          <span>{{scope.row.createTs}}</span>
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
          <span v-if="scope.row.status=='0'" class="link-type" @click="handleRecover(scope.row)">恢复</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>

        <el-form-item label="姓名">
          <el-input v-model="temp.name"></el-input>
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


    <el-dialog :title="importFile" :visible.sync="dialogUploadVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>

        <el-upload
          class="upload-demo"
          ref="upload"
          action="doUpload"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div>
          <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
        </el-upload>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUploadVisible = false">取 消</el-button>
        <el-button v-else type="primary" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {
    findUserBroker,
    updateUserBroker,
    cityList,
    countyList,
    townList,
    addUserBroker,
    recoverUserBroker,
    deleteUserBroker
  } from 'api/user_broker_table';
  import waves from '@/directive/waves.js';// 水波纹指令
  import { parseTime } from 'utils';
  import { MessageBox } from 'element-ui'
  import { getToken } from 'api/qiniu'

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
        dialogVisible: false,
        list: null,
        total: null,
        exportList: null,
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
          name: '',
          city: '',
          county: '',
          town: '',
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
        dialogUploadVisible: false,
        importFile: '导入Excel文件',
        pvData: [],
        showAuditor: false,
        tableKey: 0,

        accept: 'image/jpeg,image/gif,image/png,image/bmp',
        formData: {
          smallModelPhoto: []
        },
        QiniuData: {
          token: '',
          key: ''
        },
        domain: 'https://upload-z2.qiniup.com', // 七牛云的上传地址（华南区）
        qiniuaddr: 'http://img.cddwang.com', // 七牛云的图片外链地址
        uploadPicUrl: '', // 提交到后台图片地址
        fileList: []
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
      this.getCityList(),
      this.getQiniuToken()
    },
    methods: {
      handleRemove(file, fileList) {
        if(fileList !== null){
          for(let key in fileList) {
            this.imgsList.push(`http://${this.qiniuaddr}/${this.imgName[key]}`)
          }
        }
        this.uploadPicUrl = '';
      },
      handleExceed(files, fileList) {
        this.$message.warning(
                '当前限制选择 3 张图片，如需更换，请删除上一张图片在重新选择！'
            );
      },
      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isJPEG = file.type === 'image/jpeg';
        const isJPG = file.type === 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG && !isJPEG && !isJPG) {
          this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        this.QiniuData.key = `upload_pic_${file.name}`;
      },
      uploadSuccess(response, file, fileList) {
        console.log(fileList);
        if (this.uploadPicUrl !== '') {
          this.uploadPicUrl = this.uploadPicUrl + '|' + `${this.qiniuaddr}/${response.key}`;
        } else {
          this.uploadPicUrl = `${this.qiniuaddr}/${response.key}`;
        }

        this.dialogVisible = true;
      },
      uploadError(err, file, fileList) {
        this.$message({
          message: '上传出错，请重试！',
          type: 'error',
          center: true
        });
      },
      beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${ file.name }？`);
      },
        // 提交数据到后台
      handleSubmit() {
        const ajaxData = {
          receipt_img: this.uploadPicUrl // 图片地址
        };
        this.$http.put('/xxx', ajaxData)
                .then(response => {
                  const { code, data } = response.data;
                  if (code == '0') {
                    this.$message({
                      message: '提交成功！',
                      type: 'success',
                      center: true
                    });
                  }
                })
                .catch(error => {
                  this.$message({
                    message: error.msg,
                    type: 'error',
                    center: true
                  });
                });
      },
      getQiniuToken() {
        getToken().then(response => {
          this.QiniuData = response.data.data;
        });
      },
      getList() {
        this.listLoading = true;
        findUserBroker(this.listQuery).then(response => {
          this.list = response.data.data.userBrokerList;
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
      handleCreate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleImport() {
        this.dialogUploadVisible = true;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleRecover(row) {
        MessageBox.confirm('您确定恢复该信息么', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recoverUserBroker(row.id).then(response => {
            // this.flag = response.data.flag;
            if (response.data.flag === 1) {
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
        MessageBox.confirm('您确定删除该信息么', '确定删除', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserBroker(row.id).then(response => {
            // this.flag = response.data.flag;
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
        })
      },
      create() {
        addUserBroker(this.temp).then(response => {
          if (response.data.flag === 1) {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            });
            this.getList();
          }
        })

        this.dialogFormVisible = false;
      },
      update() {
        updateUserBroker(this.temp).then(response => {
          if (response.data.flag === 1) {
            this.$notify({
              title: '成功',
              message: '更新成功',
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
      },
      submitUpload() {
        debugger
        console.log('上传'+this.files.name)
        if (this.fileName == ""){
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        let fileFormData = new FormData();
        fileFormData.append('file', this.files, this.fileName);
        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.$http.post(`/account/userBroker/importUserBroker`, fileFormData, requestConfig).then((res) => {
          debugger
          if (res.data.flag === 1) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                // this.visible = false
                this.$emit('getList')
              }
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      beforeUpload(file){
        debugger
        console.log(file,'文件');
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!')
          return
        }
        if (!isLt2M) {
          this.$message.warning('上传模板大小不能超过 5MB!')
          return
        }
        this.fileName = file.name;
        return false // 返回false不会自动上传
      }
    }
  }
</script>
