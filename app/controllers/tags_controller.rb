def index
  @sprints = Sprint.all
  authorize @sprints
end
