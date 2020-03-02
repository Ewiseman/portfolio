class Tag < ApplicationRecord
  has_many :locations
  has_many :participants, through: :locations
end
