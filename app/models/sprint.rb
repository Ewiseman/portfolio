class Sprint < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :user
  default_scope { order('sprint_date DESC') }

  EXERCISES = ['muscle building', 'endurance', 'home_school']

  def working
    tasks.where(status: "working")
  end

  def complete
    tasks.where(status: "complete")
  end

  def percentage_complete
    # if complete.count > 0
    #   (complete.count / tasks.all.count)
    # end
    if complete.count > 0
      (complete.count.to_f / tasks.count.to_f) * 100
    end
  end



end
