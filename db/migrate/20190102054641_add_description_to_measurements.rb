class AddDescriptionToMeasurements < ActiveRecord::Migration[5.2]
  def change
    add_column :measurements, :description, :string
  end
end
