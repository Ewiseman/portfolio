class ParticipantsController < ApplicationController

  def index
    # @duplicates = (Participant.group(:first_name,:last_name)







    # @duplicates = @duplicates.having("count(*) > 1").size


    @duplicates = Participant.all.select([:first_name,:last_name, :email]).group(:first_name,:last_name).having("count(*) > 1").size


    # authorize @participants
  end

  def show
    @participant = Participant.find(params[:id])
    authorize @participant
  end

end
