class AddConfidenceAndRankToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :confidence_score, :integer
    add_column :tasks, :ranks, :integer
  end
end
