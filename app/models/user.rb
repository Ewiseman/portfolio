class User < ApplicationRecord
  has_many :sprints
  has_many :tasks
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable

  def admin?
    role == 'admin'
  end

  def sai_maa?
    role == 'sai_maa'
  end

end
