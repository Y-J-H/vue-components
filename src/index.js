import MSElTable from './components/MSElTable/index.js'

const components = [MSElTable]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

components.forEach(component => {
  component.install = install
})

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default {
  install,
  MSElTable
}
