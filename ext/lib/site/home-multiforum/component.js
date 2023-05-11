import React, { Component } from 'react'
import {Link} from 'react-router'
import config from 'lib/config'
import Anchor from 'ext/lib/site/anchor'
import BannerForoVecinal from 'ext/lib/site/banner-foro-vecinal/component'
import ThumbsVoto from 'ext/lib/site/thumbs-voto/component'
// import Barrios from 'ext/lib/site/barrios/component'
import Jump from 'ext/lib/site/jump-button/component'
import Footer from 'ext/lib/site/footer/component'
// import forumStore from 'lib/stores/forum-store/forum-store'
// import topicStore from 'lib/stores/topic-store/topic-store'
import textStore from 'lib/stores/text-store'
import escuelaStore from 'lib/stores/escuela-store'
import forumStore from 'lib/stores/forum-store/forum-store'

export default class HomeMultiforumOverride extends Component {
  constructor (props) {
    super(props)

    this.state = {
      texts: {},
      forum:{config:{}},
      escuelas: []
    }
  }

  componentWillMount () {
    Promise.all([
      textStore.findAllDict(),
      forumStore.findOneByName('proyectos')
    ])
    .then((results) => {
      const [textsDict, forum] = results

      this.setState({
        texts: textsDict,
        forum
      })
    }).catch((err) => {
      this.state = {
        texts: {},
        forum:null
      }
    })
  }

  componentDidMount () {
    this.goTop()
    escuelaStore.findAll().then(escuelas => this.setState({escuelas}))

  }

  goTop () {
    Anchor.goTo('container')
  }

  render () {
    return (
      <div className='ext-home-multiforum'>
        <Anchor id='container'>
          <BannerForoVecinal title="Presupuesto participativo - Escuelas" texts={this.state.texts} />
          <ThumbsVoto texts={this.state.texts} forumConfig={this.state.forum.config}/>
          {/* <Barrios /> */}
          <Jump goTop={this.goTop} />
          <Footer />
        </Anchor>
      </div>
    )
  }
}
