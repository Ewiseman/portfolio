class ScrumReportsController < ApplicationController
require 'csv'
  def show

    time_ago = 3.years.ago
   # health = Sprint.joins(:tasks).where(tasks: { category: "health" }).group_by_month(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   health = Sprint.joins(:tasks).where(tasks: { category: "health" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   vacation = Sprint.joins(:tasks).where(tasks: { category: "vacation" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   personal = Sprint.joins(:tasks).where(tasks: { category: "personal" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   gear_lift = Sprint.joins(:tasks).where(tasks: { category: "gear lift" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   snowmass = Sprint.joins(:tasks).where(tasks: { category: "snowmass" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   fcfs = Sprint.joins(:tasks).where(tasks: { category: "fcfs" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   one_dataset = Sprint.joins(:tasks).where(tasks: { category: "one dataset" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   board = Sprint.joins(:tasks).where(tasks: { category: "board" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   career_development = Sprint.joins(:tasks).where(tasks: { category: "career development" }).group_by_year(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)

    csv = "key,value,date\n"

    health.each do |row|
      csv << "health,#{row[1]},#{row[0]}\n"
    end

    vacation.each do |row|
      csv << "vacation,#{row[1]},#{row[0]}\n"
    end

    personal.each do |row|
      csv << "personal,#{row[1]},#{row[0]}\n"
    end

    gear_lift.each do |row|
      csv << "gear_lift,#{row[1]},#{row[0]}\n"
    end

    snowmass.each do |row|
      csv << "snowmass,#{row[1]},#{row[0]}\n"
    end

    fcfs.each do |row|
      csv << "fcfs,#{row[1]},#{row[0]}\n"
    end

    one_dataset.each do |row|
      csv << "one_dataset,#{row[1]},#{row[0]}\n"
    end

    board.each do |row|
      csv << "board,#{row[1]},#{row[0]}\n"
    end

    career_development.each do |row|
      csv << "career_development,#{row[1]},#{row[0]}\n"
    end

    respond_to do |format|
      format.csv  { render plain: csv }
    end
  end

end
