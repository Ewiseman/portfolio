class AddParticipantIdToPrograms < ActiveRecord::Migration[5.2]
  def change
    add_column :programs, :participant_id, :integer
  end
end
