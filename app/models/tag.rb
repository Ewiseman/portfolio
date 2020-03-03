class Tag < ApplicationRecord
  has_many :locations, dependent: :destroy
  has_many :participants, through: :locations, dependent: :destroy

  PROGRAMS = ["English", "40 Days of Light", "JOPH"]
end
