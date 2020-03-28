class ParticipantsController < ApplicationController

  def index
    # @duplicates = (Participant.group(:first_name,:last_name)







    # @duplicates = @duplicates.having("count(*) > 1").size


    # @duplicates = Participant.all.select([:first_name,:last_name]).group(:first_name,:last_name).having("count(*) > 1").size
  #@duplicates = Participant.group("concat_ws(' ', first_name, last_name)").having('count(*) > 1').pluck("concat_ws(' ', first_name, last_name)", "array_agg(email)")

    @duplicates = Participant.group("concat_ws(' ', first_name, last_name)").having('count(*) > 1').pluck("concat_ws(' ', first_name, last_name)", "array_agg(email)")


    # authorize @participants
  end

  def show
    @participant = Participant.find(params[:id])
    authorize @participant
  end

end
