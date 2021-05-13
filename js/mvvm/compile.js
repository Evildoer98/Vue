function Compile(el, vm) {
    this.$vm = vm
    this.$el = this.isElementNode(el) ? el : querySelector(el)
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el)
        this.init()
        this.$el.appendChild(this.$fragment)
    }
}