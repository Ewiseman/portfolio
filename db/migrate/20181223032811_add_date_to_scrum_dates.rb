class AddDateToScrumDates < ActiveRecord::Migration[5.2]
  def change
    add_column :scrum_dates, :sprint_date, :date
  end
end
