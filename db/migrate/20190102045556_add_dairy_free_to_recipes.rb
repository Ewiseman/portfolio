class AddDairyFreeToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :dairy_free, :boolean, default: false
  end
end
