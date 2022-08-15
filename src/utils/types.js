import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  prot: PropTypes.number,
  fat: PropTypes.number,
  carb: PropTypes.number,
});

export { ingredientType };
