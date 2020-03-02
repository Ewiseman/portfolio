require 'csv'
desc "Import Sai Maa data CSV"
task :import_sai_maa_data => :environment do

  programmer = Tag.create(name: 'English')
  client     = Client.create(name: 'Mr. Nic Cage')
  programmer.projects.create(client: client)

  csv = 'sai-maa-data-2-14.csv'

  CSV.foreach(csv, headers: true) do |row|



    participant = Participant.create!(
      email: row['Email'],
      first_name: row['Fist Name'],
      last_name: row['Last Name'],
      tag = (row['Tags'].split(',')).to_a

      hello = tag.each do |tag|
        Tag.find_or_create_by!(name: tag)
        p tag
      end
    )




        binding.pry

      participant.tags << tag

      p "#{row['Email']}"



    if all_tags.present? && participant.present?
      participant.tags << all_tags
    end

  end

end
