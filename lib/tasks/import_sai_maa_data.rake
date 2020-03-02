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
          last_name: row['Last Name']
        )
      tags.each do |tag|
        new_tag = Tag.find_or_create_by!(name: tag)
        p tag

        new_tag.locations.create!(participant: new_participant)
      end
    end





  end

end
