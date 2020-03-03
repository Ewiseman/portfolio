require 'csv'
desc "Import Sai Maa data CSV"
task :import_sai_maa_data => :environment do

  csv = 'sai-maa-data-2-14.csv'
  #
  # tag = Tag.create(name: 'English')
  # participant = Participant.create(email: 'taco@gmail.com')
  #
  # tag.locations.create(participant: participant)

  CSV.foreach(csv, headers: true) do |row|

    tag = row['Tags']
    tags = tag.split(',') if tag.present?

    if tags.present?
      new_participant =
        Participant.create!(
          email: row['Email'],
          first_name: row['First Name'],
          last_name: row['Last Name'],
          system_language: row ['*Primary Language - Langue principale'],
          street_address_one: row ['*Home Address 1 - Adresse 1'],
          street_address_two: row ['*Home Address 2 - Adresse 2'],
          city: row ['*Home City - Ville'],
          country: row ['*Home Country - Pays '],
          state_province: row ['*Home State ( United States)'],
          postal_code: row ['*Home Zip - Code postale'],
          profession: row ['Profession'],
          preferred_name: row ['preferred_name'],
          primary_language: "",
          email_preference_language: row ['email_preference_language'],
          other_fluent_languages: row ['other_fluent_languages'],
          gender: row ['*Gender - Genre'],
          marital_status: row ['Marital Status'],
          children: row ['Children'],
          birthday: row ['*Date of Birth'],
          cell_phone: row ['Phone Number'],
          emergency_contact_name: row ['Emergency Contact Name'],
          emergency_primary_phone_number: row ['Emergency Primary Phone Number'],
          emergency_secondary_phone_number: row ['Emergency Secondary Phone Number'],
          emergency_time_zone: row ['Emergency Time Zone'],
          emergency_country: row ['Emergency Country'],
          active_campaign_tag: row ['Tags']
          )
      tags.each do |tag|
        new_tag = Tag.find_or_create_by!(name: tag)
        p tag

        new_tag.locations.create!(participant: new_participant)
      end
    end





  end

end
