class SprintsController < ApplicationController
  def index
    @sprints = Sprint.all
  end

  def new
    @sprint = Sprint.new
  end

  def show
    @sprint = Sprint.find(params[:id])
  end

end
