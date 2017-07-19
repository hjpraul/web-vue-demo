<template>
    <div class="header" v-loading.fullscreen="fullscreenLoading">
		<div class="top-nav">
			<div class="container">
				<div class="top-nav-school float-left" v-if="user">
					<div class="float-left vertical-middle">
						<a href="javascript:;" @click="homeFadeIn" class="vertical-middle">
							<img src="/images/personal_icon.png" class="vertical-middle" style="width: 100%;" v-if="user.customer.school.logo == null">
							<img :src="user.customer.school.logo" height="50" v-else class="vertical-middle">
							<span class="top-nav-schoolname vertical-middle color-deep">{{ user.customer.school.name }}</span>
						</a>
						<span class="vertical-middle" style="margin-left: 20px;" v-if="!(user.customer.fee_account.status == 'OK' || user.customer.ecard_account.status == 'OK')">
							<a href="javascript:;" @click="dialogVisible = true">修改学校</a>
						</span>
					</div>
				</div>	
				<div class="float-right">
					<ul class="top-nav-list clearfix">
						<li>
							<a href="javascript:;" @click="homeFadeIn">
								首页
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="branchFadeIn('/message')">
								消息
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="branchFadeIn('/service/support')" class="service-center">
								我的客服 
								<i class="el-icon-arrow-down color-light" style="font-size: 8px"></i>
							</a>
							<div class="top-nav-dropdown">
								<ul>
									<li>
										<a href="javascript:;" @click="branchFadeIn('/service/support')" class="header-ind">
											帮助中心
										</a>
									</li>
									<li>
										<a href="javascript:;" @click="branchFadeIn('/service/custom')" class="header-ind">
											客服中心
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li v-if="user">
							<a href="javascript:;" style="width: 50px;height: 50px;" @click="branchFadeIn('/personCenter/baseMessage')">
								<i style="width: 100%;height:100%;border-radius:50%;overflow: hidden;">
									<img src="/images/personal_icon.png" class="vertical-middle" style="width: 100%;" v-if="user.customer.base_info.avatar == null">
									<img :src="user.customer.base_info.avatar" class="vertical-middle person-img" @load="imgLoading" v-else>
								</i>
							</a>
							<div class="top-nav-dropdown">
								<ul>
									<li>
										<a href="javascript:;" @click="branchFadeIn('/personCenter/baseMessage')">
											基本信息
										</a>
									</li>
									<li>
										<a href="javascript:;" @click="branchFadeIn('/personCenter/trasactionRecords')">
											交易记录
										</a>
									</li>
									<li>
										<a href="javascript:;" @click="branchFadeIn('/personCenter/changePwd')">
											修改密码
										</a>
									</li>
									<li v-if="bankMsg">
										<a href="javascript:;" @click="branchFadeIn('/personCenter/bankCard')" v-if="bankMsg.max_card_no > 0">
											银行卡包
										</a>
									</li>
									<li>
										<a href="javascript:;" @click="dialogLogoutVisible = true">
											退出登录
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="second-nav">
			<div class="nav-loading">
				<div class="container" style="position: relative" v-if="user">
					<div class="row color-white">
						<!-- 判断状态展示一卡通当前状态 -->
						<div v-for="business in user.customer.businesses">
							<div v-if="business.type == 'ECard'">
								<div v-if="business.status=='OK'">
									<div class="header-area col-4 text-center margin-top-20" @click="ecardAjaxFadeIn">
										<div class="header-area-title">一卡通</div>
										<div class="spot margin-top-10">
											<i class="el-icon-caret-bottom"></i>
										</div>
										<div v-if="user.customer.ecard_account.status == 'OK'">
											<div v-if="ecardCh">
												<div v-if="ecardCh.ecard.status =='OK'" class="ecard-info text-left" style="margin-top: 80px; margin-right: auto; margin-left: auto;">
													<div class="ecard-logo clearfix">
														<div class="ecard-status float-right"></div>
													</div>
													<div class="ecard-person">
														{{user.customer.ecard_account.account_no}}
														&nbsp;
														{{user.customer.ecard_account.name}}
													</div>
													<div class="ecard-sum margin-top-10">
														{{ecardText}}
													</div>
												</div>
												<div  v-if="ecardCh.ecard.status =='ReportLoss'" class="ecard-loss text-left" style="margin-top: 80px; margin-right: auto; margin-left: auto;">
													<div class="ecard-logo clearfix">
														<div class="ecard-status float-right"></div>
													</div>
													<div class="ecard-person">
														{{user.customer.ecard_account.account_no}}
														&nbsp;
														{{user.customer.ecard_account.name}}
													</div>
													<div class="ecard-sum margin-top-10">
														一卡通已挂失
													</div>
												</div>
											</div>
										</div>
										<div class="ecard-unbind text-left" style="margin-top: 80px; margin-right: auto; margin-left: auto;" v-else-if="user.customer.ecard_account.status == 'NotOpened'">
											<div class="ecard-logo clearfix">
												<div class="ecard-status float-right"></div>
											</div>
											<div class="ecard-person">
												{{user.customer.ecard_account.account_no}}
												&nbsp;
												{{user.customer.ecard_account.name}}
											</div>
											<div class="ecard-sum margin-top-10">
												一卡通信息未校验
											</div>
										</div>
									</div>
								</div>
								<div v-else-if="business.status !='OK'">
									<div class="header-area col-4 text-center margin-top-20">
										<div class="header-area-title">一卡通</div>
										<div class="spot margin-top-10">
											<i class="el-icon-caret-bottom"></i>
										</div>
										<div class="ecard-notOpen text-left" style="margin-top: 80px; margin-right: auto; margin-left: auto;">
											<div class="ecard-logo clearfix">
												<div class="ecard-status float-right"></div>
											</div>
											<div class="ecard-person">
												{{user.customer.ecard_account.account_no}}
												&nbsp;
												{{user.customer.ecard_account.name}}
											</div>
											<div class="ecard-sum margin-top-10">
												该业务未开通
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-for="business in user.customer.businesses">
							<div v-if="business.type == 'Fee'">
								<div class="header-area col-4 text-center margin-top-20" v-if="business.status == 'OK'" @click="payAjaxFadeIn">
									<div class="header-area-title">缴费</div>
									<div class="spot margin-top-10">
										<i class="el-icon-caret-bottom"></i>
									</div>
									<div class="payment-area">
										<div class="payment-status"></div>
									</div>
								</div>

								<div class="header-area col-4 text-center margin-top-20" v-else-if="business.status != 'OK'">
									<div class="header-area-title">缴费</div>
									<div class="spot margin-top-10">
										<i class="el-icon-caret-bottom"></i>
									</div>
									<div class="payment-area-unbind">
										<div class="payment-status">
											<div>
											暂未开通
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-4 text-center margin-top-20">
							<div class="header-area-title">更多专属</div>
						</div>
					</div>
					<div v-for="business in user.customer.businesses" style="position: absolute;">
						<div v-if="business.type == 'ECard'">
							<div v-if="business.status=='OK'">
								{{!business.status}}
								<div v-if="ecardCh">
									{{business.status}}
									<div class="ecard-recharge" v-if="ecardCh.ecard.status == 'OK'">
										<div class="ecard-recharge-content">
											<input type="text" v-model="recharge" placeholder="1-300任意金额" maxlength="6">
											<a href="javascript:;" class="disabled" v-if="rechargeEnabled">充值一卡通</a>
											<a href="javascript:;" @click="ecardRecharge" v-else>充值一卡通</a>
										</div>
									</div>
									<div class="ecard-forbidden" v-else>
										<div class="ecard-recharge-content">
											<input type="text" placeholder="1-300任意金额" maxlength="6" disabled>
											<a href="javascript:;">充值一卡通</a>
										</div>
									</div>
								</div>
								<div class="ecard-forbidden" v-else>
									<div class="ecard-recharge-content">
										<input type="text" placeholder="1-300任意金额" maxlength="6" disabled>
										<a href="javascript:;">充值一卡通</a>
									</div>
								</div>
							</div>
							<div class="ecard-forbidden" v-else>
								<div class="ecard-recharge-content">
									<input type="text" placeholder="1-300任意金额" maxlength="6" disabled>
									<a href="javascript:;">充值一卡通</a>
								</div>
							</div>
						</div>
					</div>
					<div class="header-deco">
						<img src="/images/bg_second_business.png">
					</div>
					<div class="header-school">
						<div class="more-choice">
							<ul class="clearfix">
								<template v-for="item in user.customer.businesses">	
								<li v-if="item.container=='AnXinFu'&&item.status == 'OK'">
									<a :href="item.arg" target="_blank">
										<div class="more-choice-image">
											<img :src="item.icon" width="32" class="vertical-middle">
										</div>
										<div class="more-choice-text">
											{{item.title}}
										</div>
									</a>
								</li>
								</template>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="nav-bar">
				<div class="container" v-if="user">
					<ul class="nav-bar-list clearfix">
						<li>
							<div v-for="business in user.customer.businesses">
								<div v-if="business.type == 'ECard'">
									<div v-if="business.status=='OK'">
										<a href="javascript:;" @click="ecardAjaxFadeIn">一卡通</a>
									</div>
									<div v-else-if="business.status!='OK'">
										<a href="javascript:;">一卡通</a>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div v-for="business in user.customer.businesses">
								<div v-if="business.type == 'Fee'">
									<div v-if="business.status=='OK'">
										<a href="javascript:;" @click="payFadeIn">缴费</a>
									</div>
									<div v-else-if="business.status!='OK'">
										<a href="javascript:;" class="color-small">缴费</a>
									</div>
								</div>
							</div>
						</li>
						<template v-for="item in user.customer.businesses">
							<li v-if="item.container=='AnXinFu'&&item.status == 'OK'">
								<a :href="item.arg" target="_blank">
									{{item.title}}
								</a>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
		<el-dialog title="注销账号" :visible.sync="dialogLogoutVisible">
			<div class="dialog-content">确定要注销账号？</div>
			<div slot="footer" class="dialog-footer margin-top-10">
				<el-button type="primary" @click="logout" :loading="logoutBtnLoading">确 定</el-button>
			    <el-button @click="dialogLogoutVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="身份校验" :visible.sync="dialogEcardVisible" size="tiny" @close="ecardClose">
			<div class="tips" :class="ecardWarningClass">
				{{ecardWarning}}
			</div>
			<div class="dialog-content">
				<el-form method="post" label-position="top" v-model="ecard" v-if="user">
					<template>
					<el-form-item label="姓名" label-width="auto" class="margin-bottom-0">
						<el-input v-model="ecard.name" placeholder="必填项" :readonly="Boolean(user.customer.ecard_account.name)"></el-input>
					</el-form-item>
					<el-form-item :label="user.customer.ecard_account.account_no_verify_config.title" label-width="auto" class="margin-top-10 margin-bottom-0">
						<el-input v-model="ecard.account_no" placeholder="必填项"></el-input>
					</el-form-item>
					</template>
					<template v-if="user.customer.ecard_account.need_password == true">
					<el-form-item label="一卡通密码" label-width="auto" class="margin-top-10 margin-bottom-0" v-if="user.customer.ecard_account.need_password == true">
						<el-input v-model="ecard.password" type="password" placeholder="必填项"></el-input>
					</el-form-item>
					</template>
					<div class="margin-top-10 margin-bottom-20 text-center">
						<el-button type="primary" @click="ecardSubmit" :loading="ecardLoading" :disabled="ecardEnabled">完 成</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>
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
					<el-form method="post" label-position="top" v-model="payBase" v-if="user">
						<el-form-item label="姓名" label-width="auto" class="margin-top-10 margin-bottom-0">
							<div v-if="user.customer.ecard_account.account_no != null">
								<el-input v-model="payBase.name = user.customer.base_info.name" placeholder="必填项"></el-input>
							</div>
							
							<el-input v-model="payBase.name" placeholder="必填项" v-else></el-input>
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
		<el-dialog :title="dialogVisibleTitle" size="large" :visible.sync="dialogVisible" @open="loadCity()" @close="closeSchoolDialog">
		   <div class="pannel-w-content" v-show="cityShow">
				<div class="search-input clearfix">
					<input type="text" class="col-12 city-input" placeholder="请输入城市/拼音/首字母" v-model="cityKeyword">
					<i class="input-disp search-img">
						<img src="/images/search.png">
					</i>
				</div>
				<div class="pannel-ul header-selector margin-top-10">
					<div class="pannel-list clearfix" v-for="(value,key) in cities">
						<div class="col-1">
							<div class="header-pin text-center">{{key}}</div>
						</div>
						<div class="col-11 color-middle">
							<ul class="clear-fix color-middle">
								<li v-for="item in value" @click="selectCity(item.code)">
									<span v-if="cityKeyword"><span v-html="highlight(item.name,cityKeyword)"></span></span>
									<span v-else>{{item.name}}</span>
									
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="pannel-w-content" v-show="schoolShow">
				<span id="school-prev" @click="backCity">返回</span>
				<div class="search-input clearfix">
					<input type="text" class="col-12 city-input" placeholder="请输入学校/拼音/首字母" v-model="schoolKeyword">
					<i class="input-disp search-img">
						<img src="/images/search.png">
					</i>
				</div>
				<div class="pannel-ul" v-if="schools">
					<div class="pannel-list clearfix" v-for="(value,key) in schools">
						<div class="col-1">
							<div class="header-pin text-center">{{key}}</div>
						</div>
						<div class="col-11 color-middle">
							<ul class="clear-fix color-middle">
								<li v-for="item in value" @click="updateSchool(item.code)">

									<span v-if="schoolKeyword"><span v-html="highlight(item.name,schoolKeyword)"></span></span>
									<span v-else>{{item.name}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="重要消息" :visible.sync="importantMsg" size="tiny" :close-on-click-modal="false" class="imp-msg-close">
	 		<swiper :options="swiperOption" ref="mySwiper">
    			<!-- slides -->
    			<template v-for="(itMsg, index) in importMsgs">
    				<swiper-slide>
    					<h3 class="text-center margin-top-20">
							<span class="important-index" style="color: #4dd172;font-size: 28px;">{{ index + 1 }}</span>
							<span class="color-light" style="font-size: 18px;">/{{importMsgs.length}} </span>
										&nbsp;&nbsp;
							<span class="show-dir"> {{ itMsg.title }}</span>
						</h3>
						<div class="text-left important-content margin-top-20 padding-lr-30 color-middle" style="word-break: break-all;">{{ itMsg.content }}</div>
					</swiper-slide>
    			</template>
    			<!-- Optional controls -->
  			</swiper>
  			<div class="margin-top-20 text-center" style="margin-bottom: 20px;">
  				<span id="swiper-prev">返回</span>
  				<el-button type="primary" id="swiper-next">下一条</el-button>
  				<el-button 
  					type="primary" 
  					id="swiper-close"
  					@click="importantMsg=false" 
  					class="hidden bg-warn">关 闭</el-button>
			</div>	
		</el-dialog>
	</div>
</template>	
<script>
	import $ from "jquery"

	export default {
		name: 'vue-header',
		data() {
			return {
				user : null,
				ecardCh : null,
				bankCard : '',
				bankMsg : '',
				dialogVisible: false,
				dialogLogoutVisible: false,
				dialogPayVisible: false,
				dialogEcardVisible: false,
				dialogVisibleTitle: '选择学校所在城市',
				fullscreenLoading: false,
				cities : null,
				cityKeyword : '',
				cityShow : true,
				cityCode : '',
				schools : null,
				schoolKeyword : '',
				schoolShow : false,
				ecard : {
					name: '',
					account_no: '',
					password: ''
				},
				ecardStatus : '',
				ecardText : '加载中...',
				ecardWarning : '',
				ecardWarningClass : '',
				ecardLoading : false,
				ecardRefresh: '',
				importantMsg : false,
				swiperOption: {
          			notNextTick: true,
          			autoplay: false,
          			direction : 'horizontal',
          			grabCursor : true,
          			setWrapperSize :true,
          			autoHeight: false,
          			pagination : '.swiper-pagination',
          			paginationClickable :true,
          			//prevButton:'.swiper-button-prev',
          			//nextButton:'.swiper-button-next',
          			mousewheelControl : false,
          			observeParents:true,
          			prevButton: '#swiper-prev',
          			nextButton: '#swiper-next',
	    			simulateTouch : false,
	    			onInit: function(swiper){

	    				if (swiper.isEnd){
	    					$('#swiper-next').addClass('hidden');
	    					$('#swiper-close').removeClass('hidden');
	    				}
	    				if(swiper.isBeginning){
	    					$('#swiper-prev').addClass('swiper-back-status');
	    				}else{
	    					$('#swiper-prev').removeClass('swiper-back-status');
	    				}
	    			},
	    			onSlidePrevStart(swiper){
	    				if (!swiper.isEnd){
	    					$('#swiper-next').removeClass('hidden');
	    					$('#swiper-close').addClass('hidden');
	    				}
	    				if(swiper.isBeginning){
	    					$('#swiper-prev').addClass('swiper-back-status');
	    				}else{
	    					$('#swiper-prev').removeClass('swiper-back-status');
	    				}
	    			},
	    			onSlideNextStart: function(swiper){
	    				if (swiper.isEnd){
	    					$('#swiper-next').addClass('hidden');
	    					$('#swiper-close').removeClass('hidden');
	    				}
	    				if(swiper.isBeginning){
	    					$('#swiper-prev').addClass('swiper-back-status');
	    				}else{
	    					$('#swiper-prev').removeClass('swiper-back-status');
	    				}
	    			}
          		},
          		importMsgs : [],
				recharge : '',
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
				payNewWarningClass : '',
				logoutBtnLoading : false
			}
		},
		created() {
			let _this =  this;
			this.$myHttpRequest({
	  			path : "/api/users/getInfo",
	  			type : "get",
	  			failure : function(resp){
	  				console.log(resp)
	  			},
	  			success : function(resp){
	  				_this.user = resp;
					if (_this.user){
						_this.ecardStatus = _this.user.customer.ecard_account.status;
						_this.bankCard = _this.user.customer.fee_account;
						_this.ecard.name = _this.user.customer.ecard_account.name;
					}
	  			}
	  		});
	  		this.$myHttpRequest({
	  			path : "/api/message/getImportantMessage",
	  			type : "get",
	  			failure : function(resp){
			  		// TODO
			  	},
	  			success : function(resp){
	  				if(resp.messages.length){
	  					_this.importMsgs = resp.messages;
	  					_this.importantMsg = true;
	  				}else{
	  					_this.importantMsg = false;
	  				}
	  			}
	  		});
		},
		mounted() {
			let pagination = this.$cookie.get('axinfu-pagination');
			if (pagination == 'slideDown'){
				$('.nav-loading').removeClass('nav-loading-hidden');
				$('.nav-bar').removeClass('nav-bar-active');
			}
			else {
				$('.nav-loading').addClass('nav-loading-hidden');
				$('.nav-bar').addClass('nav-bar-active');
			}
		},
		computed: {
			ecardEnabledNeedPwd() {
				return !(this.ecard.name && this.ecard.account_no && this.ecard.password);
			},
			ecardEnabled() {
				return !(this.ecard.name && this.ecard.account_no);
			},
			payBaseEnabled() {
				return !(this.payBase.name && this.payBase.id_card_no);
			},
			payNewEnabled() {
				return !(this.payNew.name && this.payNew.id_card_no && this.payNew.other);
			},
			rechargeEnabled() {
				return !(this.recharge);
			}
		},
		methods: {
			imgLoading(){
				if($('.person-img').height() > $('.person-img').width()){
					$('.person-img').css('width',100+'%');
				}else{
					$('.person-img').css('height',100+'%');
				}
			},
			highlight(name,val){
				
                val = val.toString();
                if(val ===''){
                    return val;
                }else{
                    var reg = new RegExp(val, 'g');
                    var arr = name.match(reg);
                    var temp = val;
                    if(arr){
                        temp = arr[0];
                    }
                    
                    return name.replace(reg,'<span style="color:#1ab760;">'+temp+'</span>')
                }
            },
			branchFadeIn(path) {
				$('.nav-loading').addClass('nav-loading-hidden');
				$('.nav-bar').addClass('nav-bar-active');
				this.$router.push({ path: path });
			},
			payAjaxFadeIn(){
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
			payFadeIn(){
				this.$router.push({ path: '/payment/prepare/list' });
			},
			ecardAjaxFadeIn(){
				if (this.user.customer.ecard_account.status == "OK"){
					if (!($('.nav-loading').hasClass('nav-loading-hidden'))){
						$('.nav-loading').addClass('nav-loading-hidden');
						$('.nav-bar').addClass('nav-bar-active');
					}
					
					this.$router.push({ path: '/ecard/records' });
				}
				else if (this.user.customer.ecard_account.status == "NotOpened"){
					this.dialogEcardVisible = true;
				}
			},
			homeFadeIn() {
				$('.nav-loading').removeClass('nav-loading-hidden');
				$('.nav-bar').removeClass('nav-bar-active');
				//location.href = '/';
				this.$router.push({ name: 'home' });
			},
			closeSchoolDialog() {
				this.dialogVisibleTitle = '选择学校所在城市';
				this.cityShow = true;
				this.schoolShow = false;
			},
			loadCity() {
				let _this = this;
				this.$myHttpRequest({
		  			path : "/api/school/getCity",
		  			type : "post",
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				_this.cities = resp.citiesReset;
		  			}
		  		}); 
			},
			backCity(){
				let _this = this;
				//this.fullscreenLoading = true;
				this.$myHttpRequest({
		  			path : "/api/school/getCity",
		  			type : "post",
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				//_this.fullscreenLoading = false;
		  				_this.dialogVisibleTitle = '选择城市';
		  				_this.cityShow = true;
						_this.schoolShow = false;
		  				_this.cities = resp.citiesReset;
		  			}
		  		}); 
			},
			selectCity(code) {
				var _this = this;
				this.fullscreenLoading = true;
				this.$myHttpRequest({
		  			path : "/api/school/getSchool",
		  			type : "post",
		  			args : {"city_code" : code},
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				_this.fullscreenLoading = false;
		  				_this.dialogVisibleTitle = '选择学校';
		  				_this.cityShow = false;
		  				_this.cityCode = code;
						_this.schoolShow = true;
						_this.schools = resp.schoolsReset;
		  			}
		  		});
			},
			updateSchool(code) {
				var _this = this;
				this.fullscreenLoading = true;
				this.$myHttpRequest({
		  			path : "/api/school/updateSchool",
		  			type : "post",
		  			args : {"keyword":this.keyword, "school_code":code},
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				_this.fullscreenLoading = false;
		  				_this.dialogVisible = false;
		  				_this.$message('修改学校成功');
		  				setTimeout(()=>{
		  					location.reload();
		  				}, 2000);
		  			}
		  		});
			},	
			ecardRecharge(){
				var _this = this;
				let verify = /^([1-9]\d*|0\.\d{1,2}|[1-9]\d*(\.\d{1,2}))?$/;
				if (!(verify.test(parseFloat(_this.recharge))) || parseFloat(_this.recharge) > 300 || parseFloat(_this.recharge) < 1){
					_this.recharge = '';
					return false;
				}
				$('.nav-loading').addClass('nav-loading-hidden');
				$('.nav-bar').addClass('nav-bar-active');
				let recharge = _this.recharge;
				this.$router.push({ path: '/ecardorder', query: {total : recharge}});
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
			ecardSubmit() {
				let _this = this;
				this.ecardWarning = '';
		  		this.ecardWarningClass = '';
				this.ecardLoading = true;
				this.$myHttpRequest({
		  			path : "/api/ecard/openEcard",
		  			type : "post",
		  			args : _this.ecard,
		  			success : function(resp){
		  				_this.ecardLoading = false;
		  				_this.dialogEcardVisible = false;
		  				if (!($('.nav-loading').hasClass('nav-loading-hidden'))){
							$('.nav-loading').addClass('nav-loading-hidden');
							$('.nav-bar').addClass('nav-bar-active');
						}
						_this.ecardRefresh = new Date().getTime();
		  				_this.$router.push({ path: '/ecard/records' });
		  			},
		  			failure : function(resp){
		  				_this.ecardLoading = false;
		  				_this.ecardWarning = resp.resp_desc;
		  				_this.ecardWarningClass = 'bg-pink';
		  			}
		  		});
			},
			ecardClose() {
				this.ecardWarning = '';
				this.ecardWarningClass = '';
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
						//location.href = '/';
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
			},
			logout() {
				let _this = this;
				this.logoutBtnLoading = true;
				this.$myHttpRequest({
		  			path : "/api/users/logout",
		  			type : "get",
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				_this.logoutBtnLoading = true;
		  				_this.dialogLogoutVisible = false;
						_this.$message({
							message : '退出成功'
						});
						setTimeout(()=>{
							location.href = '/';
						},3000);
		  			}
		  		});
			}
		},
		watch: {
			ecardStatus(val) {
				let _this = this;
				this.$myHttpRequest({
		  			path : "/api/ecard/getEcard",
		  			type : "get",
		  			failure : function(resp){
		  				// TODO
		  			},
		  			success : function(resp){
		  				_this.ecardText = '￥' + Number(resp.ecard.card_balance).toFixed(2);
		  				_this.ecardCh = resp;
		  			}
		  		});
			},
			ecardRefresh(val) {
				let _this = this;
				this.$myHttpRequest({
		  			path : "/api/users/getInfo",
		  			type : "get",
		  			failure : function(resp){
		  				// TODO
		  			},
		  			success : function(resp){
		  				_this.user = resp;
						if (_this.user){
							_this.ecardStatus = _this.user.customer.ecard_account.status;
						}
		  			}
		  		});
			},
			bankCard(val){
				let _this = this;
				if(val.student_no != null && val.collect_bankcard == true){
					console.log("-----------"+val);
					_this.$myHttpRequest({
	  				path : "/api/bank/getBankList",
	  					type : "get",
	  					failure: function(resp){
	  						_this.fullscreenLoading = false;
	  					},
	  					success : function(resp){
	  						let result = resp;
	  						_this.bankMsg = result; 
					  		_this.fullscreenLoading = false;
	  					}
	  				});
				}else{
					console.log(val);
				}
				
			},
			cityKeyword(val) {
				let _this = this;
				val = val.toString();
				this.$myHttpRequest({
		  			path : "/api/school/getCity",
		  			type : "post",
		  			args : {"keyword" : val},
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				_this.cities = resp.citiesReset;

		  			}
		  		}); 
			},
			
			schoolKeyword(val) {
				let _this = this;
				this.$myHttpRequest({
		  			path : "/api/school/getSchool",
		  			type : "post",
		  			args : {"keyword" : val, "city_code" : _this.cityCode},
		  			failure : function(resp){
			  			console.log(resp);
			  		},
		  			success : function(resp){
		  				_this.schools = resp.schoolsReset;
		  			}
		  		}); 
			}
		}
	}
</script>
<style>
.header{
	width: 100%;
	min-width: 1200px;
}
/* 上级头部 */
.top-nav{
	padding: 6px 0 ;
	background-color: #fff;
}
.top-nav-school{
	//line-height: 64px;
}
.top-nav-schoolname{
	margin-left: 15px;
	font-size: 22px;
}
.top-nav-list > li{
	float: left;
}
.top-nav-list > li > a{
	display: block;
	position: relative;
	height: 50px;
	line-height: 50px;
	padding: 0 25px;
	color: #333;
}
.top-nav-list > li.active > a{
	color: #357bf5;
}
.top-nav-list > li:hover .top-nav-dropdown{
	display: block;
}
.top-nav-dropdown{
	display: none;
	position: absolute;
	border: 1px solid #bbb;
	text-align: center;
	background-color: #fff;
	z-index: 99;
}
.top-nav-dropdown li > a{
	display: block;
	padding: 10px 20px;
	color: #666;
}
.top-nav-dropdown li > a:hover{
	background-color: #9de7fd;
	color: #fff;
}
/* 下级头部 */
.second-nav{
	position: relative;
	background-color: #2983f3;
}
.nav-loading{
	padding-top: 50px;
	padding-bottom: 60px;
	background-image: url(/images/bg_second_blue.png);
	background-repeat: no-repeat;
	background-position: center center;
	position: relative;
	height: 360px;
	overflow: hidden;
	opacity: 1;
	transition: opacity 0.6s ease-in-out,
				padding 0.6s ease-in-out,
				height 0.6s ease-in-out 0.4s;
}
.nav-loading.nav-loading-hidden{
	height: 54px;
	opacity: 0;
	padding: 0;
}
.header-area{
	position: relative;
	min-height: 400px;
	cursor: pointer;
	z-index: 100;
}
.header-area .spot{
	position: relative;
	top: 0px;
}
.header-area:hover .spot{
	animation:slideDown .5s infinite;
	-webkit-animation:slideDown .5s infinite;
	-moz-animation:slideDown .5s infinite;
	-ms-animation:slideDown .5s infinite;
	-o-animation:slideDown .5s infinite;
}
.header-school{
	position: absolute;
	right: 0;
	bottom: 54px;
	width: 440px;
	height: 191px;
	background-image: url(/images/bg-school.png);
	background-repeat: no-repeat;
	background-position: bottom center;
	z-index: 105;
}
.header-area-title{
	font-size: 18px;
}
.nav-bar{
	position: absolute;
	top: 0;
	width: 100%;
	height: 54px;
	min-width: 1200px;
	transform: scale(0,0);
	background-color: #2983f3;
	opacity: 0;
	transition: all 0.8s ease-in-out ;
}
.nav-bar.nav-bar-active{
	transform: scale(1,1);
	opacity: 1;
}
.nav-bar-list{
	text-align: center;
}
.nav-bar-list li{
	display: inline-block;
}
.nav-bar-list li a{
	display: block;
	width: 180px;
	padding: 15px 0;
	text-align: center;
	font-size: 16px;
	color: #fff;
}
.nav-bar-list li.active a{
	background-color: #76a0f9;
}
.nav-bar-list > li:hover .nav-bar-dropdown{
	display: block;
}
.nav-bar-dropdown{
	display: none;
	position: absolute;
	border: 1px solid #bbb;
	border-top: 0;
	text-align: center;
	background-color: #fff;
	z-index: 99;
}
.nav-bar-dropdown li > a{
	display: block;
	padding: 8px 0;
	font-size: 12px;
	color: #666;
}
.nav-bar-dropdown li > a:hover{
	background: #2983f3;
	color: #fff;
}
.ecard-info,
.ecard-unbind,
.ecard-loss,
.ecard-notOpen,
.ecard-error{
	position: relative;
	width: 364px;
	height: 194px;
	padding: 30px 30px 20px;
	border-radius: 10px;
	border: 2px solid #1b16a7;
	box-sizing: border-box;
	box-shadow: 1px 1px 2px #357bf5;
	background-color: #fff;
	background-image: url(/images/ecard_nor.png);
	background-repeat: repeat-x;
	background-position: 0 135px;
}
.ecard-error,
.ecard-loss,
.ecard-notOpen{
	box-shadow: none;
	color: #d2d2d2;
	background-image: url(/images/ecard_unbind.png);
}
.ecard-person{
	color: #2983F3;
	font-size: 16px;
}
.ecard-sum{
	color: #2983F3;
	font-size: 24px;
}
.ecard-unbind .ecard-sum,
.ecard-unbind .ecard-person,
.ecard-loss .ecard-person,.ecard-loss .ecard-sum,
.ecard-notOpen .ecard-person,.ecard-notOpen .ecard-sum{
	color: #d2d2d2
}

.ecard-status{
	width: 51px;
	height: 30px;
	background-image: url(/images/ecard_status.png);
	background-repeat: no-repeat;
	background-position: 0 0;
}
.ecard-loss .ecard-status{
	background-position: center -30px;
}
.ecard-notOpen  .ecard-status{
	background-position: center -60px;
}
.ecard-error .ecard-status{
	background-position: 0 -90px;
}
.ecard-recharge,.ecard-forbidden{
	position: absolute;
	bottom: 60px;
	left: 260px;
	z-index: 121;
	width: 193px;
	height: 179px;
	background-image: url(/images/charge_status.png);
	background-repeat: no-repeat;
	background-position: 0 -179px;
}
.ecard-forbidden{
	background-position: 0 0;
}
.ecard-recharge-content{
	position: absolute;
	top: 55px;
	left: 20px;
	width: 165px;
}
.ecard-recharge-content input[type="text"]{
	width: 155px;
	height: 28px;
	padding: 0 5px;
	background-color: #f7e2c3;
}
.ecard-forbidden .ecard-recharge-content input[type="text"]{
	cursor: not-allowed;
	background-color: #fff;
}
.ecard-recharge-content a{
	position: absolute;
	display: block;
	top: 0;
	right: 0;
	width: 64px;
	height: 28px;
	line-height: 28px;
	font-size: 12px;
	background-color: #f7e2c3;
}
.ecard-recharge-content a.disabled,
.ecard-recharge-content a.disabled:hover{
	cursor: not-allowed;
	color: #999;
}
.ecard-forbidden .ecard-recharge-content a{
	color: #d2d2d2;
	cursor: not-allowed;
	background-color: #fff;
}
.payment-area,.payment-area-unbind{
	//margin-top: 22px;
}
.payment-status{
	width: 229px;
	height: 279px;
	background-image: url(/images/fee-status.png);
	background-repeat: no-repeat;
	background-position: 0 0; 
	margin: 0 auto;
	color: #d2d2d2;
}
.payment-status div{
	position: relative;
	top : 28px;
	left: 15px;
	font-size: 18px;
}
.payment-area-unbind .payment-status{
	background-position: 0 -279px; 
}
.more-choice{
	position: relative;
	top: 160px;
}
.more-choice ul{
	text-align: center
}
.more-choice li{
	display: inline-block;
}
.more-choice li a{
	display: block;
	margin: 0 10px;
	text-align: center;
	font-size: 12px;
}
.more-choice-image{
	width: 50px;
	height: 50px;
	line-height: 50px;
	background-color: #fff;
	border-radius: 50%;
	border: 2px solid #1b16a7;
	overflow: hidden;
}
.more-choice-text{
	color: #fff;
}
.header-deco{
	position: absolute;
	z-index: 102;
	left: 0;
	bottom: 50px;
}
/* 小角动画 */
@keyframes slideDown{
	from{
		top: 0px;
	}
	to{
		top: 10px
	}
}

.service-center i{
	transition: all 0.3s;
}
.service-center:hover i{
	transform: rotate(180deg);
}

.tab-nav{
	list-style: none;
	background-color: #eee;
}
.tab-nav li{
	float: left;
	width: 50%;
}
.tab-nav li a{
	display: block;
	margin: 0 10px;
	padding: 10px 0;
	border-bottom: 3px solid #eee;
	text-align: center;
	color: #444;
}
.tab-nav li.active a{
	color: #357bf5;
	border-bottom: 3px solid #357bf5;
}
.tab-panel{
	display: none;
}
.tab-panel.active{
	display: block;
}

#swiper-close{
	border-color: #fb1b3a;
}
#swiper-close:hover{
	background-color: #fb1b3a;
}
.swiper-slide{
	height: 308px;
	overflow-y: auto;
}
.imp-msg-close .el-icon-close{
	display: none;
}
.hidden{
	display: none;
}
#school-prev,#swiper-prev{
	position:absolute;
	top: 0;
	left: 24px;
	font-size: 12px;
	background-color: transparent;
	border: none;
	color: #fff;
	line-height: 46px;
	cursor: pointer;
}
.swiper-back-status{
	display: none;
}
</style>
