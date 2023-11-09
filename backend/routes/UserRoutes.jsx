const express = require('express');
const router = express.Router();

// Controller
const {
  register,

  getCurrentUser,
  login,
  update,
  getUserById,
} = require('../controllers/userController.jsx');

// Middlewares
const validate = require('../middlewares/handleValidation.jsx');
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require('../middlewares/userValidations.jsx');
const authGuard = require('../middlewares/authGuard.jsx');
const { imageUpload } = require('../middlewares/imageUpload.jsx');

// Routes
router.post('/register', userCreateValidation(), validate, register);
router.get('/profile', authGuard, getCurrentUser);
router.post('/login', loginValidation(), validate, login);

router.put(
  '/',
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single('profileImage'),
  update,
);
router.get('/:id', getUserById);

module.exports = router;
