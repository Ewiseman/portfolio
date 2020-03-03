class Participant < ApplicationRecord
  has_many :locations, dependent: :destroy
  has_many :tags, through: :locations, dependent: :destroy
end
