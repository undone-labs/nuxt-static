import Button from './button.vue'

export default {
  title: 'Components/Button',
  component: Button
}

const defaultTemplate = {
  components: {
    Button
  },
  template: `<div>
    <Button :button="button" />
    <h6 :style="{'marginTop': '20px'}">Disabled</h6>
    <Button disabled :button="button" />
  </div>`,
  props: {
    button: {}
  }
}

export const Solid = args => (defaultTemplate)
Solid.args = {
  button: {
    type: 'solid',
    text: 'Solid'
  }
}

export const Underline = args => (defaultTemplate)
Underline.args = {
  button: {
    type: 'underline',
    text: 'Underline'
  }
}
