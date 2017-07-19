<template>
	<div class="records-main" v-loading.fullscreen="fullscreenLoading">
		<el-table ref="singleTable" :data="records" style="width: 100%">
		    <el-table-column
		            prop="amount"
		            label="金额">
		    </el-table-column>
		    <el-table-column
		            prop="re_time"
		            label="时间">
		    </el-table-column>
		    <el-table-column
		            prop="re_status"
		            label="状态">
		    </el-table-column>
		    <!-- 空状态 -->
		    <div slot="empty" class="index-none text-center">
		        <div>
		            <img src="/images/none.png">
		        </div>
		        <div class="margin-top-20">未找到付款记录</div>
		    </div>
		</el-table>
		<div class="margin-top-20 margin-bottom-30 clearfix" v-if="records.length">
		    <el-pagination
		            layout="total, prev, pager, next, jumper"
		            :total="records.length"
		            :page-size="pageSize"
		            :current-page="pageIndex +1"
		            @current-change="indexChange"
		            class="float-right">
		    </el-pagination>
		</div>
    </div>
</template>
<script>
	export default {
        data () {
        	return {
				fullscreenLoading: true,
        		records: [],
				pageIndex: 0,
				pageSize: 7
        	}
        },
        created() {
			this.getRecords();
        },
		methods:{
        	getRecords() {
				let _this = this;
				_this.$myHttpRequest({
					path : "/api/ecard/getEcardRechargeRecord",
					type : "get",
					args : {"page_size":_this.pageSize, "page_index":_this.pageIndex},
					success : function(result){
						_this.records = result.records;
						_this.fullscreenLoading = false;
					},
					failure : function (resp) {
						_this.fullscreenLoading = false;
						_this.$message(resp.resp_desc);
					}
				});
			},
			indexChange(currentPage) {
				this.pageIndex = (currentPage -1);
			}
		},
		watch: {
			pageIndex() {
				this.getRecords();
			}
		}
    }
</script>