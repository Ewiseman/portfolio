class Recipe < ApplicationRecord
  has_many :ingredients, inverse_of: :recipe, dependent: :destroy
  has_many :measurements, through: :ingredients, dependent: :destroy
end
