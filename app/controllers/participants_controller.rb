class ParticipantsController < ApplicationController

  def index
    @hello = Participant.select([:first_name,:last_name]).group(:first_name,:last_name).having("count(*) > 1").size
  end

  def show
    @participant = Participant.find(params[:id])
    # authorize @participant
  end

end
