/* global fetch */
import t from 't-component'
import 'whatwg-fetch'
import escuelaStore from '../../stores/escuela-store'
import template from './template.jade'
import confirm from 'lib/modals/confirm'
import FormView from '../../form-view/form-view'

function createElementFromHTML (htmlString) {
  let div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild
}


const keysToEdit=[
 'tituloPagina',
 'tituloForo',
 'nombre-pestaña',
]

export default class AdminEscuelas extends FormView {
  constructor (forum) {
    var options = {
      form: { action: `` }
    }
    super(template, options)
    this.options = options
    escuelaStore.findAll().then(this.loadSettings.bind(this))
  }

  loadSettings (escuelas) {
    const panelTemplate = this.find('.template')
    const formGroup = this.find('.templateGroup')
    const panels = this.find('.panels')
    
    escuelas.forEach(escuela =>{
      let panel = createElementFromHTML(panelTemplate.html())
      panel.querySelectorAll('.titleshow')[0].innerHTML = escuela.nombre
      
      keysToEdit.forEach(key=>{
        const groupForm = createElementFromHTML(formGroup.parent().html())
        const label = groupForm.querySelectorAll('label')[0]
        const inputField = groupForm.querySelectorAll('input')[0]
        inputField.name = key
        inputField.value = escuela[key]
        label.innerHTML = key
        groupForm.classList.remove('templateGroup')
        groupForm.append(label)
        groupForm.append(inputField)

        panel.querySelectorAll('.contentHiden')[0].append(groupForm)
      })

      panel.querySelectorAll('.templateGroup')[0].remove()

      panelTemplate.remove()
      
      panel.classList.remove('hidden')
      
      panels.append(panel)

    })

    
  }

  showHiden() {
    this.find('.titleShow').on('click', function () {
      document
        .querySelectorAll('.showHiden')
        .forEach(
          (el) =>{
            if(el !== this.nextSibling){
              if(!el.classList.contains('hiden')) {
                el.classList.add('hiden')
                el.parentNode.children[0].children[0].classList.remove('activeAngle')
                el.parentNode.children[0].classList.remove('active')
                el.parentNode.classList.remove('active')
              }
            }

          }
        );
     
      this.nextSibling.classList.toggle('hiden');
      this.children[0].classList.toggle('activeAngle');
      this.classList.toggle('active')
      this.parentElement.classList.toggle('active')
    });
  }

  switchOn () {
    //this.showHiden()
    this.on('success', this.onsuccess.bind(this))
    this.on('error', this.onerror.bind(this))
  }

 
  switchOff () {
    this.off()
  }

  onsuccess () {
    this.messages(['Los cambios se han guardado exitósamente'], 'success')
    //forumStore.findOneByName('proyectos').then(this.loadSettings.bind(this))//.then(this.onShow())
    window.scrollTo(0, 0)
  }

  onerror () {
    this.messages([t('common.internal-error')])
  }

}
