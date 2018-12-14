class Scrum < ApplicationRecord
    default_scope { order('date DESC', 'category ASC') }
end
