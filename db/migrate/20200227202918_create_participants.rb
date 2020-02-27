class CreateParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :system_language
      t.string :street_address_one
      t.string :street_address_two
      t.string :city
      t.string :country
      t.string :state_province
      t.string :postal_code
      t.string :profession
      t.string :preferred_name
      t.string :primary_language
      t.string :email_preference_language
      t.string :other_fluent_languages
      t.string :gender
      t.string :marital_status
      t.string :children
      t.date :birthday
      t.string :cell_phone
      t.string :emergency_contact_name
      t.string :emergency_primary_phone_number
      t.string :emergency_secondary_phone_number
      t.string :emergency_time_zone
      t.string :emergency_country
      t.belongs_to :program, index: true
    end
  end
end
