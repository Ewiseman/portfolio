class AddFieldsToParticipants < ActiveRecord::Migration[5.2]
  def change
    add_column :participants, :system_language, :string
    add_column :participants, :street_address_one, :string
    add_column :participants, :street_address_two, :string
    add_column :participants, :city, :string
    add_column :participants, :country, :string
    add_column :participants, :state_province, :string
    add_column :participants, :postal_code, :string
    add_column :participants, :profession, :string
    add_column :participants, :preferred_name, :string
    add_column :participants, :primary_language, :string
    add_column :participants, :email_preference_language, :string
    add_column :participants, :other_fluent_languages, :string
    add_column :participants, :gender, :string
    add_column :participants, :marital_status, :string
    add_column :participants, :children, :string
    add_column :participants, :birthday, :date
    add_column :participants, :cell_phone, :string
    add_column :participants, :emergency_contact_name, :string
    add_column :participants, :emergency_primary_phone_number, :string
    add_column :participants, :emergency_secondary_phone_number, :string
    add_column :participants, :emergency_time_zone, :string
    add_column :participants, :emergency_country, :string
    add_column :participants, :tags, :string
  end
end
