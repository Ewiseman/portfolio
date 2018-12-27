class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :category
      t.string :task
      t.integer :value
      t.string :day
      t.references :sprint, foreign_key: true

      t.timestamps
    end
  end
end
