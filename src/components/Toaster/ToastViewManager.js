const {withTiming} = require('react-native-reanimated')

const generateId = () => Math.random().toString(36).substr(2, 9)

const defaultConfig = {
  duration: 3000,
  maxToasts: 3,
  style: {
    height: 50,
    marginBottom: 10,
  },
}

class ToastViewManager {
  constructor() {
    // Order toasts top-to-bottom by ID
    this.toasts = []
    // Map toast IDs to sharedValues and configs
    this.toastSharedValues = {}
    this.toastConfigs = {}
    this.config = defaultConfig
    this.setter = () => {}
  }

  _generateConfig = (cfg) => {
    const config = {...this.config, ...cfg}
    return config
  }

  _triggerLayout = () => this.setter(this.toasts)

  setDefaultConfig = (cfg) => {
    this.config = this._generateConfig(cfg)
  }

  dismiss = (id) => {
    if (this.toasts.some((_id) => _id === id)) {
      this.toastSharedValues[id].value = withTiming(0)
      this.toasts = this.toasts.filter((_id) => _id !== id)
      delete this.toastConfigs[id]
      delete this.toastSharedValues[id]
    }
  }

  show = (config) => {
    if (!config.render) {
      throw new Error(
        "Toast config must have property 'render' that returns jsx.",
      )
    }
    const newId = generateId()
    const newConfig = this._generateConfig(config)
    this.toasts = [newId, ...this.toasts]
    this.toastConfigs[newId] = newConfig
    this._triggerLayout()
    if (this.toasts.length > this.config.maxToasts) {
      const oldestToast = this.toasts[this.toasts.length - 1]
      this.dismiss(oldestToast)
    }
  }

  setSharedValue = (id, sharedValue) => {
    this.toastSharedValues[id] = sharedValue
  }
}

module.exports = {ToastViewManager: new ToastViewManager()}
