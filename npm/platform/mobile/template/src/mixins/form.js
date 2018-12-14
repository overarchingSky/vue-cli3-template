export default {
    alidate() {
        return this.$validator.validateAll().then(result => {
            if (result) {
                return Promise.resolve(this.form);
            } else {
                let message = this.errors.items
                        ? this.errors.items[0].msg
                        : "验证出现异常！"
                this.$toast.error(message)
                return Promise.reject();
            }
        });
    },
    reset(){
        //
    }
}