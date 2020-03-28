class DuplicatesController < ApplicationController
  require 'csv'
  def show

    @duplicates = Participant.group("concat_ws(' ', first_name, last_name)").having('count(*) > 1').pluck("concat_ws(' ', first_name, last_name)", "array_agg(email)")
    csv = ""

    csv << "First Name, Last Names, Email Addresses\n"

    @duplicates.each do |row|
      first_name = row[0].split(' ')[0]
      last_name = row[0].split(' ')[1]
      csv << "#{first_name},#{last_name},#{row[1].join(', ')}\n"
    end
    csv << "\n"

     respond_to do |format|
       format.csv  { render plain: csv }
     end
    end

end
