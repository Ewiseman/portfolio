class Task < ApplicationRecord
  belongs_to :sprint
  default_scope { order('sprint_id ASC', 'category ASC') }
end
