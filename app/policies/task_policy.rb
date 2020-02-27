class TaskPolicy < ApplicationPolicy

  def index?
    user.admin?
  end

  def show?
    user.admin?
  end

  def new?
    create?
  end

  def create?
    user.admin?
  end

  def update?
    create?
  end

  def edit?
    create?
  end

  def destroy?
    update?
  end
end
