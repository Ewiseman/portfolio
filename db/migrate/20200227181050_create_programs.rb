class CreatePrograms < ActiveRecord::Migration[5.2]
  def change
    create_table :programs do |t|
      t.string :name
      t.string :new_tag

      t.timestamps
    end
  end
end
