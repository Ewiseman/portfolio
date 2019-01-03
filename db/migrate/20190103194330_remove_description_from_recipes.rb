class RemoveDescriptionFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :directions
    add_column :recipes, :directions, :text
  end
end
