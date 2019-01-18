class MeasurementsController < ApplicationController

  def show
    @recipe = Recipe.find(params[:id])
    @measurement_ingredients = @recipe.measurements
    render layout: 'no_navbar'
  end

end
