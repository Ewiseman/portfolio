require "administrate/base_dashboard"

class MeasurementDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    ingredient: Field::BelongsTo,
    id: Field::Number,
    unit: Field::Number,
    description: Field::String,
    measurement: Field::Select.with_options(
      collection: ["", "pinch", "teaspoon", "tablespoon", "cup", "oz", "grams"]
    ),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :ingredient,
    # :id,
    :unit,
    :description,
    # :measurement,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :ingredient,
    # :id,
    :unit,
    :measurement,
    :description,
    # :created_at,
    # :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :ingredient,
    :unit,
    :measurement,
    :description,
  ].freeze

  # Overwrite this method to customize how measurements are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(measurement)
    if measurement.description == nil
      "#{measurement.unit}  #{ - measurement.measurement}"
    else
        "#{measurement.unit} #{ - measurement.measurement} #{ - measurement.description}"
    end
    # "#{measurement.ingredient.recipe.name} - #{measurement.ingredient.name}"
  end
end
