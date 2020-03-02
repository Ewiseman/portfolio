class CreateJoinTableTagsParticipants < ActiveRecord::Migration[5.2]
  def change
    create_join_table :tags, :participants do |t|
      # t.index [:tag_id, :participant_id]
      # t.index [:participant_id, :tag_id]
    end
  end
end
