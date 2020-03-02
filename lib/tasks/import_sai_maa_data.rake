require 'csv'
desc "Import Sai Maa data CSV"
task :import_sai_maa_data => :environment do

  csv = 'sai-maa-data-2-14.csv'

  CSV.foreach(csv, headers: true) do |row|
    # email = row['Email']
    #
    # tag = row['Tags']
    # program = tag.split(',') if tag.present?
    #
    # if program.present?
    #   program.each do |tag|
    #     Program.find_by!(program: tag)
    #     p tag
    #   end
    # end
    #
    # Participant.create!(
    #   email: row['Email'],
    #   first_name: row['Fist Name'],
    #   last_name: row['Last Name'],
    #     tags: row['Tags']
    # )
    # p "#{row['Email']}"

    #
    # Participant.tags.each do |tag|
    #   if tag.present?
    #       tag.each do |tag|
    #         Program.find_or_create_by!(name: tag)
    #         p tag
    #       end
    #     end
    #
    # end

    email = row['Email']
    participant = Participant.find_by(email: row['Email'])

    tag = row['Tags']
    program = tag.split(',') if tag.present?

    if participant.present?
      if program.present?
        program.each do |tag|
          Participant.find_or_create_by!(email: email)
          Program.find_or_create_by!(participant_id: participant, name: tag)
          p tag
        end
      end
    end

  end

end
