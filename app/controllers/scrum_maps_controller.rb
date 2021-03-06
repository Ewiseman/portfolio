class ScrumMapsController < ApplicationController
require 'csv'
  def show

   # time_ago = Date.parse("2015-12-1")
   # time_here = Date.parse("2020-7-1")

   time_ago = Sprint.all.last.sprint_date + 1.month
   time_here = Sprint.all.first.sprint_date


   health = Sprint.joins(:tasks).where(tasks: { category: "health" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   vacation = Sprint.joins(:tasks).where(tasks: { category: "vacation" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   personal = Sprint.joins(:tasks).where(tasks: { category: "personal" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   snowmass = Sprint.joins(:tasks).where(tasks: { category: "snowmass" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   fcfs = Sprint.joins(:tasks).where(tasks: { category: "fcfs" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   one_dataset = Sprint.joins(:tasks).where(tasks: { category: "one dataset" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   board = Sprint.joins(:tasks).where(tasks: { category: "board" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   career_development = Sprint.joins(:tasks).where(tasks: { category: "career development" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   gear_lift = Sprint.joins(:tasks).where(tasks: { category: "gear lift" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   programming = Sprint.joins(:tasks).where(tasks: { category: "programming" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   sales = Sprint.joins(:tasks).where(tasks: { category: "sales" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   admin = Sprint.joins(:tasks).where(tasks: { category: "admin" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)
   home_school = Sprint.joins(:tasks).where(tasks: { category: "home_school" }).group_by_month(:sprint_date, range: (time_ago)..(time_here)).unscope(:order).sum(:value)

    csv = "key,value,date,date_real\n"
    vacation_list = ""
    personal_list = ""
    snowmass_list = ""
    fcfs_list = ""
    gear_lift_list = ""
    one_dataset_list = ""
    board_list = ""
    career_development_list = ""
    programming_list = ""
    sales_list = ""
    admin_list = ""
    home_school_list = ""


    health.each do |row|
      csv << "health,#{row[1]},#{csv.each_line.count},#{row[0]}\n"
    end

    vacation.each do |row|
      vacation_list << "vaction,#{row[1]},#{vacation_list.each_line.count+1},#{row[0]}\n"
    end

    personal.each do |row|
      personal_list << "personal,#{row[1]},#{personal_list.each_line.count+1},#{row[0]}\n"
    end

    snowmass.each do |row|
      snowmass_list << "snowmass,#{row[1]},#{snowmass_list.each_line.count+1},#{row[0]}\n"
    end

    fcfs.each do |row|
      fcfs_list << "fcfs,#{row[1]},#{fcfs_list.each_line.count+1},#{row[0]}\n"
    end

    gear_lift.each do |row|
      gear_lift_list << "gear_lift,#{row[1]},#{gear_lift_list.each_line.count+1},#{row[0]}\n"
    end

    one_dataset.each do |row|
      one_dataset_list << "one_dataset,#{row[1]},#{one_dataset_list.each_line.count+1},#{row[0]}\n"
    end

    board.each do |row|
      board_list << "board,#{row[1]},#{board_list.each_line.count+1},#{row[0]}\n"
    end

    career_development.each do |row|
      career_development_list << "career_development,#{row[1]},#{career_development_list.each_line.count+1},#{row[0]}\n"
    end

    programming.each do |row|
      programming_list << "programming,#{row[1]},#{programming_list.each_line.count+1},#{row[0]}\n"
    end

    sales.each do |row|
      sales_list << "sales,#{row[1]},#{sales_list.each_line.count+1},#{row[0]}\n"
    end

    admin.each do |row|
      admin_list << "admin,#{row[1]},#{admin_list.each_line.count+1},#{row[0]}\n"
    end

    home_school.each do |row|
      home_school_list << "home_school,#{row[1]},#{home_school_list.each_line.count+1},#{row[0]}\n"
    end







    csv << vacation_list << personal_list << gear_lift_list << snowmass_list << fcfs_list << one_dataset_list << board_list << career_development_list << programming_list << sales_list << admin_list << home_school_list

    respond_to do |format|
      format.csv  { render plain: csv }
    end
  end

end
