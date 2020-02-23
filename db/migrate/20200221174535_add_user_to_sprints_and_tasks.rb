class AddUserToSprintsAndTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :sprints, :user_id, :integer
    add_index :sprints, :user_id
  end
end
