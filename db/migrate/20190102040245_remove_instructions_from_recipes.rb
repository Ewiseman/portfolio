class RemoveInstructionsFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :instructions
    add_column :recipes, :directions, :text
  end
end
