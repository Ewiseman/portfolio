class Sprint < ApplicationRecord
  has_many :tasks, dependent: :destroy
end
