module ApplicationHelper
  def format_long_date(date)
    return ' ' if date.nil?
    date.strftime "%b %-e, %Y"
  end
end
