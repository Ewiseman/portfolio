require "administrate/base_dashboard"

class SprintDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    tasks: Field::HasMany,
    id: Field::Number,
    sprint_date: Field::DateTime.with_options(format: "%b %d, %Y"),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :sprint_date,
    :tasks,
    :id,
    # :created_at,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :sprint_date,
    :tasks,
    # :id,
    # :created_at,
    # :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :tasks,
    :sprint_date,
  ].freeze

  # Overwrite this method to customize how sprints are displayed
  # across all pages of the admin dashboard.
  #

  def format_long_date(date)
    return ' ' if date.nil?
    date.strftime "%b %-e, %Y"
  end
  
  def display_resource(sprint)
    format_long_date(sprint.sprint_date)
  end
end
