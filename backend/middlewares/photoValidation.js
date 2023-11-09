const { body } = require('express-validator');

const photoInsertValidation = () => {
  return [
    body('title')
      .not()
      .equals('undefined')
      .withMessage('Title is required')
      .isString()
      .withMessage('Title is required')
      .isLength({ min: 3 })
      .withMessage('Title required must be a 3 letter string'),
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image file is required');
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body('title')
      .optional()
      .isString()
      .withMessage('Title is required')
      .isLength({ min: 3 })
      .withMessage('Title required must be a 3 letter string'),
  ];
};

const commentValidation = () => {
  return [body('comment').isString().withMessage('Comment is required')];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
