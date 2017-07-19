<template>
	<div class="root">
		<!-- <block v-if="true"> -->
			<div class="screen-wrapper">
				<div class="screen-main">
					<vue-header></vue-header>
					<div class="main">
						<div class="container">
							<router-view></router-view>
						</div>
					</div>
				</div>
			</div>
	    	<vue-footer></vue-footer>
<!-- 		</block>
		<block v-else>
			<div class="screen-wrapper login-body">
				<div class="login-wrapper">
					<div class="login-header">
						<div class="container">
							<div class="float-left">
								<img src="/images/axinfu-logo.png">
							</div>
						    <div class="login-main container" style="display: none;">
							    <router-view></router-view>
		    				</div>
						</div>
					</div>
				</div>
			</div>
			<div class="login-footer text-center color-small">
				Copyright© 成都智汇安新科技有限公司 版权所有 2014 蜀ICP备13028759号-3 
			</div>
		</block> -->
    </div>
</template>

<script>
import vueHeader from './view/header/header.vue'
import vueFooter from './view/footer/footer.vue'

export default {
	components : {
		vueHeader,
		vueFooter,
	}
}
</script>

<style>
	.screen-main{
		padding-bottom: 400px;
	}	
	.main{
		padding: 20px 0;
	}
</style>

