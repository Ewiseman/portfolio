class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :health_category
      t.string :cookbook
      t.integer :cookbook_page
      t.string :instructions
      t.string :cusine_region
      t.string :type_of_food

      t.timestamps
    end
  end
end
