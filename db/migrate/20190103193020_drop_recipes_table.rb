class DropRecipesTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :measurements
    drop_table :ingredients
    drop_table :recipes
  end
end
