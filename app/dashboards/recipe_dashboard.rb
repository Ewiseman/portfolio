require "administrate/base_dashboard"

class RecipeDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    ingredients: Field::HasMany,
    measurements: Field::HasMany,
    name: Field::String,
    protein: Field::String,
    health_category: Field::String,
    cookbook: Field::String,
    cookbook_page: Field::Number,
    directions: Field::Text,
    cusine_region: Field::String,
    type_of_food: Field::String,
    on_the_menu: Field::Boolean,
    vegetarian: Field::Boolean,
    vegan: Field::Boolean,
    dairy_free: Field::Boolean,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    # :id,
    :on_the_menu,
    :name,
    :protein,
    :cusine_region,
    :type_of_food,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :id,
    :name,
    :protein,
    :health_category,
    :cookbook,
    :cookbook_page,
    :cusine_region,
    :type_of_food,
    :on_the_menu,
    :vegetarian,
    :vegan,
    :dairy_free,
    # :ingredients,
    :directions,
    :measurements,
    # :created_at,
    # :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :name,
    :protein,
    :health_category,
    :cookbook,
    :cookbook_page,
    :cusine_region,
    :type_of_food,
    :on_the_menu,
    :vegetarian,
    :vegan,
    :dairy_free,
    :directions,
    :ingredients,
    # :measurements,
  ].freeze

  # Overwrite this method to customize how recipes are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(recipe)
    recipe.name
  end
end
