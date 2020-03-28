class ParticipantsController < ApplicationController

  def index
    require 'csv'

    csv = ""

    csv << "Produce\n"

    @duplicates = Participant.group("concat_ws(' ', first_name, last_name)").having('count(*) > 1').pluck("concat_ws(' ', first_name, last_name)", "array_agg(email)")

    @duplicates.each do |row|
       csv << "#{row[1]},#{row[2]}\n"
    end

  end

  def show
    @participant = Participant.find(params[:id])
    authorize @participant
  end

end
