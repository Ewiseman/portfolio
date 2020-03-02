class Location < ApplicationRecord
  belongs_to :tag
  belongs_to :participant
end
