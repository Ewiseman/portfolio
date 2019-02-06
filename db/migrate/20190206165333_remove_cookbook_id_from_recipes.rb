class RemoveCookbookIdFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :cookbook_id
  end
end
