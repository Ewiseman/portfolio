class Task < ApplicationRecord
  belongs_to :sprint
  acts_as_list scope: :sprint
  belongs_to :user

  validates :category, presence: true
  validates :task, presence: true
  validates :value, presence: true
  validates :status, presence: true
  # validates :day, presence: true
  validates :user_id, presence: true

  # default_scope { order('category DESC') }
  #default_scope { order('status DESC', 'ranks ASC', 'category ASC', 'value DESC') }

  CATEGORY = ["health", "personal", "programming", "sales", "admin", "vacation", "home_school"]
  VALUE = [1,2,3,5,8,10,15,20]
  STATUS = ["to_do", "complete"]
  DAY = ["monday", "tuesday", "wednesday","thursday", "friday", "sat/sun"]



end
