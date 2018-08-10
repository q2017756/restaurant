<template>
    <div class="unified-bg">
        <app-header :btnShow="false"></app-header>
        <div class="contianer">
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">営業日</span>
                </div>
                <div class="tab-inner">
                    <el-checkbox-group v-model="checkList" class="sel-week">
                        <el-checkbox label="月"></el-checkbox>
                        <el-checkbox label="火"></el-checkbox>
                        <el-checkbox label="水"></el-checkbox>
                        <el-checkbox label="木"></el-checkbox>
                        <el-checkbox label="金"></el-checkbox>
                        <el-checkbox label="土"></el-checkbox>
                        <el-checkbox label="日"></el-checkbox>
                        <el-checkbox label="祝日"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">営業日</span>
                </div>
                <div class="tab-inner">
                    <div class="time-wrap">
                        <div class="pull-left">
                        <div class="inner-txt">ランチ</div>
                        <el-select v-model="value" placeholder="OPEN">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        -
                        <el-select v-model="value" placeholder="L.O">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="time-line pull-left"></div>
                    <div class="pull-left">
                        <div class="inner-txt">ディナー</div>
                        <el-select v-model="value" placeholder="OPEN">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        -
                        <el-select v-model="value" placeholder="L.O">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">混雑基準</span>
                </div>
                <div class="tab-inner">
                    <div class="inner-txt">△</div>
                    <div class="group-input group1">
                        <el-input v-model="input" placeholder="内容を入力してください"></el-input>
                        <span class="ml12 mr24">組以上</span>
                        <el-input v-model="input" placeholder="内容を入力してください"></el-input>
                        <span class="ml12">人以上</span>
                    </div>
                    <div class="inner-txt">x</div>
                    <div class="group-input">
                        <el-input v-model="input" placeholder="内容を入力してください"></el-input>
                        <span class="ml12 mr24">組以上</span>
                        <el-input v-model="input" placeholder="内容を入力してください"></el-input>
                        <span class="ml12">人以上</span>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">通知メール</span>
                </div>
                <div class="tab-inner">
                    <div class="inner-txt">メールアドレス</div>
                    <el-input class="email-input" v-model="input" placeholder="内容を入力してください"></el-input>
                </div>
            </div>
            <div class="opr-btns pull-right">
                <el-button class="remarks-btn" plain @click="toDetail">詳細設定</el-button>
                <el-button class="remarks-btn" type="primary" @click="setInfo">登録</el-button>
                <el-button class="remarks-btn" plain @click="toPre">戻る</el-button>
            </div>
        </div>
        <app-modal :options="modalOptions" v-show="modalOptions.show" @submit="doConfirm">
            <div slot="body">
                <p class="model-body-txt">{{ modalMsg }}</p>
            </div>
        </app-modal>
    </div>
</template>

<script>
    import AppModal from "../components/AppModal.vue";
    import AppHeader from "../components/AppHeader.vue";

    export default {
        data() {
            return {
                checkList: [],
                value: '',
                options: [],
                input: '',
                modalStatus: 1,
                modalMsg: '',
                modalOptions: {
                    show: false,
                    title: ' ',
                    showCancelButton: true,
                    cancelButtonText: 'キャンセル',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                }
            };
        },
        components: {
            AppModal,
            AppHeader
        },
        computed: {},
        methods: {
            toDetail() {
                this.$router.push('detailSet');
            },
            setInfo() {
                this.modalOptions.show = true;
                this.modalMsg = '登録します。よろしいですか？';
                this.modalStatus = 1;
            },
            toPre() {
                this.modalOptions.show = true;
                this.modalMsg = '台帳に戻ってよろしいでしょうか？';
                this.modalStatus = 2;
            },
            doConfirm() {
                if(this.modalStatus === 1) {
                    console.log('接口：保存');
                }else if(this.modalStatus === 2) {
                    this.$router.push('calendar');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .pull-left {
        float: left;
    }
    .pull-right {
        float: right;
    }
    .ml12 {
        margin-left: 12px;
    }
    .mr24 {
        margin-right: 24px;
    }
    .contianer {
        background: url('../assets/img/set-bg.png') no-repeat;
        width: 1080px;
        margin: 60px auto;
        background-color: #fff;
        padding: 60px 30px 135px 30px;
        .tab {
            margin-bottom: 30px;
            .tab-title {
                margin-bottom: 30px;
                font-size: 30px;
                color: #142343;
                .title-line {
                    display: inline-block;
                    width: 6px;
                    height: 36px;
                    margin-right: 24px;
                    background-color: #ded5a7;
                }
                .title-txt {
                    display: inline-block;
                    vertical-align: top;
                }
            }
            .group-input .el-input {
                width: 240px;
            }
            .tab-inner {
                .sel-week .el-checkbox {
                    border: 1px solid #ddd;
                    box-shadow: 1px 1px 1px #ddd;
                    padding: 15px 20px;
                    span.el-checkbox__label {
                        font-size: 24px;
                    }
                }
                .time-line {
                    width: 1px;
                    height: 100%;
                    background-color: #ddd;
                    margin: 0 30px;
                }
                .time-wrap {
                    height: 85px;
                    .el-select {
                      width: 240px;
                    }
                }
                .inner-txt {
                    font-size: 24px;
                    margin-bottom: 18px;
                    color: #142343;
                }
                .group1 {
                    margin-bottom: 30px;
                }
                .email-input {
                    width: 590px;
                }
            }
        }
        .opr-btns {
            height: 46px;
            margin-top: 30px;
            button {
                margin-left: 30px;
                padding: 15px 91px;
            }
        }
    }
</style>
