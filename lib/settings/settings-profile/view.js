import debug from 'debug'
import t from 't-component'
import user from '../../user/user.js'
import FormView from '../../form-view/form-view'
import config from '../../config/config'
import template from './template.jade'
import escuelaStore from 'lib/stores/escuela-store'
import claustroStore from 'lib/stores/claustro-store'

let log = debug('democracyos:settings-profile')

export default class ProfileForm extends FormView {
  /**
   * Creates a profile edit view
   */

  constructor () {
    super(template)
  }

  /**
   * Turn on event bindings
   */

  switchOn () {
    this.on('success', this.bound('onsuccess'))
    /* this.locales = this.find('select#locale')[0]

    config.availableLocales.forEach((locale) => {
      var option = document.createElement('option')
      option.value = locale
      option.innerHTML = t(`settings.locale.${locale}`)
      this.locales.appendChild(option)
    })

    this.locales.value = user.locale || config.locale
    var selected = this.find(`option[value="${this.locales.value}"]`)
    selected.attr('selected', true) */

    claustroStore.findAll().then(claustros => {
      let select = this.find('select#claustro')[0]

      claustros.forEach(claustro => {
        var option = document.createElement('option')
        option.value = claustro._id
        option.innerHTML = claustro.nombre
        if (user.claustro._id == claustro._id)
          option.setAttribute('selected', true)
        select.appendChild(option)
      })
    })

    escuelaStore.findAll().then(escuelas => {
      let select = this.find('select#escuela')[0]

      escuelas.forEach(escuela => {
        var option = document.createElement('option')
        option.value = escuela._id
        option.innerHTML = escuela.nombre
        if (user.escuelas[0]._id == escuela._id)
          option.setAttribute('selected', true)
        select.appendChild(option)
      })
    })

    let select = this.find('select#proyectista')[0]
    let option = document.createElement('option')
    option.value = 'true'
    option.innerHTML = 'Sí'
    if (user.proyectista){
      option.setAttribute('selected', true)
    }
    select.appendChild(option)
    option = document.createElement('option')
    option.value = 'false'
    option.innerHTML = 'No'
    if (!user.proyectista){
      option.setAttribute('selected', true)
    }
    select.appendChild(option)
  }

  /**
   * Turn off event bindings
   */

  switchOff () {
    this.off()
  }

  /**
   * Handle `error` event with
   * logging and display
   *
   * @param {String} error
   * @api private
   */

  onsuccess () {
    log('Profile updated')
    user.load('me')

    user.once('loaded', () => {
      this.find('img').attr('src', user.profilePicture())
      this.messages([t('settings.successfuly-updated')], 'success')

      if (user.locale && user.locale !== config.locale) {
        setTimeout(function () {
          window.location.reload()
        }, 10)
      }
    })
  }

  /**
   * Sanitizes form input data. This function has side effect on parameter data.
   * @param  {Object} data
   */

  postserialize (data) {
    data.firstName = data.firstName.trim().replace(/\s+/g, ' ')
    data.lastName = data.lastName.trim().replace(/\s+/g, ' ')
  }
}
