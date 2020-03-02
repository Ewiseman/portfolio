class AddTagsToParticipants < ActiveRecord::Migration[5.2]
  def change
    add_column :participants, :tags, :string
  end
end
