require 'csv'
class SprintsController < ApplicationController
  def index
    @sprints = Sprint.all
    authorize @sprints
  end

  def new
    @sprint = Sprint.new
    authorize @sprint
  end

  def show
    @sprint = Sprint.find(params[:id])
    @tasks = @sprint.tasks

    @tasks_monday = @sprint.tasks.where(day: "monday")
    @tasks_tuesday = @sprint.tasks.where(day: "tuesday")
    @tasks_wednesday = @sprint.tasks.where(day: "wednesday")
    @tasks_thursday = @sprint.tasks.where(day: "thursday")
    @tasks_friday = @sprint.tasks.where(day: "friday")
    @tasks_sat_sun = @sprint.tasks.where(day: "sat/sun")



    @tasks_today = @sprint.tasks.where(status: "today")
    @tasks_complete = @sprint.tasks.where(status: 'complete')
    @task = Task.new
    authorize @sprint
  end

  def create
    @sprint = Sprint.new(sprint_params)
    @sprint.user = current_user
    authorize @sprint


    if @sprint.save
      if @sprint.exercies == 'endurance'
        CSV.foreach('endurance.csv', headers: true) do |row|
          task = row['task']
          category = row['category']
          value = row['value']
          day = row['day']
          confidence_score = row['confidence_score']
          rank = row['rank']
          Task.create!(
            sprint_id: @sprint.id,
            user_id: current_user.id,
            task: task,
            category: category,
            value: value,
            status: "to_do",
            confidence_score: confidence_score,
            ranks: rank,
            day: day
          )
        end
        elsif @sprint.exercies == 'muscle building'
            CSV.foreach('muscle_building.csv', headers: true) do |row|
            task = row['task']
            category = row['category']
            value = row['value']
            day = row['day']
            confidence_score = row['confidence_score']
            rank = row['rank']
            Task.create!(
              sprint_id: @sprint.id,
              user_id: current_user.id,
              task: task,
              category: category,
              value: value,
              status: "to_do",
              confidence_score: confidence_score,
              ranks: rank,
              day: day
            )
        end
      end
      flash[:notice] = "#{@sprint.sprint_date} has been created."
      redirect_to sprint_path(@sprint)
    else
      render :new
    end
  end

  def edit
    @sprint = Sprint.find(params[:id])
    authorize @sprint
  end

  def update
    @sprint = Sprint.find(params[:id])
    authorize @sprint
    is_updated = @sprint.update_attributes(sprint_params)
      if is_updated
        redirect_to sprint_path(@sprint)
     else
       flash[:error] = "Error saving sprint. Please try again."
       render :edit
     end
  end



  private
  def sprint_params
    params.require(:sprint).permit(
      :sprint_date,
      :exercies)
    end

end
