module ApplicationHelper
  def format_long_date(date)
    return ' ' if date.nil?
    date.strftime "%b %-e, %Y"
  end

  def d3_date_format(date)
    return ' ' if date.nil?
    date.strftime "%Y"
  end

  def error_count_message(object)
    "There #{object.errors.count == 1 ? 'is' : 'are'} #{object.errors.count} missing field#{'s' unless object.errors.count == 1} on this page"
  end
end
