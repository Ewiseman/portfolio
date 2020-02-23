class Sprint < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :user
  default_scope { order('sprint_date DESC') }
end
