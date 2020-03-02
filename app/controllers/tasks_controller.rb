lass TasksController < ApplicationController

  def create
    @sprint = Sprint.find(params[:sprint_id])
    @task = @sprint.tasks.new(task_params)
    @task.user = current_user
    @new_task = Task.new
    authorize @task
    @task.save
  end

  def destroy
    @sprint = Sprint.find(params[:sprint_id])
    @task = @sprint.tasks.find(params[:id])
    authorize @task
    if !@task.destroy
      flash[:error] = "Task couldn't be deleted. Try again."
    end

    respond_to do |format|
      format.html
      format.js
    end
  end

  def edit
    @sprint = Sprint.find(params[:sprint_id])
    @task = @sprint.tasks.find(params[:id])
    authorize @task
  end

  def update
    @sprint = Sprint.find(params[:sprint_id])
    @task = @sprint.tasks.find(params[:id])
    authorize @task

    if @task.update_attributes(task_params)
      flash[:notice] = "Task was updated."
      redirect_to [@sprint]
    else
      flash[:error] = "There was an error saving the post. Please try again."
      render :new
    end
  end


private

  def task_params
    params.require(:task).permit(
    :category,
    :task,
    :value,
    :day,
    :status,
    :confidence_score,
    :ranks)
  end

end
