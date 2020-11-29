class RecipesController < ApplicationController

  def index
    @types = Recipe::TYPE_OF_FOOD_CONST
    @recipes = Recipe.all
    render layout: 'no_navbar'
  end
end
