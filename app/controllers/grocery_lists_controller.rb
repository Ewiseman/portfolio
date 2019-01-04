class GroceryListsController < ApplicationController
  require 'csv'
  def show

    # grocery = Recipe.where(recipes: { on_the_menu: true })

    grocery = Measurement.all


    # grocery = query.where(recipes: { on_the_menu: true })

     csv = "ingredient,unit,measurement\n"

     grocery.each do |row|
       if row.recipe.on_the_menu == true
         csv << "#{row.ingredient.name},#{row.unit},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
       end
     end

     respond_to do |format|
       format.csv  { render plain: csv }
     end
   end

end
