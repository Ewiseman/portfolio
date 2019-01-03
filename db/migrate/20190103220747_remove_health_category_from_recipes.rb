class RemoveHealthCategoryFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :health_category
  end
end
