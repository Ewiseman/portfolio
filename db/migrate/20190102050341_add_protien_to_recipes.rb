class AddProtienToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :protein, :string
  end
end
