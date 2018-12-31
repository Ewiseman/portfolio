module ApplicationHelper
  def format_long_date(date)
    return ' ' if date.nil?
    date.strftime "%b %-e, %Y"
  end

  def d3_date_format(date)
    return ' ' if date.nil?
    date.strftime "%a"
  end
end
