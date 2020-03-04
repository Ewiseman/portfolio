class ParticipantsController < ApplicationController

  def index
    @duplicates = Participant.select([:first_name,:last_name]).group(:first_name,:last_name).having("count(*) > 1").size
    # authorize @participants
  end

  def show
    @participant = Participant.find(params[:id])
    authorize @participant
  end

end
