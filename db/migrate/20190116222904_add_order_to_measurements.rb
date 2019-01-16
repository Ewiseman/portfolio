class AddOrderToMeasurements < ActiveRecord::Migration[5.2]
  def change
    add_column :measurements, :order, :integer
  end
end
