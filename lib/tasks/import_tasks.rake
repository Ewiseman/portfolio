require 'csv'
desc "Import tasks from master CSV"
task :import_tasks => :environment do

  csv = 'scrum_data.csv'

  CSV.foreach(csv, headers: true) do |row|
    p " '#{row['category']}'"

    sprint = Sprint.find_by!(sprint_date: row['date'])

    if sprint.present?
      Task.create!(sprint: sprint, category: row['category'], task: row['task'], value: row['value'], day: row['day'])
    end
  end

end
