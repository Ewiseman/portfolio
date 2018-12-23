class CreateScrumDates < ActiveRecord::Migration[5.2]
  def change
    create_table :scrum_dates do |t|

      t.timestamps
    end
  end
end
