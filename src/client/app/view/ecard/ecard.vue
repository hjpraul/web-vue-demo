<template>
    <div class="ecard-main">
        <div class="clearfix" v-if="ecardInfo">
            <div class="ecard-info float-left" v-if="ecardInfo.status =='OK'">
                <div class="ecard-logo clearfix">
                    <div class="ecard-status float-right"></div>
                </div>
                <div class="ecard-person">
                    {{ user.ecard_account.account_no }}
                    &nbsp;
                    {{ user.ecard_account.name }}
                </div>
                <div class="ecard-sum margin-top-10">
                    ￥{{ Number(ecardInfo.card_balance).toFixed(2) ? Number(ecardInfo.card_balance).toFixed(2) : "0.00" }}
                </div>
            </div>
            <div class="ecard-loss float-left" v-else-if="ecardInfo.status =='ReportLoss'">
                <div class="ecard-logo clearfix">
                    <div class="ecard-status ecard-status-error float-right"></div>
                </div>
                <div class="ecard-person filter-gray">
                    {{ ecardInfo.card_no }}
                    &nbsp;
                    {{ ecardInfo.student_name }}
                </div>
                <div class="ecard-sum margin-top-10  filter-gray">
                    一卡通已挂失
                </div>
            </div>
            <div class="margin-top-10 float-right">
                <div class="ecard-charge" v-if="ecardInfo.status =='OK'">
                    <div class="charge-list clear-fix">
                        <div class="float-left">
                            <template v-for="(chargeAmt,index) in ecardInfo.recharge_amts">
                                <div class="ecard-recharge-option input-disp" :data-recharge="chargeAmt" @click="rechargeChange">
                                    <div class="ecard-recharge-deco"></div>
                                    {{ chargeAmt }}元
                                </div>
                            </template>
                        </div>
                        <div class="float-right" style="line-height: 40px;">
                            <div v-if="ecardInfo.recharge_amts && ecardInfo.recharge_amts.length<=3" style=" margin-right: 15px;display:inline-block;height: 36px;vertical-align: middle;">
                                <el-input type="text" placeholder="1-300任意金额" v-model="customAmt"></el-input>
                            </div>
                            <el-button type="primary" @click="recharge" :disabled="enabled" style="vertical-align: middle;">充值</el-button>
                            
                        </div>
                    </div>
                    <p class="margin-top-10 text-small color-green" v-if="ecardInfo.charge_notice" style="margin-left: 50px;">
                        <i class="el-icon-information"></i>
                        {{ ecardInfo.charge_notice }}
                    </p>
                </div>
                <div class="ecard-charge ecard-charge-lost" v-else-if="ecardInfo.status =='ReportLoss'">
                    <div class="charge-list clear-fix">
                        <div class="float-left">
                            <template v-for="(chargeAmt,index) in ecardInfo.recharge_amts">
                                <div class="ecard-recharge-option-disabled input-disp">
                                    <div class="ecard-recharge-deco"></div>
                                    {{ chargeAmt }}元
                                </div>
                            </template>
                        </div>
                        <div class="float-right">
                            <el-button type="primary" disabled>充值</el-button>
                        </div>
                        <div class="float-right" v-if="ecardInfo.recharge_amts && ecardInfo.recharge_amts.length< 4" style="margin-top: 4px; margin-right: 15px;">
                            <el-input type="text" placeholder="1-300任意金额" disabled></el-input>
                        </div>
                    </div>
                    <p class="margin-top-10 text-small color-pink" v-if="ecardInfo.charge_notice" style="margin-left: 50px;">
                        <i class="el-icon-information"></i>
                        {{ ecardInfo.charge_notice }}
                    </p>
                </div>
                <div class="margin-top-10 text-small" v-if="ecardInfo.losscard_type!='unsupported' && ecardInfo.status=='OK'" style="margin-left: 50px;">
                    <a href="javascript:;" class="ecard-lost" @click="dialogLostVisible = true">
                        <i class="el-icon-warning"></i>
                        一卡通挂失，请点击这里
                    </a>
                </div>
                <div class="margin-top-10 text-small" v-if="ecardInfo.cancelfreeze_type!='unsupported' && ecardInfo.status=='ReportLoss'" style="margin-left: 50px;">
                    <a href="javascript:;" class="ecard-relieve" @click="dialogRelieveVisible = true">
                        <i class="el-icon-warning"></i>
                        一卡通已挂失，点击这里解挂
                    </a>
                </div>
            </div>
        </div>
        <div class="margin-top-30">
            <el-tabs v-model="activeName" @tab-click="routerView">
                <el-tab-pane label="付款记录" name="records"></el-tab-pane>
                <el-tab-pane label="账户明细" name="detail"></el-tab-pane>
            </el-tabs>
            <div class="tab-content">
                <router-view></router-view>
            </div>
        </div>
        <el-dialog title="一卡通挂失" :visible.sync="dialogLostVisible">
            <div class="tips" :class="ecardLostClass">
                {{ ecardLostWarning }}
            </div>
            <div class="dialog-content">
                <el-form method="post" label-position="top" v-model="ecardLost">
                    <el-form-item label="一卡通密码" label-width="auto" class="margin-bottom-0">
                        <el-input v-model="ecardLost.password" type="password" placeholder="必填项"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer margin-top-10">
                <el-button type="primary" @click="ecardLostSubmit" :disabled="ecardLostEnabled" :loading="ecardLostLoading">确 定</el-button>
                <el-button @click="dialogLostVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="一卡通解挂" :visible.sync="dialogRelieveVisible">
            <div class="tips" :class="ecardRelieveClass">
                {{ ecardRelieveWarning }}
            </div>
            <div class="dialog-content">
                <el-form method="post" label-position="top" v-model="ecardRelieve">
                    <el-form-item label="一卡通密码" label-width="auto" class="margin-bottom-0">
                        <el-input v-model="ecardRelieve.password" type="password" placeholder="必填项"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer margin-top-10">
                <el-button type="primary" @click="ecardRelieveSubmit" :disabled="ecardRelieveEnabled" :loading="ecardRelieveLoading">确 定</el-button>
                <el-button @click="dialogRelieveVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import $ from 'jquery'

    export default {
        data () {
            return {
                activeName: '',
                ecardInfo: null,
                user: null,
                customAmt: '',
                ecardRecharge: '',
                enabled: true,
                dialogVisible: false,
                dialogLostVisible: false,
                dialogRelieveVisible: false,
                ecardLost: {
                    password: ''
                },
                ecardRelieve: {
                    password: ''
                },
                ecardLostLoading: false,
                ecardLostWarning: '',
                ecardLostClass: '',
                ecardRelieveLoading: false,
                ecardRelieveWarning: '',
                ecardRelieveClass: ''
            }
        },
        created() {
            let _this = this;
            let ecard = new Promise((resolve, reject)=>{
                this.$myHttpRequest({
                    path : "/api/ecard/getEcard",
                    type : "get",
                    success : function(result){
                        resolve(result.ecard);
                    },
                    failure : function (resp) {
                        // TODO:
                    }
                });
            });
            
            let user = new Promise((resolve, reject)=>{
                this.$myHttpRequest({
                    path : "/api/users/getInfo",
                    type : "get",
                    success : function(resp){
                        resolve(resp.customer);
                    },
                    failure : function(resp){
                        // TODO:
                    }
                });
            });

            Promise.all([ecard, user]).then(function(value){
                _this.ecardInfo = value[0];
                _this.user = value[1];
            });
        },
        updated() {
            this.activeName = this.$route.name;
        },
        computed: {
            ecardLostEnabled() {
                return !(this.ecardLost.password);
            },
            ecardRelieveEnabled() {
                return !(this.ecardRelieve.password);
            }
        },
        methods: {
            routerView(tab) {
                this.$router.push({name: tab._props.name});
            },
            rechargeChange(event) {
                let $target = $(event.target).closest('.ecard-recharge-option');
                let $all = $target.siblings();
                if ($target.hasClass('active')){
                    $target.removeClass('active');
                    this.enabled = true;
                }
                else {
                    $all.removeClass('active');
                    $target.addClass('active');
                    let recharge = $target.attr('data-recharge');
                    this.ecardRecharge = recharge;
                    this.enabled = false;
                }
                this.customAmt = '';
            },
            recharge () {
                var _this = this;
                let recharge = _this.ecardRecharge;
                console.log(recharge);
                let verify = /^([1-9]\d*|0\.\d{1,2}|[1-9]\d*(\.\d{1,2}))?$/;
                if (!(verify.test(parseFloat(recharge)))){
                    _this.enabled = true;
                    _this.customAmt = '';
                    return false;
                }
                
                this.$router.push({ path: '/ecardorder', query: {total : recharge}});
            },
            PushCharge(){
                var _this = this;
                let recharge = _this.ecardRecharge;
               
                let verify = /^([1-9]\d*|0\.\d{1,2}|[1-9]\d*(\.\d{1,2}))?$/;
                if (!(verify.test(parseFloat(recharge))) || parseFloat(recharge) > 300 || parseFloat(recharge) < 1){
                     console.log(recharge);
                    _this.enabled = false;
                    return false;
                }
            },
            ecardLostSubmit() {
                let _this = this;
                this.ecardLostWarning = '';
                this.ecardLostClass = '';
                this.ecardLostLoading = true;
                this.$myHttpRequest({
                    path : "/api/ecard/reportLostEcard",
                    type : "post",
                    args : _this.ecardLost,
                    success : function(resp){
                        _this.ecardLostLoading = false;
                        _this.dialogLostVisible = false;
                        _this.$message('挂失成功');
                        setTimeout(()=>{
                            location.reload();
                        }, 3000);
                    },
                    failure : function(resp){
                        _this.ecardLostLoading = false;
                        _this.ecardLostWarning = resp.resp_desc;
                        _this.ecardLostClass = 'bg-pink';
                    }
                });
            },
            ecardRelieveSubmit() {
                let _this = this;
                this.ecardRelieveWarning = '';
                this.ecardRelieveClass = '';
                this.ecardRelieveLoading = true;
                this.$myHttpRequest({
                    path : "/api/ecard/cancelFreezeEcard",
                    type : "post",
                    args : _this.ecardRelieve,
                    success : function(resp){
                        _this.ecardRelieveLoading = false;
                        _this.dialogRelieveVisible = false;
                        _this.$message('解挂成功');
                        setTimeout(()=>{
                            location.reload();
                        }, 3000);
                    },
                    failure : function(resp){
                        _this.ecardRelieveLoading = false;
                        _this.ecardRelieveWarning = resp.resp_desc;
                        _this.ecardRelieveClass = 'bg-pink';
                    }
                });
            }
        },
        mounted() {
            $('.nav-bar-list > li').eq(0).addClass('active');
        },
        beforeRouteLeave (to, from, next) {
            $('.nav-bar-list > li').removeClass('active');
            next();
        },
        watch: {
            customAmt(val) {
                
                if (val){
                    let verify = /^([1-9]\d*|0\.\d{1,2}|[1-9]\d*(\.\d{1,2}))?$/;
                    if (!(verify.test(parseFloat(val))) || parseFloat(val) > 300 || parseFloat(val) < 1){
                        this.enabled = true;
                        this.ecardRecharge = '';
                    }
                    else if(verify.test(val)){
                        console.log('````````````'+val);
                        this.enabled = false;
                    }
                    $('.ecard-recharge-option').removeClass('active');
                }
            }
        }
    }
</script>

<style>
    .ecard-recharge-option-disabled{
        cursor: not-allowed;
        padding: 0 15px;
        color: #2983f3;
        font-size: 16px;
        font-weight: bold;
    }
    .ecard-recharge-option{
        cursor: pointer;
        padding: 0 15px;
        color: #2983f3;
        font-size: 16px;
        font-weight: bold;
    }
    .ecard-recharge-option.active{
        background-color: #e5e5e5;
    }
    .ecard-recharge-deco{
        position: relative;
        top: 6px;
        display: inline-block;
        width: 34px;
        height: 24px;
        overflow: hidden;
        background-image: url(/images/ecard_money_status.png);
        background-position: 0 0;
    }
    .ecard-recharge-deco-disabled{
        background-position: 0 -24px;
    }
    .filter-gray{
        filter: grayscale(100%);  
    }
    .ecard-charge.ecard-charge-lost{
        filter: grayscale(100%);  
    }
    .ecard-lost,
    .ecard-lost:hover{
        color: #ff5e74;
    }
    .ecard-relieve,
    .ecard-relieve:hover{
        color: #1ab760;
    }
</style>
