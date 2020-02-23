class AddUserIdToTasks < ActiveRecord::Migration[5.2]
  def change

    execute <<-SQL
      UPDATE tasks SET user_id = 1
    SQL

  end
end
