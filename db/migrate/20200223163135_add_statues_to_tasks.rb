class AddStatuesToTasks < ActiveRecord::Migration[5.2]
  def change
    execute <<-SQL
      UPDATE tasks SET status = 'complete'
    SQL
  end
end
