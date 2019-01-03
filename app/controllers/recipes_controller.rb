class RecipesController < ApplicationController

  def index
    @recipes = Recipe.where(recipes: { on_the_menu: true })
  end

end
