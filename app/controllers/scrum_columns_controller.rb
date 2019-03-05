class ScrumColumnsController < ApplicationController
require 'csv'
  def show

   time_ago = Sprint.all.last.sprint_date + 1.month
   time_here = Sprint.all.first.sprint_date
   # health = Sprint.joins(:tasks).where(tasks: { category: "health" }).group_by_month(:sprint_date, range: (time_ago)..Time.now).unscope(:order).sum(:value)
   health = Sprint.joins(:tasks).where(tasks: { category: "health" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   vacation = Sprint.joins(:tasks).where(tasks: { category: "vacation" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   personal = Sprint.joins(:tasks).where(tasks: { category: "personal" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   gear_lift = Sprint.joins(:tasks).where(tasks: { category: "gear lift" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   snowmass = Sprint.joins(:tasks).where(tasks: { category: "snowmass" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   fcfs = Sprint.joins(:tasks).where(tasks: { category: "fcfs" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   one_dataset = Sprint.joins(:tasks).where(tasks: { category: "one dataset" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   board = Sprint.joins(:tasks).where(tasks: { category: "board" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)
   career_development = Sprint.joins(:tasks).where(tasks: { category: "career development" }).group_by_month(:sprint_date, range: (time_ago)..time_here).unscope(:order).sum(:value)

    csv = "health,vacation,personal,gear_lift,snowmass,fcfs,one_dataset,board,career_development\n"

    health.each do |row|
      csv << "#{row[1]}\n"
    end

    vacation.each do |row|
      csv << "0,#{row[1]}\n"
    end

    personal.each do |row|
      csv << "0,0,#{row[1]}\n"
    end

    gear_lift.each do |row|
      csv << "0,0,0,#{row[1]}\n"
    end

    snowmass.each do |row|
      csv << "0,0,0,0,#{row[1]}\n"
    end

    fcfs.each do |row|
      csv << "0,0,0,0,0,#{row[1]}\n"
    end

    one_dataset.each do |row|
      csv << "0,0,0,0,0,0,#{row[1]}\n"
    end

    board.each do |row|
      csv << "0,0,0,0,0,0,0,#{row[1]}\n"
    end

    career_development.each do |row|
      csv << "0,0,0,0,0,0,0,0,#{row[1]}\n"
    end

    respond_to do |format|
      format.csv  { render plain: csv }
    end
  end

end
