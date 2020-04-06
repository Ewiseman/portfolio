class GroceryListsController < ApplicationController
  require 'csv'
  def show

    grocery = Measurement.all.reorder('ingredient_id')

    csv = ""

    ["Produce", "Meat", "Seafood", "Dry Good", "Dairy", "Canned Good", "Cooking Oil", "Spice"]

    csv << "Produce\n"
    grocery.each do |row|
      more = row.recipe.multiplier * row.unit
     if row.recipe.on_the_menu == true && row.ingredient.category == "Produce"
       csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
     end
    end
    csv << "Avocados, 3, Bunch\n"
    csv << "Bananas, 2, Bunch\n"
    csv << "Berries\n"
    csv << "Fruit\n"
    csv << "\n"

    csv << "Meat\n"
    grocery.each do |row|
      more = row.recipe.multiplier * row.unit
      if row.recipe.on_the_menu == true && row.ingredient.category == "Meat"
        csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
      end
    end
    csv << "Lunch Meat?\n"
    csv << "\n"

    csv << "Seafood\n"
    grocery.each do |row|
      more = row.recipe.multiplier * row.unit
      if row.recipe.on_the_menu == true && row.ingredient.category == "Seafood"
        csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
      end
    end
    csv << "Smoked Salmon\n"
    csv << "\n"

    csv << "Dairy\n"
    grocery.each do |row|
      more = row.recipe.multiplier * row.unit
      if row.recipe.on_the_menu == true && row.ingredient.category == "Dairy"
        csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
      end
    end
    csv << "Almond Milk?\n"
    csv << "Yogurt?\n"
    csv << "Eggs?\n"
    csv << "\n"

    csv << "Dry Good\n"
    grocery.each do |row|
      more = row.recipe.multiplier * row.unit
      if row.recipe.on_the_menu == true && row.ingredient.category == "Dry Good"
        csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
      end
    end
    csv << "Seb Snacks?\n"
    csv << "Coffee?\n"
    csv << "Lemon Juice\n"
    csv << "Gluten Free Crackers\n"
    csv << "\n"

    csv << "Canned Good\n"
    grocery.each do |row|
      more = row.recipe.multiplier * row.unit
      if row.recipe.on_the_menu == true && row.ingredient.category == "Canned Good"
        csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
      end
    end
    csv << "\n"

    csv << "Spices\n"
     grocery.each do |row|
       more = row.recipe.multiplier * row.unit
       if row.recipe.on_the_menu == true && row.ingredient.category == "Spice"
         csv << "#{row.ingredient.name},#{more},#{row.type_of_measurement},#{row.recipe.name}, #{row.recipe.on_the_menu}\n"
       end
     end
     csv << "\n"

     respond_to do |format|
       format.csv  { render plain: csv }
     end
    end

end
