require 'csv'
desc "Import sprint dates from CSV"
task :import_dates => :environment do

  csv = 'scrum_dates.csv'

  CSV.foreach(csv, headers: true) do |row|
    p " '#{row['date']}'"

    Sprint.create!(sprint_date: row['date'])
  end

end
