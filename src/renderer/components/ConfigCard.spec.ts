import { render } from '@testing-library/vue'
import ConfigCard from './ConfigCard.vue'

test('renders title and description', () => {
  const { getByText } = render(ConfigCard, {
    props: {
      title: 'My Title',
      desc: 'My description',
      icon: 'mdi:settings',
      type: 'custom'
    },
    global: {
      components: {
        'x-card': {
          template: '<div><slot/></div>'
        }
      },
      stubs: {
        Icon: true,
        'x-button': true,
        'x-input': true,
        'x-select': true,
        'x-menu': true,
        'x-menuitem': true,
        'x-switch': true,
        'x-label': true
      }
    }
  })

  getByText('My Title')
  getByText('My description')
})
