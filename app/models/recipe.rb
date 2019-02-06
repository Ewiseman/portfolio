class Recipe < ApplicationRecord
  belongs_to :cookbook
  has_many :measurements, dependent: :destroy
  has_many :ingredients, through: :measurements, dependent: :destroy
  default_scope { order('name ASC') }

  TYPE_OF_FOOD_CONST = ["Main Dish", "Side Dish", "Salad", "Soup", "Sauce / Dressing", "Baked Good", "Desert", "Drink"]

  def multiplier_view
    return " x #{multiplier}" if multiplier > 1
  end

  def food_we_eat
     Recipe::TYPE_OF_FOOD_CONST
  end


end
