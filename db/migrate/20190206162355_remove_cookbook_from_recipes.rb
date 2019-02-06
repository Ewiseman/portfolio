class RemoveCookbookFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :cookbook
  end
end
