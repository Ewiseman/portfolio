class Measurement < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
    default_scope { order('ingredient_order ASC') }
end
