import React, { Component } from 'react'
import { Link } from 'react-router'
import bus from 'bus'
import config from 'lib/config'
import userConnector from 'lib/site/connectors/user'
import UserBadge from 'ext/lib/site/header/user-badge/component'
import MobileMenu from 'ext/lib/site/header/mobile-menu/component'
import AnonUser from 'ext/lib/site/header/anon-user/component'
import forumStore from 'lib/stores/forum-store/forum-store'
import escuelaStore from 'lib/stores/escuela-store'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userForm: null,
      mobileMenu: false,
      userMenu: false,
      userPrivileges: null,
      escuelas: []
    }

    props.user.onChange(this.onUserStateChange)
  }

  componentWillMount () {
    bus.on('user-form:load', this.onLoadUserForm)
    escuelaStore.findAll().then(escuelas => this.setState({escuelas}))
  }

  componentWillUnmount () {
    bus.off('user-form:load', this.onLoadUserForm)
  }

  onLoadUserForm = (formName) => {
    this.setState({
      userForm: formName
    })
  }

  toggleMobileMenu = () => {
    if (this.state.userMenu) {
      this.setState({
        mobileMenu: !this.state.mobileMenu,
        userMenu: false
      })
    } else {
      this.setState({
        mobileMenu: !this.state.mobileMenu
      })
    }
  }

  toggleUserMenu = (ev, evFromDocument) => {
    if (this.state.mobileMenu) {
      this.setState({
        mobileMenu: false,
        userMenu: !this.state.userMenu
      })
    } else {
      this.setState({ userMenu: !this.state.userMenu })
    }

    // fix bug que el menú queda abierto siempre; con esto al clickear afuera se cierra
    if (!evFromDocument && !this.state.userMenu){
      let fun = this.toggleUserMenu
      let listener = () => {
        fun(null, true)
        document.removeEventListener('click', listener)
      }
      document.addEventListener('click', listener)
    }
  }

  onUserStateChange = () => {
    if (this.props.user.state.fulfilled){
      forumStore.findOneByName(config.forumProyectos).then(
        forum => this.setState({ userPrivileges: forum.privileges })
      )
    }
  }

  render () {
    const styles = {
      color: config.headerFontColor,
      backgroundColor: config.headerBackgroundColor
    }
    const showAdmin = this.state.userPrivileges && this.state.userPrivileges.canChangeTopics
    // MEDIA QUERY - Si es menor al breakpoint muestra un menú, si es mayor, otro
    if (window.matchMedia('(max-width: 975px)').matches) {
      return (
        <nav className='navbar navbar-fixed-top navbar-vilo' style={styles}>

          <Link
            to={config.homeLink}
            className='navbar-brand'>
            <img
              src={config.logo}
              className='d-inline-block align-top'
              height='30' />
          </Link>

          <ul
            className='nav navbar-nav nav-mobile'>

            {/*this.props.user.state.fulfilled && (
              <li className='nav-item'>
                <Link
                  to='/notifications'
                  className='nav-link'>
                  <span className='icon-bell' />
                </Link>
              </li>
            )*/}

            {this.props.user.state.fulfilled && (
              <UserBadge
                menuOn={this.state.userMenu}
                toggleOnClick={this.toggleUserMenu} />
            )}

            <MobileMenu
              form={this.state.userForm}
              menuOn={this.state.mobileMenu}
              toggleOnClick={this.toggleMobileMenu}
              escuelas={this.state.escuelas} />

          </ul>
        </nav>
      )
    } else {
      return (
        <nav className='navbar navbar-fixed-top navbar-vilo' style={styles} role="Group" aria-label='Menu de la pagina. Use Tab para navegar y tecla enter para presionar '>
          <Link
            to={config.homeLink}
            className='navbar-brand'>
            <img
              src={config.logo}
              className='d-inline-block align-top'
              role= "img"
              tabIndex= "1"
              aria-label="Logo ppunr escuelas"
            />
          </Link>

          <ul className='nav navbar-nav'>

            <div className={`header-item ${window.location.pathname.includes('/acerca-de') ? 'active' : ''}`}>
              <Link 
                to='/s/acerca-de'
                className='header-link'
                role= "Group"
                tabIndex= "2"
                aria-label='link acerca de'
                >
                  Acerca de
              </Link>
            </div>
            {this.state.escuelas.length > 0 && this.state.escuelas.map((escuela,index) => (
              <div
                key={escuela._id}
                className={`header-item ${window.location.href.includes(`propuestas?id=${escuela._id}`) ? 'active' : ''}`}>
                <a
                  href={`/propuestas?id=${escuela._id}`}
                  className={`header-link header-link-${escuela.abreviacion}`}
                  role="Group"
                  aria-label={`${escuela.nombre} Decide`}
                  tabIndex={index + 3}
                  >
                    {/* {escuela.abreviacion == 'ESUPCOM' ? 'Superior' : escuela.nombre} Decide  */}
                  {escuela.nombre} ({escuela.abreviacion}) decide
                  {/* Foro {escuela.nombre} ({escuela.abreviacion}) */}
                </a>
              </div>
            ))}
            <div className={`header-item ${window.location.pathname.includes('/foro-presencial') ? 'active' : ''}`}>
              <Link
                to='/s/foro-presencial'
                className='header-link'
                tabIndex="6"
                >
                  Votación presencial
              </Link>
            </div>
            { showAdmin &&
              <div className={`header-item ${window.location.pathname.includes('/admin') ? 'active' : ''}`}>
                <Link
                  to='/proyectos/admin/topics'
                  className='header-link'
                  role= "Group"
                  aria-label= 'ingresar como administrador/administradora'
                  tabIndex="7"
                  >
                    Admin
                </Link>
              </div>
            }
            {/*<div className={`header-item">
              <Link
                to='/s/herramientas'
                className='header-link'
                activeStyle={{ color: '#8C1E81' }}>
                  Herramientas
              </Link>
            </div>*/}

            {/*this.props.user.state.fulfilled && (
              <li className='nav-item'>
                <Link
                  to='/notifications'
                  className='nav-link hidden-xs-down'>
                  <span className='icon-bell' />
                </Link>
              </li>
            )*/}

            {this.props.user.state.fulfilled && (
              <UserBadge
                menuOn={this.state.userMenu}
                toggleOnClick={this.toggleUserMenu} />
            )}

            {this.props.user.state.rejected && (
              <AnonUser form={this.state.userForm} />
            )}
          </ul>
        </nav>
      )
    }
  }
}

export default userConnector(Header)
