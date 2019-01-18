class MeasurementsController < ApplicationController

  def show
    @measurement = Measurement.find(params[:id])
    @recipe_ingredients = @measurement.recipe.ingredients
    @measurement_ingredients = @measurement.recipe.measurements
    render layout: 'no_navbar'
  end

end
