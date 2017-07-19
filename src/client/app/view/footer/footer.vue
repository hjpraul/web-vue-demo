<template>
	<div class="footer">
		<div class="container text-center">
			<img src="/images/code.png">
		</div>
		<div class="line"></div>
		<div class="container text-center margin-top-30">
			<div>
				<a href="" class="footer-third">
					<img src="/images/weixin.png">
				</a>
				<a href="" class="footer-third">
					<img src="/images/weibo.png">
				</a>
			</div>
			<div class="margin-top-10">
				<router-link to="/service/custom" class="footer-addition">
					问题反馈
				</router-link>
				<span class="color-small">|</span>
				<router-link to="/about" class="footer-addition">
					关于我们
				</router-link>
			</div>
			<div class="color-small text-small margin-top-10">
				客服电话: 400-028-1024
			</div>
			<div class="color-small text-small margin-top-10">
				Copyright© 成都智汇安新科技有限公司 版权所有 2014 蜀ICP备13028759号-3
			</div>
		</div>
    </div>
</template>

<script>
	export default {
		name: 'vue-footer'
	}
</script>

<style>
	.footer{
		width: 100%;
		min-width: 1200px;
		height: 280px;
		margin-top: -400px;
		padding: 40px 0 80px;
		background-color: #f9f9f9;
	}
	.footer-third{
		margin: 0 10px;
	}
	.footer-addition{
		margin: 0 15px;
		color: #666;
	}
	.footer-addition:hover{
		color: #333;
	}
</style>
