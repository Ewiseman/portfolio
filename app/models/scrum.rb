class Scrum < ApplicationRecord
  belongs_to :scrum_date
  default_scope { order('date DESC', 'category ASC') }

  def scrum_total_by_month
      scum.group_by_month(:updated_at, range: (11.months.ago)..Time.now)
    # .group_by_month(:updated_at, range: (11.months.ago)..Time.now).unscope(:order).count

  end

end
