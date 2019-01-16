class AddRatingToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :rank, :integer
  end
end
