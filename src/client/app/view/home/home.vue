<template>
	<div class="index-main" v-loading.fullscreen="fullscreenLoading">
		<div v-if="user">
			<div v-for="item in user.customer.businesses">
				<div v-if="item.type == 'Fee' && item.status == 'OK'">
					<div class="index-panel-title">
						<img src="/images/pay.png">
						最新待缴费
					</div>
					<div v-if="user">
						<div v-if="user.customer.fee_account.status == 'OK'">
							<div v-if="payStatus">
							<div class="index">
								<div v-for="item in pay">
									<a href="javascript:;" @click="singleAjaxFadeIn(item.id)" class="clickable-box clearfix">
										<div class="float-left">
											<span class="color-deep">{{item.title}}</span>
											&nbsp;&nbsp;
											<span class="color-small" v-html="item.re_remain"></span>
										</div>
										<div class="float-right">
											<span class="color-small">{{item.re_end_date}}</span>
										</div>
									</a>
								</div>
							</div>
							<div class="margin-top-10">
		    					<a href="javascript:;" @click="payAjaxFadeIn">
		    						<span class="color-small">查看更多待缴费</span>&nbsp;&nbsp;Go!
		    					</a>
		    				</div>
							</div>					
							<div v-else>
							<div class="none-area">
								<div>
			    					<img src="/images/error.png">
			    				</div>
			    				<div>
			    					<a href="javascript:;" @click="payAjaxFadeIn">
			    						<span>没有找到待缴费项目，核对一下信息</span>&nbsp;&nbsp;Go!
			    					</a>
			    				</div>
							</div>
							</div>
						</div>
						<div v-else-if="user.customer.fee_account.status == 'NotOpened'">
							<div class="none-area">
								<div>
			    					<img src="/images/error.png">
			    				</div>
			    				<div>
			    					<a href="javascript:;" @click="payAjaxFadeIn">
			    						<span>缴费信息未校验，去校验</span>&nbsp;&nbsp;Go!
			    					</a>
			    				</div>
							</div>
							</div>
					</div>	
				</div>
	    	</div>
	    </div>
	    <div class="index-panel margin-top-30 margin-bottom-30">
		    <div class="index-panel-title">
				<img src="/images/paid.png">
				最近交易记录
			</div>
		    <el-table ref="singleTable" :data="paid" style="width: 100%">
		    	<el-table-column property="re_order_time" label="创建时间">
		    	</el-table-column>
			    <el-table-column property="trade_summary" label="交易名称" min-width="120">
			    </el-table-column>
			    <el-table-column property="order_no" label="系统订单号">
			    </el-table-column>
			    <el-table-column property="pay_amt" label="交易金额">
			    </el-table-column>
			    <el-table-column property="re_pay_channel" label="支付方式">
			    </el-table-column>
			    <el-table-column property="re_order_status" label="交易状态">
			    </el-table-column>
			    <!-- 空状态 -->
			    <div slot="empty" class="text-center">
			    	<div>
			    		<img src="/images/error.png">
			    	</div>
			    	<div class="margin-top-20">未找到交易记录</div>
			    </div>
		    </el-table>
		    <div class="margin-top-10" v-if="paid.length">
		    	<a href="javascript:;" @click="trasactionAjaxFadeIn">
	    			<span class="color-small">查看所有交易记录</span>&nbsp;&nbsp;Go!
	    		</a>
		    </div>
		</div>
		<el-dialog title="身份校验" :visible.sync="dialogPayVisible" size="tiny" @close="payClose">
			<ul class="tab-nav clearfix">
				<li class="active">
					<a href="#base" v-on:click.prevent="tabChange">
						基本信息
					</a>
				</li>
				<li>
					<a href="#new" v-on:click.prevent="tabChange">
						新生缴费
					</a>
				</li>
			</ul>
			<div class="dialog-content">
				<div class="tab-panel active" id="base">
					<div class="tips" :class="payBaseWarningClass" style="margin: -20px -30px 0">
						{{payBaseWarning}}
					</div>
					<el-form method="post" label-position="top" v-model="payBase">
						<el-form-item label="姓名" label-width="auto" class="margin-top-10 margin-bottom-0">
							<el-input v-model="payBase.name" placeholder="必填项"></el-input>
						</el-form-item>
						<el-form-item label="身份证号" label-width="auto" class="margin-top-10 margin-bottom-0">
							<el-input v-model="payBase.id_card_no" placeholder="必填项"></el-input>
						</el-form-item>
						<el-form-item label="学号" label-width="auto" class="margin-top-10 margin-bottom-0">
							<el-input v-model="payBase.student_no" placeholder="若未分配可暂不填写"></el-input>
						</el-form-item>
						<div class="margin-top-10 margin-bottom-20 text-center">
							<el-button type="primary" @click="payBaseSubmit" :loading="payBaseLoading" :disabled="payBaseEnabled">完 成</el-button>
						</div>
					</el-form>
				</div>
				<div class="tab-panel" id="new">
					<div class="tips" :class="payNewWarningClass" style="margin: -20px -30px 0">
						{{payNewWarning}}
					</div>
					<el-form method="post" label-position="top" v-model="payNew">
						<el-form-item label="姓名" label-width="auto" class="margin-top-10 margin-bottom-0">
							<el-input v-model="payNew.name" placeholder="必填项"></el-input>
						</el-form-item>
						<el-form-item label="身份证号" label-width="auto" class="margin-top-10 margin-bottom-0">
							<el-input v-model="payNew.id_card_no" placeholder="必填项"></el-input>
						</el-form-item>
						<template v-if="user">
						<el-form-item :label="user.customer.fee_account.new_stu_verify_config.title" label-width="auto" class="margin-top-10 margin-bottom-0">
							<el-input v-model="payNew.other" :placeholder="user.customer.fee_account.new_stu_verify_config.hint"></el-input>
						</el-form-item>
						</template>
						<div class="margin-top-10 margin-bottom-20 text-center">
							<el-button type="primary" @click="payNewSubmit" :loading="payNewLoading" :disabled="payNewEnabled">完 成</el-button>
						</div>
					</el-form>
				</div>
			</div>
		</el-dialog>
    </div>
</template>
<script>
	import $ from "jquery"

	export default {
		data() {
			return {
				pay : [],
				payStatus : false,
				fullscreenLoading : true,
				paid : [],
				user: null,
				dialogFormVisible : false,
				dialogPayVisible: false,
				payBase : {
					name: '',
					id_card_no: '',
					student_no: ''
				},
				payNew : {
					name: '',
					id_card_no: '',
					other: ''
				},
				payBaseLoading : false,
				payNewLoading : false,
				payBaseWarning : '',
				payBaseWarningClass : '',
				payNewWarning : '',
				payNewWarningClass : ''
			}
		},
		computed: {
			payBaseEnabled() {
				return !(this.payBase.name && this.payBase.id_card_no);
			},
			payNewEnabled() {
				return !(this.payNew.name && this.payNew.id_card_no && this.payNew.other);
			}
		},
	  	created() {
	  		let _this = this;
	  		let user = new Promise(function(resolve, reject){
		  		_this.$myHttpRequest({
		  			path : "/api/users/getInfo",
		  			type : "get",
		  			success : function(resp){
		  				resolve(resp);
		  			},
		  			failure : function(resp){
		  				// TODO
		  			}
		  		});
		  	});
	  		let pay = new Promise(function(resolve, reject){
		  		_this.$myHttpRequest({
		  			path : "/api/payment/getFeeList",
		  			type : "get",
		  			success : function(resp){
		  				resolve(resp);
		  			},
		  			failure : function(resp){
		  				let response = {"resp" : resp};
		  				resolve(response);
		  			}
		  		});

	  		});
	  		let paid = new Promise(function(resolve, reject){
		  		_this.$myHttpRequest({
		  			path : "/api/payment/getPaymentList",
		  			type : "get",
		  			args : {"page_size" : 6, "page_index" : 0},
		  			success : function(resp){
		  				resolve(resp);
		  			},
		  			failure : function(resp){
		  				let response = {"resp" : resp};
		  				resolve(response);
		  			}
		  		});
	  		});
	  		
	  		Promise.all([user,pay, paid]).then(function(value){
	  			if (value[1].resp.resp_code == "AS0000"){
	  				if (value[1].fees.length){
	  					_this.pay = value[1].fees;
	  					_this.payStatus = true;
	  				}
	  				else {
	  					_this.payStatus = false;
	  				}
	  				
	  			}
	  			else {
	  				_this.payStatus = false;
	  			}

	  			if (value[2].resp.resp_code == "AS0000"){
	  				_this.paid = value[2].records;
	  			}
	  			else {

	  			}

	  			_this.user = value[0];
	  			_this.fullscreenLoading = false;
	  		});
	  	},
	  	mounted() {
	  		$('.top-nav-list > li').eq(0).addClass('active');
	  	},
	  	methods : {
	  		payAjaxFadeIn() {
				if (this.user.customer.fee_account.status == "OK"){
					if (!($('.nav-loading').hasClass('nav-loading-hidden'))){
						$('.nav-loading').addClass('nav-loading-hidden');
						$('.nav-bar').addClass('nav-bar-active');
					}
					this.$router.push({ path: '/payment/prepare/list' });
				}
				else if (this.user.customer.fee_account.status == "NotOpened"){
					this.dialogPayVisible = true;
				}
			},
			trasactionAjaxFadeIn() {
				$('.nav-loading').addClass('nav-loading-hidden');
				$('.nav-bar').addClass('nav-bar-active');
				this.$router.push({ path: '/personCenter/trasactionRecords' });
			},
			singleAjaxFadeIn(id) {
				$('.nav-loading').addClass('nav-loading-hidden');
				$('.nav-bar').addClass('nav-bar-active');
				this.$router.push({path:'/payment/prepare/detail', query:{"id": id}})
			},
			tabChange(event) {
				let $tabNav = $(event.target).closest('.tab-nav');
				let $current = $(event.target).closest('li');
				let target = $(event.target).attr('href');
				$tabNav.find('li').removeClass('active');
				$current.addClass('active');
				$('.tab-panel').removeClass('active');
				$(target).addClass('active');
			},
			payBaseSubmit() {
				let _this = this;
				this.payBaseWarning = '';
		  		this.payBaseWarningClass = '';
		  		this.payBaseLoading = true;
				this.$myHttpRequest({
		  			path : "/api/payment/openBaseAccount",
		  			type : "post",
		  			args : _this.payBase,
		  			success : function(resp){
		  				_this.payBaseLoading = false;
		  				_this.dialogPayVisible = false;
		  				if (!($('.nav-loading').hasClass('nav-loading-hidden'))){
							$('.nav-loading').addClass('nav-loading-hidden');
							$('.nav-bar').addClass('nav-bar-active');
						}
		  				_this.$router.push({ path: '/payment/prepare/list' });
		  			},
		  			failure : function(resp){
		  				_this.payBaseLoading = false;
		  				_this.payBaseWarning = resp.resp_desc;
		  				_this.payBaseWarningClass = 'bg-pink';
		  			}
		  		});
			},
			payNewSubmit() {
				let _this = this;
				this.payNewWarning = '';
		  		this.payNewWarningClass = '';
		  		this.payNewLoading = true;
				let payData = {};
				payData['name'] = this.payNew.name;
				payData['id_card_no'] = this.payNew.id_card_no;
				payData[this.user.customer.fee_account.new_stu_verify_config.name] = this.payNew.other;
				this.$myHttpRequest({
		  			path : "/api/payment/openStudentAccount",
		  			type : "post",
		  			args : payData,
		  			success : function(resp){
		  				_this.payNewLoading = false;
		  				_this.dialogPayVisible = false;
		  				if (!($('.nav-loading').hasClass('nav-loading-hidden'))){
							$('.nav-loading').addClass('nav-loading-hidden');
							$('.nav-bar').addClass('nav-bar-active');
						}
		  				_this.$router.push({ path: '/payment/prepare/list' });
		  			},
		  			failure : function(resp){
		  				_this.payNewLoading = false;
		  				_this.payNewWarning = resp.resp_desc;
		  				_this.payNewWarningClass = 'bg-pink';
		  			}
		  		});
			},
			payClose() {
				this.payBaseWarning = '';
				this.payBaseWarningClass = '';
				this.payNewWarning = '';
				this.payNewWarningClass = '';
			}
	  	},
	  	beforeRouteLeave (to, from, next) {
	  		$('.top-nav-list > li').removeClass('active');
	  		next();
		}
	}
</script>
<style>
	.index{
		border-top: 1px solid #d2d2d2;
		border-bottom: 1px solid #d2d2d2;
	}
	.index-panel-title{
		padding: 10px 0;
		line-height: 34px;
	}
</style>