```ruby

# class Physician < ApplicationRecord
#   has_many :appointments
#   has_many :patients, through: :appointments
# end
#
# class Appointment < ApplicationRecord
#   belongs_to :physician
#   belongs_to :patient
# end
#
# class Patient < ApplicationRecord
#   has_many :appointments
#   has_many :physicians, through: :appointments
# end



class Recipe < ApplicationRecord
  has_many :measurements
  has_many :ingredients, through: :measurements
end

class Measurement < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
end

class Ingredient < ApplicationRecord
  has_many :measurements
  has_many :recipes, through: :measurements
end


class CreateAppointments < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.timestamps
    end

    create_table :ingredients do |t|
      t.string :name
      t.timestamps
    end

    create_table :measurements do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :ingredient, index: true
      t.timestamps
    end
  end
end


# class Recipe < ApplicationRecord
#   has_many :ingredients
#   has_many :measurements, through: :ingredients
# end
#
# class Ingredient < ApplicationRecord
#   belongs_to :recipe
#   belongs_to :measurement
# end
#
# class Measurement < ApplicationRecord
#   has_many :ingredients
#   has_many :recipes, through: :ingredients
# end
