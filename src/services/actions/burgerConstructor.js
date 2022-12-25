import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SWAP_INGREDIENT,
} from "../../utils/constants.ts";

const addBun = (bun, uniqueID) => ({
  type: ADD_BUN,
  payLoad: { ...bun, uniqueID },
});
const addIngredient = (filling, uniqueID) => ({
  type: ADD_INGREDIENT,
  payLoad: { ...filling, uniqueID },
});
const removeIngredient = (uniqueID) => ({
  type: REMOVE_INGREDIENT,
  payLoad: uniqueID,
});
const swapIngredient = (dragIndex, hoverIndex, ingredient) => ({
  type: SWAP_INGREDIENT,
  payLoad: { dragIndex, hoverIndex, ingredient },
});

export { addBun, addIngredient, removeIngredient, swapIngredient };
