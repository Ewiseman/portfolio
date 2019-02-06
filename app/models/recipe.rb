class Recipe < ApplicationRecord
  belongs_to :cookbook
  has_many :measurements, dependent: :destroy
  has_many :ingredients, through: :measurements, dependent: :destroy
  default_scope { order('name ASC') }

  def multiplier_view
    return " x #{multiplier}" if multiplier > 1
  end

end
