class Ingredient < ApplicationRecord
  belongs_to :recipe, inverse_of: :ingredients
  has_many :measurements, dependent: :destroy
end
