class Ingredient < ApplicationRecord
  has_many :measurements, dependent: :destroy
  has_many :recipes, through: :measurements, dependent: :destroy
  default_scope { order('name ASC') }
end
