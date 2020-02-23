class TasksController < ApplicationController

  def create
    @sprint = Sprint.find(params[:sprint_id])
    @task = @sprint.tasks.new(task_params)
    @task.user = current_user
    @new_task = Task.new
    @task.save
  end

  def destroy
    @sprint = Sprint.find(params[:sprint_id])
    @task = @sprint.tasks.find(params[:id])

    if !@task.destroy
      flash[:error] = "Task couldn't be deleted. Try again."
    end

    respond_to do |format|
      format.html
      format.js
    end
  end


private

  def task_params
    params.require(:task).permit(
    :category,
    :task,
    :value,
    :day)
  end

end
