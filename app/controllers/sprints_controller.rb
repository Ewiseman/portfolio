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
    @task = Task.new
    authorize @sprint
  end

  def create
    @sprint = Sprint.new(sprint_params)
    @sprint.user = current_user
    authorize @sprint


    if @sprint.save
      CSV.foreach('recurring.csv', headers: true) do |row|
        task = row['task']

         category = row['yellow']

        value = row['value']
        day = row['day']
        Task.create!(
          sprint_id: @sprint.id,
          user_id: current_user.id,
          task: task,
          category: category,
          value: value,
          status: "to_do",
          day: day
        )
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
      :sprint_date)
    end

end
