require "administrate/base_dashboard"

class IngredientDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    measurements: Field::HasMany,
    recipes: Field::HasMany,
    id: Field::Number,
    name: Field::String,
    category: Field::Select.with_options(
      collection: ["", "Produce", "Meat", "Seafood", "Dry Good", "Dairy", "Canned Good", "Cooking Oil", "Spice"]
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
    # :measurements,
    # :recipes,
    # :id,
    :name,
    :category,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :id,
    :name,
    :category,
    :recipes,
    :measurements,
    # :created_at,
    # :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :name,
    :category,
    # :measurements,
    :recipes,
  ].freeze

  # Overwrite this method to customize how ingredients are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(ingredient)
    "#{ingredient.name}"
  end
end
