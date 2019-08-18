<template>



  <div class="app-container calendar-list-container">


      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style="width: 800px">
        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

        <el-form-item label="链接描述">
          <el-input v-model="temp.linkDesc"></el-input>
        </el-form-item>

        <el-form-item label="链接">
          <el-input v-model="temp.linkUrl"></el-input>
        </el-form-item>

        <el-form-item label="列表图片">
          <el-upload
            list-type="picture-card"
            :action="domain"
            :data="QiniuData"
            :on-remove="handleRemove"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :limit="1"
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

        <el-form-item label="详细描述">
          <Editor v-model="temp.content" style="height: 1000px"/>
        </el-form-item>





      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="create" style="width: 200px">确 定</el-button>
<!--        <el-button v-else type="primary" @click="update">确 定</el-button>-->
      </div>


  </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { createNews } from 'api/news';
    import waves from '@/directive/waves.js';// 水波纹指令
    import { parseTime } from 'utils';
    import { MessageBox } from 'element-ui';
    import { getToken } from 'api/qiniu';
    import Editor from './Editor.vue'

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
                editorOption: {},
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
                    // id: undefined,undefined
                    title: '',
                    linkDesc: '',
                    linkUrl: '',
                    homeImage:'',
                    content:''
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
        components:{
            Editor
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
            create() {
                this.temp.homeImage = this.uploadPicUrl
                createNews(this.temp).then(response => {
                    if (response.data.flag === 1) {
                        this.$notify({
                            title: '成功',
                            message: response.data.message,
                            type: 'success',
                            duration: 2000
                        });
                        this.resetTemp();
                    }
                })
            },
            resetTemp() {
                this.temp = {
                    title: '',
                    linkDesc: '',
                    linkUrl: '',
                    homeImage:'',
                    content:''
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
            }
        }
    }
</script>
