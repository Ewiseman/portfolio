class Task < ApplicationRecord
  belongs_to :sprint
  belongs_to :user

  validates :category, presence: true
  validates :task, presence: true
  validates :value, presence: true
  validates :user_id, presence: true

  default_scope { order('updated_at DESC') }
  # default_scope { order('sprint_id ASC', 'category ASC') }

    CATEGORY = ["health", "personal", "gear lift", "snowmass", "vacation", "fcfs", "one dataset", "board", "career development"]
    VALUE = [1,2,3,5,8,10,15,20]
end
