class CreateMeasurements < ActiveRecord::Migration[5.2]
  def change
    create_table :measurements do |t|
      t.float :unit
      t.string :type_of_measurement
      t.string :description
      t.belongs_to :recipe, index: true
      t.belongs_to :ingredient, index: true

      t.timestamps
    end
  end
end
