<template>
  <div class="modal-wrap">
    <div class="modal" v-show="modal.show">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <p class="title">{{modal.title}}</p>
            </slot>
            <a @click="close()" class="xd xd-close"></a>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <slot name="button">
                <a v-if="modal.showConfirmButton" class="button btn-confirm" @click="submit">{{modal.confirmButtonText}}</a>
                <slot name="btn"></slot>
                <a v-if="modal.showCancelButton" class="button btn-cancel" @click="close()">{{modal.cancelButtonText}}</a>
              </slot>
            </slot>
          </div>
        </div>
      </div>
    </div>
		<div v-show="modal.show" class="modal-backup" @click="close()"></div>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data () {
    return {

    };
  },

  computed: {
    modal () {
      let modal = this.options;
      if (modal) {
        modal = {
          show: modal.show || false,
          title: modal.title || '提示',
          showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton,
          cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消',
          showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.showConfirmButton,
          confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定'
        };
      } else { // 使用时没有传递参数
        modal = {
          title: '提示',
          showCancelButton: true,
          cancelButtonClass: 'btn-default',
          cancelButtonText: '取消',
          showConfirmButton: true,
          confirmButtonClass: 'btn-active',
          confirmButtonText: '确定'
        };
      }
      return modal;
    }
  },

  methods: {
    submit() {
      this.$emit('submit')
    },
    close() {
      this.options.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-dialog {
  position: absolute;
  left: 50%;
	top: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  background: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1002;
}

.modal-header {
	height: 36px;
	background-color: #ded5a7;
}

.xd-close {
	float: right;
	margin-top: 5px;
	display: inline-block;
	background: url("../assets/img/btn-close.png") no-repeat;
	width: 35px;
	height: 35px;
	cursor: pointer;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.modal-footer {
	margin-bottom: 45px;
}

.modal-backup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, .2);
}
@media screen and(max-width: 750px) {
  .modal-dialog {
    width: 90vw;
  }
}
</style>
