class RenameOrderInMeasurements < ActiveRecord::Migration[5.2]
  def change
    rename_column :measurements, :order, :ingredient_order
  end
end
