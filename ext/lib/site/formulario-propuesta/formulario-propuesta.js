import 'lib/boot/routes'
import router from 'lib/site/boot/router'
import CrearPropuesta from './component'
import AlbumPropuesta from './componentAlbum'

router.childRoutes.unshift({
  path: 'formulario-idea',
  component: CrearPropuesta
})

router.childRoutes.unshift({
  path: 'formulario-idea/:id',
  component: CrearPropuesta
})
router.childRoutes.unshift({
  path: 'formulario-idea/:id/album',
  component: AlbumPropuesta
})
