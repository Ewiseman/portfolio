require "administrate/base_dashboard"

class MeasurementDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    ingredient_order: Field::Select.with_options(
      collection: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    ),
    recipe: Field::BelongsTo,
    ingredient: Field::BelongsTo,
    id: Field::Number,
    unit: Field::Number.with_options(decimals: 2),
    type_of_measurement: Field::Select.with_options(
      collection: ["", "Pinch", "Teaspoon", "Tablespoon", "Cup", "Grams", "Oz", "Lbs", "Cloves", "15oz Can", "28oz Can", "Whole", "Square", "Bunch", "1 Inch", "Slice", "Package", "Head"]
    ),
    description: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    # :recipe,
    :ingredient_order,
    :ingredient,
    # :id,
    :unit,
    :type_of_measurement,
    :description,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :recipe,
    :ingredient_order,
    :ingredient,
    :id,
    :unit,
    :type_of_measurement,
    :description,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :recipe,
    :ingredient_order,
    :ingredient,
    :unit,
    :type_of_measurement,
    :description,
  ].freeze

  # Overwrite this method to customize how measurements are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(measurement)
    "#{measurement.unit} - #{measurement.type_of_measurement}"
  end
end
