class Cookbook < ApplicationRecord
  has_many :recipes, dependent: :destroy
  default_scope { order('name ASC') }
end
