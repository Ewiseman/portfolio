class ReorderTasks < ActiveRecord::Migration[5.2]
  def change
    Task.order(:updated_at).each.with_index(1) do |task, index|
      task.update_column :position, index
    end
  end
end
