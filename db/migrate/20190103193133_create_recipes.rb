class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :protein, :string
      t.string :health_category
      t.string :cookbook
      t.integer :cookbook_page
      t.string :directions
      t.string :cusine_region
      t.string :type_of_food
      t.boolean :on_the_menu, default: false
      t.boolean :vegetarian, default: false
      t.boolean :vegan, default: false
      t.boolean :dairy_free, default: false

      t.timestamps
    end
  end
end
