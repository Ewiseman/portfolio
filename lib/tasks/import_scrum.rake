require 'csv'
desc "Import scrum from master CSV"
task :import_scrum => :environment do

  csv = 'scrum.csv'

  CSV.foreach(csv, headers: true) do |row|
    p " '#{row['category']}'"

    Scrum.create!(category: row['category'], task: row['task'], value: row['value'], date: row['date'], day: row['day'])
  end

end
