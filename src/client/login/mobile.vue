<template>
	<div class="login-main container" style="display: none;">
		<div class="login-panel">
			<div id="mobile" v-show="showMobile" v-cloak>
				<form action="/api/users/queryPhone" method="post" id="mobile-form">
				<el-card class="box-card">
					<el-row class="color-pink" style="height: 24px;">
						{{ warning }}
					</el-row>
					<el-row class="margin-top-10">
						<el-input placeholder="输入手机号" name="mobile" maxlength=11 v-model="mobile" @focus="mobileFocus"></el-input>
					</el-row>
					<el-row class="margin-top-10">
						<el-col :span="24">
							<el-button type="primary" native-type="submit" style="width: 100%" :disabled="enabled" :loading="loading">下一步</el-button>
						</el-col>
					</el-row>
					<el-row class="margin-top-10" style="height: 24px;">
					</el-row>
				</el-card>
				</form>
			</div>
			<div id="password" v-show="showPassword" v-cloak>
				<form action="/api/users/login" method="post" id="password-form" v-on:submit.prevent="passwordSubmit">
				<el-card class="box-card">
					<el-row class="color-pink" style="height: 24px;">
						{{ warning }}
					</el-row>
					<el-row class="margin-top-10">
						<el-input placeholder="输入密码" type="password" v-model="password" name="password" @focus="pwdFocus"></el-input>
						<input type="hidden" name="mobile" class="mobile-hidden">
						<input type="hidden" name="attribute_code" value="2HADFASDFAFDS3A">
					</el-row>
					<el-row class="margin-top-10">
						<el-col :span="24">
							<el-button type="primary" style="width: 100%" :disabled="enabled" :loading="loading" onclick="passwordSubmit()">登 录</el-button>
						</el-col>
					</el-row>
					<el-row class="margin-top-10">
						<el-col :span="12">
							<a href="javascript:;" @click="modifyMobile">返回修改手机号</a>
						</el-col>
						<el-col :span="12" class="text-right">
							<a href="javascript:;" @click="forgetPwd=true">忘记密码 ?</a>
						</el-col>
					</el-row>
				</el-card>
				</form>
				<el-dialog title="忘记密码" 
					:visible.sync="forgetPwd" 
					size="tiny"
					@open="changePwdOpen" @close="closeDialog">
      <i class="el-icon-close" @click="closeDialogC"></i>
					<div class="tips" :class="warnClass">
          {{ warn }}
      </div>
					<div class="dialog-content">
		  				<el-form :model="formFgPwd" ref="formFgPwd">
								<el-form-item 
									label="请输入手机号" 
									:label-width="formLabWidth">
									<el-input 
										v-model="formFgPwd.mobile" 
										auto-complete="off"
                disabled>
									</el-input>
								</el-form-item>
								<el-form-item
									label="请输入验证码" 
									:label-width="formLabWidth" 
									class="verify-code">
										<el-input type="text" v-model="formFgPwd.secureity_code" :maxlength=4 
											@focus="verifyFocus" style="display: block;">
									</el-input>
									<div class="verify-code-btn">
										<el-button type="primary" 
											:disabled="verifyEnabled" 			
											@click="verifyGet" 
											style="width: 100px;height:40px;position:absolute;top:36px;right:0;">{{verifyText}}</el-button>
									</div>
								</el-form-item>
								<el-form-item label="请设置6位以上的密码" :label-width="formLabWidth">
									 <el-input v-model="formFgPwd.new_password" type="password" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item class="text-center">
									<el-button 
										type="primary" 
										:loading="loading" 
										:disabled="enabledFgPwd"
										@click="pwdUpdate()">确认修改</el-button>
								</el-form-item>
							</el-form>
						</div>
				</el-dialog>
			</div>
			<div id="regist" v-show="showRegist" v-cloak>
				<form action="/api/users/register" method="post" id="regist-form"  v-on:submit.prevent="registSubmit">
				<el-card class="box-card">
					<el-row class="color-pink" style="height: 24px;">
						{{ warning }}
					</el-row>
					<el-row class="margin-top-10 verify-code">
						<el-input type="text" placeholder="输入验证码" v-model="verify" name="secureity_code" maxlength="4" @focus="verifyFocus">
						</el-input>
						<div class="verify-code-btn">
							<el-button type="primary" :disabled="verifyEnabled" @click="verifyGet" style="width: 100px; height: 40px;">{{verifyText}}</el-button>
						</div>
						<input type="hidden" name="mobile" class="mobile-hidden">
						<input type="hidden" name="attribute_code" value="2HADFASDFAFDS3A">
					</el-row>
					<el-row class="margin-top-10">
						<el-input placeholder="请设置6位以上的密码" type="password" name="password" v-model="registPwd"></el-input>
					</el-row>
					<el-row class="margin-top-10">
						<el-col :span="24">
							<el-button type="primary" style="width: 100%" :loading="loading" :disabled="enabled" onclick="registSubmit()">登 录</el-button>
						</el-col>
					</el-row>
					<el-row class="margin-top-10">
						<a href="javascript:;" @click="modifyMobile">返回修改手机号</a>
					</el-row>
				</el-card>
				</form>
			</div>
		</div>
		<div class="login-bg-deco">
			<img src="../image/login-logo.png"  width="650">
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>