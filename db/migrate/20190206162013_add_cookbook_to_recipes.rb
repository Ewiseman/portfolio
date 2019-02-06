class AddCookbookToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_reference :recipes, :cookbook, foreign_key: true
  end
end
