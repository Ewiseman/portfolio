class RemoveStringFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :string
  end
end
