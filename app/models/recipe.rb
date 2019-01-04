class Recipe < ApplicationRecord
  has_many :measurements, dependent: :destroy
  has_many :ingredients, through: :measurements, dependent: :destroy
  default_scope { order('name ASC') }


end
