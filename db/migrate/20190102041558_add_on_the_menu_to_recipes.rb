class AddOnTheMenuToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :on_the_menu, :boolean, default: false
  end
end
