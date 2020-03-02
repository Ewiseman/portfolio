class Participant < ApplicationRecord
  has_many :locations
  has_many :tags, through: :locations
end
