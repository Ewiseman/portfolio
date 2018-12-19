class ScrumReportsController < ApplicationController
require 'csv'
  def show
    time_ago = 11.months.ago
    health = Scrum.where(scrums: { category: "health" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    vacation = Scrum.where(scrums: { category: "vacation" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    personal = Scrum.where(scrums: { category: "personal" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    gear_lift = Scrum.where(scrums: { category: "gear lift" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    snowmass = Scrum.where(scrums: { category: "snowmass" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    fcfs = Scrum.where(scrums: { category: "fcfs" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    one_dataset = Scrum.where(scrums: { category: "one dataset" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    board = Scrum.where(scrums: { category: "board" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
    career_development = Scrum.where(scrums: { category: "career development" }).group_by_week(:date, range: (time_ago)..Time.now).unscope(:order).sum(:value)

    csv = "key,value,date\n"

    health.each do |row|
      csv << "health,#{row[1]},#{row[0]},\n"
    end
    vacation.each do |row|
      csv << "vacation,#{row[1]},#{row[0]},\n"
    end
    personal.each do |row|
      csv << "personal,#{row[1]},#{row[0]},\n"
    end
    gear_lift.each do |row|
      csv << "gear_lift,#{row[1]},#{row[0]},\n"
    end
    snowmass.each do |row|
      csv << "snowmass,#{row[1]},#{row[0]},\n"
    end
    fcfs.each do |row|
      csv << "fcfs,#{row[1]},#{row[0]},\n"
    end
    one_dataset.each do |row|
      csv << "one_dataset,#{row[1]},#{row[0]},\n"
    end
    board.each do |row|
      csv << "board,#{row[1]},#{row[0]},\n"
    end
    career_development.each do |row|
      csv << "career_development,#{row[1]},#{row[0]},\n"
    end




    respond_to do |format|
      format.csv  { render plain: csv }
    end
  end

end
