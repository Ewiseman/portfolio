require "administrate/base_dashboard"

class ScrumDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    category:  Field::Select.with_options(
      collection: ["", "health", "personal", "gear lift", "snowmass", "vacation", "fcfs", "one dataset", "board", "career development",  ]
    ),
    task: Field::String,
    value: Field::Select.with_options(
      collection: ["", 1, 3, 5, 8, 10]
    ),
    date: Field::DateTime,
    day:  Field::Select.with_options(
      collection: ["", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
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
    :date,
    :category,
    :task,
    :value,
    :day,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :id,
    :category,
    :task,
    :value,
    :date,
    :day,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :date,
    :category,
    :task,
    :value,
    :day,
  ].freeze

  # Overwrite this method to customize how scrums are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(scrum)
     scrum.category.capitalize
  end

  # def display_resource(ski)
  #   ski.name.capitalize
  # end
end
