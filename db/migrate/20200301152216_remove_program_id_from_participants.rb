class RemoveProgramIdFromParticipants < ActiveRecord::Migration[5.2]
  def change
    remove_column :participants, :program_id
  end
end
