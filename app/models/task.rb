class Task < ApplicationRecord
  belongs_to :sprint
  belongs_to :user

  validates :category, presence: true
  validates :task, presence: true
  validates :value, presence: true
  validates :status, presence: true
  validates :user_id, presence: true

  # default_scope { order('category DESC') }
  default_scope { order('category DESC', 'task ASC') }

  CATEGORY = ["health", "personal", "work", "vacation"]
  VALUE = [1,2,3,5,8,10,15,20]
  STATUS = ["to_do", "today", "complete"]
  DAY = ["monday", "tuesday", "wednesday","thrusday", "friday", "saturday", "sunday"]



end
