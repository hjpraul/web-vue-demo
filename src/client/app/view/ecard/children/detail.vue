<template>
    <div class="detail-main" v-loading.fullscreen="fullscreenLoading">
        <div v-if="detailStatus">
    	<el-table ref="singleTable" :data="details" style="width: 100%">
            <el-table-column
                    prop="amount"
                    label="金额">
            </el-table-column>
            <el-table-column
                    prop="re_time"
                    label="时间">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="摘要">
            </el-table-column>
            <!-- 空状态 -->
            <div slot="empty" class="index-none text-center">
                <div>
                    <img src="/images/none.png">
                </div>
                <div class="margin-top-20">未找到明细记录</div>
            </div>
        </el-table>
        </div>
        <div v-else>
            <div class="none-area">
                <div>
                    <img src="/images/error.png">
                </div>
                <div class="margin-top-10">
                    {{detailStatusText}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                fullscreenLoading : true,
                detailStatus : true,
                detailStatusText : '',
                details : [],
                pageIndex: 0,
                pageSize: 7
            }
        },
        created() {
            this.getDetails();
        },
        methods:{
            getDetails() {
                let _this = this;
                _this.$myHttpRequest({
                    path : "/api/ecard/getEcardRecord",
                    type : "get",
                    args : { "page_size":_this.pageSize, "page_index":_this.pageIndex},
                    success : function(resp){
                        _this.fullscreenLoading = false;
                        _this.detailStatus = true;
                        _this.details = resp.details;
                    },
                    failure : function (resp) {
                        _this.fullscreenLoading = false;
                        _this.detailStatus = false;
                        _this.detailStatusText = resp.resp_desc;
                    }
                });
            }
        }
    }
</script>