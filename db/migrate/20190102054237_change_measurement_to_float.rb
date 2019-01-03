class ChangeMeasurementToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :measurements, :unit, :float
  end
end
