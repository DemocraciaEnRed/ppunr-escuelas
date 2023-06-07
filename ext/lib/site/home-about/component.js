import React, { Component } from 'react'
// https://github.com/glennflanagan/react-responsive-accordion
import Accordion from 'react-responsive-accordion'

import aboutStore from 'lib/stores/about-store/about-store'
import Footer from 'ext/lib/site/footer/component'
import Jump from 'ext/lib/site/jump-button/component'
import Anchor from 'ext/lib/site/anchor'
import forumStore from 'lib/stores/forum-store/forum-store'

export default class HomeAbout extends Component {
    constructor() {
        super()

        this.state = {
            forum: null,
            faqs: null
        }
    }

    componentDidMount() {
        aboutStore
            .findAll()
            .then((faqs) => this.setState({ faqs }))
            .catch((err) => {
                throw err
            })
        const u = new window.URLSearchParams(window.location.search)
        if (u.get('scroll') === 'cronograma') return Anchor.goTo('cronograma')
        this.goTop()

        // traer forum al state
        forumStore
            .findOneByName('proyectos')
            .then((forum) => this.setState({ forum }))
            .catch((err) => {
                throw err
            })
    }

    goTop() {
        window.scrollTo(0, 0)
    }

    render() {
        const { faqs } = this.state

        return (
            <div>
                <section className="banner-static-2022">
                    <h1>Acerca de</h1>
                </section>
                <div className="post-banner-static-2022 container">
                    <span>Inscribirte para a sumarte como proyectista del Consejo Escolar este 2022.</span>
                </div>
                <p className='h4 text-center'>Podés leer el reglamento completo haciendo click <a href="https://presupuestoparticipativo.unr.edu.ar/reglamento/" rel="noopener noreferer" target="_blank">aquí</a></p>
                <br />
                <br />
                <div className='ext-acerca-de container'>
                    <div className=''>
                        <div className='fila faq text-left'>
                            {faqs &&
                                <Accordion startPosition={-1}>
                                    {faqs.map((faq) => (
                                        <div key={faq.id} data-trigger={`${faq.question}`}>
                                            <p className='p-padding' dangerouslySetInnerHTML={{ __html: faq.answer }} ></p>
                                        </div>
                                    ))}
                                </Accordion>
                            }
                        </div>

                        <div className='fila no-bg hidden'>
                            <Anchor id='mapa'>
                                <div className='map-box'>
                                    <div className='mapa'>
                                        <iframe
                                            src='https://www.google.com/maps/d/u/0/embed?mid=1DEX8V6qaMQy-8NYKNPhsLH_xQnY&z=11&ll=-34.5174, -58.5026'
                                            width='640'
                                            height='480'
                                        ></iframe>
                                    </div>
                                </div>
                            </Anchor>

                        </div>
                    </div>
                </div>
                <Jump goTop={this.goTop} />
                <Footer />
            </div>
        );
    }
}