class Ingredient < ApplicationRecord
  belongs_to :recipe
  has_one :measurement, dependent: :destroy
end
