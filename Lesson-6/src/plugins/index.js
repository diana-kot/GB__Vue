export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true


        Vue.prototype.$modal = {
            EventBus: new Vue(),
            show(name, settings) {
                this.EventBus.$emit('show', {name, settings})
            },
            hide() {
                this.EventBus.$emit('hide')
            },
        },

        Vue.prototype.$menu = {
            EventBus: new Vue(),
    
            show(name, params) {
                this.EventBus.$emit( 'shown', {name, params} );
            },
    
            hide() {
                this.EventBus.$emit( 'hiden' );
            }
        }
    }
}