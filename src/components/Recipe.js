import React from 'react';
import { Item } from 'semantic-ui-react';
import recipe_default_image from '../images/recipe_default_image.png';

const Recipe = ({recipe}) => {
  if (recipe) {
    return (
      <Item>
      <Item.Image wrapped size='small' src={recipe.image} />
      <Item.Content verticalAlign='middle'>{recipe.title}</Item.Content>
    </Item>
    )
  } else {
    return (
      <Item>
        <Item.Image wrapped size='small' src={recipe_default_image} />
        <Item.Content verticalAlign='middle'>Recipe</Item.Content>
      </Item>
    );
  }
}

export default Recipe;