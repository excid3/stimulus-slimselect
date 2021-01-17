import { Controller } from 'stimulus'
import SlimSelect from 'slim-select'

export default class extends Controller {
  connect() {
    this.slimselect = new SlimSelect({
      select: this.element
    })
  }

  disconnect() {
    this.slimselect.destroy()
  }
}
