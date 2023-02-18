const router = require('express').Router()

const PetController = require('../controllers/PetController')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)
router.delete('/:id', verifyToken, PetController.removePetById)
router.post('/create', verifyToken,imageUpload.array('images'), PetController.create)
router.get('/mypets',verifyToken, PetController.getMyAllUserPets)
router.get('/myadoptions',verifyToken, PetController.getMyAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.get('/', PetController.getAll)

router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

module.exports = router
