class Measurement < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
    default_scope { order('type_of_measurement ASC') }
end
