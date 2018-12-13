class CreateScrums < ActiveRecord::Migration[5.2]
  def change
    create_table :scrums do |t|
      t.string :category
      t.string :task
      t.integer :value
      t.date :date
      t.string :day

      t.timestamps
    end
  end
end
