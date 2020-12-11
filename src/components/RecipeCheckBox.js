import React from "react";
import useGlobal from "../util/store";
import { Checkbox } from "semantic-ui-react";

const RecipeCheckBox = ({ foodItems }) => {
  const [state, actions] = useGlobal();

  const handleCheckBoxChange = (e, val) => {
    const { label, checked } = val;

    if (checked) {
      actions.setCheckedFood([...state.checkedFood, label]);
    }
  };

  const foodItemCheckBoxes = () => {
    return foodItems.map((foodItem, idx) => {
      return (
        <>
          <Checkbox
            overflow="auto"
            label={foodItem.name}
            onChange={handleCheckBoxChange}
            name="recipeName"
          />
          <br />
        </>
      );
    });
  };

  return <>{foodItemCheckBoxes()}</>;
};

export default RecipeCheckBox;
