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
    name: Field::String,
    on_the_menu: Field::Boolean,
    vegetarian: Field::Boolean,
    dairy_free: Field::Boolean,
    vegan: Field::Boolean,
    health_category: Field::Select.with_options(
      collection: ["", "Paleo", "Autoimmune", "Anti-candida"]
    ),
    cookbook: Field::Select.with_options(
      collection: ["", "True Food", "Straight From the Earth"]
    ),
    cookbook_page: Field::Number,
    directions: Field::Text,
    cusine_region: Field::Select.with_options(
      collection: ["", "Asian", "Mexian", "Southwest", "Mediterranean"]
    ),
    protein: Field::Select.with_options(
      collection: ["", "Chicken", "Fish", "Bison", "Ground Beef", "Steak" ]
    ),
    type_of_food: Field::Select.with_options(
      collection: ["", "Sauce", "Dressing", "Drink", "Desert", "Side Dish", "Noodles", "Seafood", "Soup", "Salad", "Stir Fry", "Pizza", "Burger"]
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
    # :id,
    :on_the_menu,
    :name,
    :protein,
    :health_category,
    :cookbook,
    :vegetarian,
    :vegan,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :id,
    :on_the_menu,
    :name,
    :protein,
    :health_category,
    :cusine_region,
    :type_of_food,
    :vegetarian,
    :dairy_free,
    :vegan,
    :cookbook,
    :cookbook_page,
    :directions,
    :ingredients,
    # :created_at,
    # :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :on_the_menu,
    :name,
    :protein,
    :cusine_region,
    :type_of_food,
    :health_category,
    :vegetarian,
    :dairy_free,
    :vegan,
    :cookbook,
    :cookbook_page,
    :directions,
  ].freeze

  # Overwrite this method to customize how recipes are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(recipe)
    recipe.name
  end
end