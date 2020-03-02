class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.references :tag, foreign_key: true
      t.references :participant, foreign_key: true

      t.timestamps
    end
  end
end
