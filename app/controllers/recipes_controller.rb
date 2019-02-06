class RecipesController < ApplicationController

  def index
    @types = Recipe::TYPE_OF_FOOD_CONST
    @recipes = Recipe.where(recipes: { on_the_menu: true })
    render layout: 'no_navbar'
  end
end
