class ScrumDate < ApplicationRecord
  has_many :scrums, dependent: :destroy
end
