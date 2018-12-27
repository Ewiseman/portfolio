class Sprint < ApplicationRecord
  has_many :tasks, dependent: :destroy
  default_scope { order('sprint_date DESC') }
end
