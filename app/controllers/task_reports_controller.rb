class TaskReportsController < ApplicationController
require 'csv'
  def show

   time_ago = Sprint.all.last.sprint_date + 1.month
   time_here = Sprint.all.first.sprint_date

   health = Sprint.joins(:tasks).where(tasks: { category: "health" })
   vacation = Sprint.joins(:tasks).where(tasks: { category: "vacation" })
   personal = Sprint.joins(:tasks).where(tasks: { category: "personal" })
   gear_lift = Sprint.joins(:tasks).where(tasks: { category: "gear lift" })
   snowmass = Sprint.joins(:tasks).where(tasks: { category: "snowmass" })
   fcfs = Sprint.joins(:tasks).where(tasks: { category: "fcfs" })
   one_dataset = Sprint.joins(:tasks).where(tasks: { category: "one dataset" })
   board = Sprint.joins(:tasks).where(tasks: { category: "board" })
   career_development = Sprint.joins(:tasks).where(tasks: { category: "career development" })

    csv = "key,date\n"

    health.each do |row|
      csv << "health,#{row.sprint_date}\n"
    end

    vacation.each do |row|
      csv << "vacation,#{row.sprint_date}\n"
    end

    personal.each do |row|
      csv << "personal,#{row.sprint_date}\n"
    end

    gear_lift.each do |row|
      csv << "gear_lift,#{row.sprint_date}\n"
    end

    snowmass.each do |row|
      csv << "snowmass,#{row.sprint_date}\n"
    end

    fcfs.each do |row|
      csv << "fcfs,#{row.sprint_date}\n"
    end

    one_dataset.each do |row|
      csv << "one_dataset,#{row.sprint_date}\n"
    end

    board.each do |row|
      csv << "board,#{row.sprint_date}\n"
    end

    career_development.each do |row|
      csv << "career_development,#{row.sprint_date}\n"
    end

    respond_to do |format|
      format.csv  { render plain: csv }
    end
  end

end
