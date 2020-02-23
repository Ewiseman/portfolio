class SprintsController < ApplicationController
  def index
    @sprints = Sprint.all
  end

  def new
    @sprint = Sprint.new
  end

  def show
    @sprint = Sprint.find(params[:id])
    @tasks = @sprint.tasks
    @task = Task.new
  end

  def create
    @sprint = Sprint.new(sprint_params)
    @sprint.user = current_user
    if @sprint.save
      flash[:notice] = "#{@sprint.sprint_date} has been created."
      redirect_to sprint_path(@sprint)
    else
      render :new
    end
  end

  def edit
    @sprint = Sprint.find(params[:id])
  end

  def update
    @sprint = Sprint.find(params[:id])
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
