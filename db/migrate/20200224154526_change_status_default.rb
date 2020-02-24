class ChangeStatusDefault < ActiveRecord::Migration[5.2]
  def change
    def up
      change_column :tasks, :status, :string, default: "to_do"
    end

    def down
      change_column :tasks, :status, :string, default: nil
    end
  end
end
