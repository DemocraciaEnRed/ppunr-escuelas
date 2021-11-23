import React, { Component } from 'react'
import { Link } from 'react-router'
import bus from 'bus'
import t from 't-component'
import ReCAPTCHA from 'react-google-recaptcha'
import config from 'lib/config'
import FormAsync from 'lib/site/form-async'
import escuelaStore from 'lib/stores/escuela-store'
import claustroStore from 'lib/stores/claustro-store'

export default class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      active: null,
      errors: null,
      name: '',
      lastName: '',
      dni: '',
      claustro: '',
      escuela: '',
      email: '',
      pass: '',
      captchaKey: '',
      used: false,

      claustros: [],
      escuelas: []
    }
    this.onSuccess = this.onSuccess.bind(this)
    this.onFail = this.onFail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.saveName = this.saveName.bind(this)
    this.saveLastName = this.saveLastName.bind(this)
    this.saveClaustro = this.saveClaustro.bind(this)
    this.saveEscuela = this.saveEscuela.bind(this)
    this.saveEmail = this.saveEmail.bind(this)
    this.saveDNI = this.saveDNI.bind(this)
    this.savePass = this.savePass.bind(this)
    this.checkPassLength = this.checkPassLength.bind(this)
    this.onCaptchaChange = this.onCaptchaChange.bind(this)
    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  componentWillMount () {
    bus.emit('user-form:load', 'signup')
    this.setState({ active: 'form' })

    Promise.all([
      escuelaStore.findAll(),
      claustroStore.findAll()
    ]).then(results => {
      const [ escuelas, claustros ] = results
      this.setState({ escuelas, claustros })
    })
  }

  componentWillUnmount () {
    bus.emit('user-form:load', '')
  }

  onSubmit () {
    this.setState({ loading: true, errors: null, used: true })
  }

  onSuccess (res) {
    this.setState({
      loading: false,
      active: 'congrats',
      errors: null,
      captchaKey: ''
    })
  }

  onFail (err) {
    this.setState({ loading: false, errors: err, captchaKey: '' })
  }

  saveName (e) {
    this.setState({ name: e.target.value })
  }

  saveLastName (e) {
    this.setState({ lastName: e.target.value })
  }

  saveDNI (e) {
    this.setState({ dni: e.target.value })
  }

  saveEmail (e) {
    this.setState({ email: e.target.value })
  }

  savePass (e) {
    this.setState({ pass: e.target.value })
  }

  saveClaustro (e) {
    this.setState({ claustro: e.target.value })
  }

  saveEscuela (e) {
    this.setState({ escuela: e.target.value })
  }

  checkPassLength (e) {
    const passLength = e.target.value

    if (passLength.length < 6) {
      e.target.setCustomValidity(t('validators.min-length.plural', { n: 6 }))
    } else {
      if (e.target.name === 're_password' && e.target.value !== this.state.pass) {
        e.target.setCustomValidity(t('common.pass-match-error'))
      } else {
        e.target.setCustomValidity('')
      }
    }
  }

  onCaptchaChange (key) {
    this.setState({ captchaKey: key })
    this.refs.submitBtn.click()
  }

  onSubmitClick (e) {
    if (config.recaptchaSite && !this.state.captchaKey) {
      this.captcha.execute()
      e.preventDefault()
    }
  }

  render () {
    const { claustros, escuelas } = this.state

    return (
      <div className='center-container'>
        {
          this.state.active === 'form' &&
          (
            <div id='signup-form'>
              <div className='title-page'>
                <div className='circle'>
                  <i className='icon-user' />
                </div>
                <h1 tabindex="0">{t('signup.with-email')}</h1>
              </div>
              <FormAsync
                action='/api/signup'
                onSubmit={this.onSubmit}
                onSuccess={this.onSuccess}
                onFail={this.onFail}>
                {config.recaptchaSite && (
                  <ReCAPTCHA
                    ref={(el) => { this.captcha = el }}
                    size='invisible'
                    sitekey={config.recaptchaSite}
                    onChange={this.onCaptchaChange} 
                    tabindex='-1'/>
                )}
                <input
                  type='hidden'
                  name='reference'
                  value={this.props.location.query.ref} />
                <ul
                  className={this.state.errors ? 'form-errors' : 'hide'}>
                  {
                    this.state.errors && this.state.errors
                      .map((error, key) => (<li key={key} dangerouslySetInnerHTML={{ __html: error }}></li>))
                  }
                  <br />
                  <a
                    href='/signup'>
                    Recargar y volver a intentar
                   </a>
                </ul>
                <div className='form-group'>
                  <label htmlFor=''>{t('signup.email')}</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    maxLength='200'
                    onChange={this.saveEmail}
                    placeholder={t('forgot.mail.example')}
                    required />
                </div>
                <div className='form-group'>
                  <label htmlFor=''>Vuelva a escribir su correo electrónico</label>
                  <input
                    type='email'
                    className='form-control'
                    name='re_email'
                    placeholder={t('forgot.mail.example')}
                    required />
                </div>
                <div className='form-group'>
                  <label htmlFor=''>{t('signup.your-firstname')}</label>
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    name='firstName'
                    maxLength='100'
                    placeholder={t('signup.firstname')}
                    onChange={this.saveName}
                    required />
                </div>
                <div className='form-group'>
                  <label htmlFor=''>{t('signup.your-lastname')}</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    name='lastName'
                    maxLength='100'
                    onChange={this.saveLastName}
                    placeholder={t('signup.lastname')}
                    required />
                </div>
                <div className='form-group'>
                  <label htmlFor=''>DNI</label>
                  <input
                    type='text'
                    className='form-control'
                    id='dni'
                    name='dni'
                    maxLength='20'
                    onChange={this.saveDNI}
                    placeholder='Escriba su DNI'
                    required />
                </div>                    
                <div className='form-group'>
                  <label htmlFor=''>Escuela</label>
                  <select
                    className='form-control'
                    id='escuela'
                    name='escuela'
                    onChange={this.saveEscuela}
                    required>
                    <option value=''>Seleccioná una escuela</option>
                    {escuelas.length > 0 && escuelas.map(escuela =>
                      <option key={escuela._id} value={escuela._id}>
                        {escuela.abreviacion}
                      </option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor=''>Claustro</label>
                  <select
                    className='form-control'
                    id='claustro'
                    name='claustro'
                    onChange={this.saveClaustro}
                    required>
                    <option value=''>Seleccioná un claustro</option>
                    {claustros.length > 0 && claustros.map(claustro =>
                      <option key={claustro._id} value={claustro._id}>
                        {claustro.nombre}
                      </option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor=''>{t('password')}</label>
                  <input
                    id='signup-pass'
                    className='form-control'
                    name='password'
                    type='password'
                    maxLength='200'
                    onChange={this.savePass}
                    onBlur={this.checkPassLength}
                    placeholder={t('password')}
                    required />
                </div>
                <div className='form-group'>
                  <label htmlFor=''>{t('signup.retype-password')}</label>
                  <input
                    type='password'
                    className='form-control'
                    name='re_password'
                    onBlur={this.checkPassLength}
                    placeholder= {t('password.repeat')}
                    required />
                </div>
                <div className='form-group'>
                  {!this.state.used &&
                    <button
                      ref='submitBtn'
                      onClick={this.onSubmitClick}
                      className={!this.state.loading ? 'btn btn-block btn-success btn-lg' : 'hide'}
                      type='submit'
                    >
                      {t('signup.now')}
                    </button>
                  }
                  <button
                    className={this.state.loading ? 'loader-btn btn btn-block btn-default btn-lg' : 'hide'}>
                    <div className='loader' />
                    {t('signup.now')}
                  </button>
                </div>
                {
                    (!!config.termsOfService || !!config.privacyPolicy) &&
                    (
                      <div className='form-group accepting'>
                        <p className='help-block text-center'>
                          {t('signup.accepting')}
                        </p>
                        {
                          !!config.termsOfService &&
                          (
                            <Link
                             to='/s/terminos-y-condiciones'>
                              {t('help.tos.title')}
                            </Link>
                          )
                        }
                        {
                          !!config.privacyPolicy &&
                          (
                            <Link
                              to='/s/privacy-policy'>
                              {t('help.pp.title')}
                            </Link>
                          )
                        }
                      </div>
                    )
                  }
              </FormAsync>
              <div className='ingresa-cuenta'>
                <span>Si ya tenés una cuenta </span>
                <Link
                  to={`/signin${window.location.search}`}>
                  ingresá acá
                </Link>
              </div>
            </div>
          )
        }
        {
          this.state.active === 'congrats' &&
          (
            <div id='signup-message'>
              <h1>{t('signup.welcome', { name: this.state.name + ' ' + this.state.lastName })}</h1>
              <p className='lead'>{t('signup.received')}</p>
              <p className='lead'>
                El siguiente paso es abrir el correo electrónico que te hemos enviado (no te olvides de revisar la carpeta
                  <span style={{fontWeight:'bold'}}> Correo no deseado o Spam</span>
                ) y hacer clic en el enlace suministrado.
              </p>
              <Link
                to='/signup/resend-validation-email'>
                {t('signup.resend-validation-email')}
              </Link>
              {/* <p className='lead'>Has completado el registro y podes ya comenzar a participar! Para eso, ¡Inicia sesión!</p>
              <Link
                to='/signin'>
                Iniciar sesión en la plataforma
              </Link> */}
            </div>
          )
        }
      </div>
    )
  }
}
