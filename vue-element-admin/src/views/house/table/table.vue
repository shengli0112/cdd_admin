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
      <!--      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
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

      <el-table-column align="center" label="标题" width="125">
        <template scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="租售" width="65">
        <template scope="scope">
          <span>{{scope.row.houseUseType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型" width="65">
        <template scope="scope">
          <span>{{scope.row.houseType}}</span>
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

      <el-table-column align="center" label="总面积" width="90">
        <template scope="scope">
          <span v-if="scope.row.houseType=='土地'">{{scope.row.coverArea}}亩</span>
          <span v-if="scope.row.houseType=='厂房'">{{scope.row.area}}㎡</span>
          <span v-if="scope.row.houseType=='仓库'">{{scope.row.area}}㎡</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="使用面积" width="100">
        <template scope="scope">
          <span v-if="scope.row.houseType=='土地' && scope.row.useArea != ''">{{scope.row.useArea}}亩</span>
          <span v-if="scope.row.houseType=='厂房' && scope.row.useArea != ''">{{scope.row.useArea}}㎡</span>
          <span v-if="scope.row.houseType=='仓库' && scope.row.useArea != ''">{{scope.row.useArea}}㎡</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="楼层" width="65">
        <template scope="scope">
          <span>{{scope.row.floor}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="价格" width="120">
        <template scope="scope">
          <span v-if="scope.row.houseUseType=='出售'">{{scope.row.sellingPrice}}{{scope.row.priceType}}</span>
          <span v-if="scope.row.houseUseType=='出租'">{{scope.row.singlePrice}}{{scope.row.priceType}}</span>

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
          <span>{{scope.row.createTs}}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片" width="120">
        <template scope="scope">
          <el-button  v-if="scope.row.background.length>0" :data-img="scope.row.background" type="text" size="small" @click="$imgPreview" >
            查看图片
          </el-button>

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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
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

        <el-form-item label="街道">
          <el-input v-model="temp.street"></el-input>
        </el-form-item>

        <el-form-item label="房号">
          <el-input v-model="temp.houseNumber"></el-input>
        </el-form-item>

        <el-form-item label="面积">
          <el-input v-model="temp.area"></el-input>
        </el-form-item>

        <el-form-item label="售价">
          <el-input v-model="temp.sellingPrice"></el-input>
        </el-form-item>

        <el-form-item label="电力">
          <el-input v-model="temp.electricity"></el-input>
        </el-form-item>

        <el-form-item label="房源类型">
          <el-input v-model="temp.houseType"></el-input>
        </el-form-item>

        <el-form-item label="房源使用类型">
          <el-input v-model="temp.houseUseType"></el-input>
        </el-form-item>

        <el-form-item label="楼层">
          <el-input v-model="temp.floor"></el-input>
        </el-form-item>

        <el-form-item label="消防">
          <el-input v-model="temp.fireControl"></el-input>
        </el-form-item>


        <el-form-item label="房源状态">
          <el-input v-model="temp.houseStatus"></el-input>
        </el-form-item>

        <el-form-item label="占地">
          <el-input v-model="temp.coverArea"></el-input>
        </el-form-item>

        <el-form-item label="房源优势">
          <el-input v-model="temp.houseEdge"></el-input>
        </el-form-item>

        <el-form-item label="单价">
          <el-input v-model="temp.singlePrice"></el-input>
          {{temp.priceType}}
        </el-form-item>

        <el-form-item label="到期时间">
          <el-input v-model="temp.expireDate"></el-input>
        </el-form-item>


        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                    v-model="temp.description">
          </el-input>
        </el-form-item>


       <!-- <el-form-item label="缩略图" prop="smallModelPhoto">
          <el-upload
            action="http://img.cddwang.com"
            :accept="accept"
            list-type="picture"
            :limit=1
            :data="uptoken"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemoveChange"
            :on-success="handleSuccessChange"
            :file-list="formData.smallModelPhoto">
            <el-button size="mini" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且单张不超过10M，缩略图只能传一张</div>
          </el-upload>
        </el-form-item>-->

        <el-form-item label="图片">
          <el-upload
            list-type="picture-card"
            :action="domain"
            :data="QiniuData"
            :on-remove="handleRemove"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :limit="3"
            multiple
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
<!--            <el-button size="small" type="primary">选择图片</el-button>-->
            <i class="el-icon-plus"></i>
          </el-upload>
<!--          <el-dialog :visible.sync="dialogVisible">-->
<!--            <img width="100%" :src="uploadPicUrl" alt="" v-if="uploadPicUrl">-->
<!--          </el-dialog>-->
<!--          <div>-->
<!--            <img class="pic-box" :src="uploadPicUrl" v-if="uploadPicUrl">-->
<!--          </div>-->
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
  import {
    fetchHouseList,
    deleteHouse,
    recoverHouse,
    topHouse,
    cityList,
    countyList,
    townList,
    updateHouse
  } from 'api/house_table';
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
          title: '',
          type: '',
          city: '',
          county: '',
          town: '',
          street: '',
          houseNumber: '',
          area: '',
          sellingPrice: '',
          electricity: '',
          contacts: '',
          phone: '',
          houseType: '',
          houseUseType: '',
          floor: '',
          fireControl: '',
          background: '',
          houseStatus: '',
          coverArea: '',
          houseEdge: '',
          singlePrice: '',
          useArea: '',
          signContract: '',
          description: '',
          trade: '',
          expireDate: ''
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
            // if()
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
        if (this.uploadPicUrl != '') {
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
        fetchHouseList(this.listQuery).then(response => {
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
        MessageBox.confirm('您确定恢复该房源么', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recoverHouse(row.id).then(response => {
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
      handleTop(row) {
        MessageBox.confirm('您确定置顶该房源么', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          topHouse(row.id).then(response => {
            // this.flag = response.data.flag;
            if (response.data.flag === 1) {
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
        MessageBox.confirm('您确定删除该房源么', '确定删除', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHouse(row.id).then(response => {
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
        this.temp.background = this.uploadPicUrl
        updateHouse(this.temp).then(response => {
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
