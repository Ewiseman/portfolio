class RenameTagInParticipants < ActiveRecord::Migration[5.2]
  def change
    rename_column :participants, :tags, :active_campaign_tag
  end
end
