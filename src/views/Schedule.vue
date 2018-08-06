<template>
    <div class="unified-bg">
        <app-header></app-header>
        <div class="contianer">
            <div class="remarks">
                <p class="title">当日備考:</p>
                <el-input
                        class="remarks-content"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                        placeholder=""
                        v-model="remarks">
                </el-input>
                <div class="btn-contianer">
                    <el-button class="remarks-btn" size="mini" plain>料理MENU</el-button>
                    <el-button class="remarks-btn" size="mini" plain>ドリンクMENU</el-button>
                    <el-button class="remarks-btn" size="mini" plain>その他資料</el-button>
                </div>
            </div>
            <div class="table-contianer">
                <div class="add-btn" @click="showModal">
                    <img src="/img/add.png" alt="">
                    <span>新規登録</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>会場名</th>
                        <th>法人・団体名</th>
                        <th>区分</th>
                        <th>お料理</th>
                        <th>料理詳細</th>
                        <th>シチュエーション</th>
                        <th>受日</th>
                        <th colspan="2">宴会・法人履歴</th>
                        <th>修正</th>
                    </tr>
                    <tr>
                        <th>時間</th>
                        <th>ご予約者名（フリガナ）</th>
                        <th>人数（子供）</th>
                        <th>TEL</th>
                        <th colspan="2">その他備考</th>
                        <th></th>
                        <th colspan="2">婚礼・個人履歴</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>バンケット</td>
                        <td></td>
                        <td>ぐるなび</td>
                        <td>3000</td>
                        <td>子供１名様は料理当日</td>
                        <td>1</td>
                        <td>2016/7/28</td>
                        <td><span class="color-btn blue">宴</span></td>
                        <td class="long-td"></td>
                        <td>
                            <el-button size="mini" plain @click="toEdit">修正</el-button>
                        </td>
                    </tr>
                    <tr class="tr-disabled">
                        <td>18:00:00</td>
                        <td>マスダ　様）</td>
                        <td>3名（１名）</td>
                        <td>090-4007-2714</td>
                        <td colspan="2">H23.11.5迎賓館で挙式をされた方です。担当武藤　新規水野　インフォメーション加藤さんの友人です（当日加藤さん挨拶に入ります）</td>
                        <td>受：水野</td>
                        <td><span class="color-btn">婚</span></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <app-modal :options="modalOptions" v-show="modalOptions.show" @submit="toAdd">
            <div slot="body">
                <p class="model-body-txt">{{ modalMsg }}</p>
            </div>
        </app-modal>

        <app-modal :options="leaveModalOptions" v-show="leaveModalOptions.show" @submit="saveAndLeave">
            <div slot="body">
                <p class="model-body-txt">当日備考が修正されました。登録してよろしいでしょうか？</p>
            </div>
            <span slot="btn" @click="forceLeave">
                <a class="btn-cancel">いいえ</a>
            </span>
        </app-modal>
    </div>
</template>

<script>
    import AppModal from "../components/AppModal.vue";
    import AppHeader from "../components/AppHeader.vue";

    export default {
        data() {
            return {
                oldRemarks: '备注1：xxx',
                remarks: '备注1：xxx',
                status: 1,
                modalMsg: '',
                otherBtnShow: false,
                canILeave: false,
                toName: '',
                modalOptions: {
                    show: false,
                    title: ' ',
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    showConfirmButton: true,
                    confirmButtonText: '確認'
                },
                leaveModalOptions: {
                    show: false,
                    title: ' ',
                    showCancelButton: true,
                    cancelButtonText: 'キャンセル',
                    showConfirmButton: true,
                    confirmButtonText: 'はい'
                }
            };
        },
        components: {
            AppModal,
            AppHeader
        },
        computed: {},
        methods: {
            showModal() {
                this.modalOptions.show = true;
                if(this.status === 1) {
                    this.modalMsg = '混雑条件以上なっています！';
                }else if (this.status === 2) {
                    this.modalMsg = '満席条件以上入っています！';
                }else if (this.status === 3) {
                    this.modalMsg = '満席条件以上入っています！';
                }
            },
            toAdd() {
                if(this.status === 1 || this.status === 2) {
                    this.$router.push('reserveInfo');
                }
            },
            toEdit() {
                this.$router.push('reserveInfo');
            },
            saveAndLeave() {
                console.log('保存备注');
                this.canILeave = true;
                this.$router.push(this.toName);
            },
            forceLeave() {
                console.log('不保存备注，强制离开');
                this.canILeave = true;
                this.$router.push(this.toName);
            }
        },
        beforeRouteLeave (to, from, next) {
            if(this.remarks === this.oldRemarks) {
                next();
            }else {
                this.leaveModalOptions.show = true;
                this.toName = to.name;
                if(this.canILeave) {
                    next();
                }else {
                    next(false);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .contianer {
        width: 80vw;
        min-width: 1000px;
        margin: 60px auto;
    }

    .remarks {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            flex: 0 0 auto;
            margin-right: 10px;
            font-size: 24px;
            font-weight: bold;
        }
        .remarks-content {
            height: 120px;
            font-size: 18px;
        }
        .btn-contianer {
            flex: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 120px;
        }
        .remarks-btn {
            width: 200px;
            margin-left: 30px;
            font-size: 18px;
        }
    }

    .table-contianer {
        .add-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 240px;
            height: 45px;
            margin: 30px 0;
            background: #DED5A7;
            border: 1px solid #DED5A7;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            img {
                margin-right: 10px;
            }
            &:hover {
                border: 1px solid #eee;
            }
        }
        table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            th {
                padding: 10px 0;
                border: 1px solid #fff;
                background: #DED5A7;
                color: #142343;
            }
            tbody {
                tr {
                    background: #F9F9F9;
                    &:nth-child(4n - 1), &:nth-child(4n) {
                        background: #F0F0F0;
                    }
                }
                .tr-disabled {
                    opacity: 0.3;
                }
                td {
                    width: 70px;
                    padding: 10px 0;
                    border: 1px solid #ddd;
                    color: #142343;
                }
                .long-td {
                    width: 100px;
                }
            }
        }

        .color-btn {
            display: inline-block;
            width: 60px;
            height: 30px;
            background: #F95F5A;
            border: 1px solid #F95F5A;
            border-radius: 10px;
            line-height: 30px;
            color: #fff;
            &.gray {
                background: #fff;
                border: 1px solid #ddd;
                color: #ddd;
            }
            &.blue {
                background: #39B5E2;
                border: 1px solid #39B5E2;
                color: #fff;
            }
        }
    }
</style>
