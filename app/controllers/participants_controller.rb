class ParticipantsController < ApplicationController

  def show
    @participant = Participant.find(params[:id])
    # authorize @participant
  end

end
