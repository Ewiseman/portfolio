class AddMultiplierToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :multiplier, :integer, default: 1
  end
end
