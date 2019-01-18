class RecipesController < ApplicationController

  def index
    @recipes = Recipe.where(recipes: { on_the_menu: true })
    render layout: 'no_navbar'
  end

end
