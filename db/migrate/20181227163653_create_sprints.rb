class CreateSprints < ActiveRecord::Migration[5.2]
  def change
    create_table :sprints do |t|
      t.date :sprint_date

      t.timestamps
    end
  end
end
