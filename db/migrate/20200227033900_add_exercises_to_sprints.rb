class AddExercisesToSprints < ActiveRecord::Migration[5.2]
  def change
    add_column :sprints, :exercies, :string
  end
end
